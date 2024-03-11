import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

import API from "../../../API";
import HoC from "../../../Components/reusableComponents";
import RoutesEnum from "../../../Enums/Routes.enum";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { handleTabs, handleUpdateDealer, showAlert } from "../../../Redux/Reducer";
import { validateFormOnSubmit } from "../../../reusableFunctions/ReusableFunctions";

import { DealersFormConfig } from "./Uitility";

const DealerForm = () => {
    const { updatedDealer, theme } = useAppSelector((state) => state);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [verifying, setVerifying] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const formikProps = useFormik({
        initialValues: {
            ...DealersFormConfig.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a })),
            ...updatedDealer
        },
        onSubmit: async (values: any) => {
            if (!updatedDealer?.DealerID) {
                setVerifying(true);
                try {
                    const dealerRes: any = await API.Dealer.verifyDelearEmailAndPassword({ Email: values?.Email, PhoneNo: values?.PhoneNo });
                    if (dealerRes?.data?.status) {
                        setVerifying(false);
                        dispatch(handleUpdateDealer({ ...updatedDealer, ...values }));
                        dispatch(handleTabs(true));
                    } else {
                        setVerifying(false);
                    }
                } catch (error: any) {
                    setVerifying(false);
                    dispatch(showAlert({ open: true, type: "error", message: error?.response?.data?.data?.message, closeIcon: true }));
                }
            } else {
                dispatch(handleUpdateDealer({ ...updatedDealer, ...values }));
                dispatch(handleTabs(true));
            }
        },
        validate: (values: any) => {
            const errors = validateFormOnSubmit(values, [DealersFormConfig]);
            if (!formikProps.isSubmitting && Object.keys(errors)?.length > 0) {
                setErrorMessage("Please fill all the required details");
            } else {
                setErrorMessage("");
            }
            return errors;
        }
    });
    // React.useEffect(() => {
    //     if (Object.keys(formikProps.errors).length > 0) {
    //         setErrorMessage("Please fill all the required details");
    //     } else {
    //         setErrorMessage("");
    //     }
    // }, [formikProps.errors]);

    return (
        <Box component="form" noValidate onSubmit={formikProps.handleSubmit} display="flex" flexDirection="column" gap={2} p={5}>
            <Box>
                <HoC.GenerateForm FormData={DealersFormConfig} FormikProps={formikProps} lg={6} xl={6} md={6} xs={12} />
            </Box>
            {errorMessage && (
                <Typography color={theme?.errorColor?.[theme.mode]?.main} textAlign="center">
                    {errorMessage}
                </Typography>
            )}
            <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="outlined" sx={{ width: "153px", borderRadius: 0 }} onClick={() => navigate(RoutesEnum.dealers)}>
                    Cancel
                </Button>
                <Button variant="filled" disabled={verifying} type="submit">
                    {verifying ? "Verifying..." : "Save & Continue"}
                </Button>
            </Box>
        </Box>
    );
};
export default DealerForm;
