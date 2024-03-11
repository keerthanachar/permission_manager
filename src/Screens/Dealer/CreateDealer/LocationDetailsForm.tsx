import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

import HoC from "../../../Components/reusableComponents";
import RoutesEnum from "../../../Enums/Routes.enum";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { handleTabs, handleUpdateDealer } from "../../../Redux/Reducer";
import { validateFormOnSubmit } from "../../../reusableFunctions/ReusableFunctions";

import { DealersLocationConfig } from "./Uitility";

const DealerLocationForm = () => {
    const { updatedDealer, theme, CAstates, USstates, USTimeZones, CATimeZones } = useAppSelector((state) => state);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const formikProps = useFormik({
        initialValues: {
            ...DealersLocationConfig.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a })),
            ...updatedDealer
        },
        onSubmit: async (values: any) => {
            dispatch(handleUpdateDealer({ ...updatedDealer, ...values, TimeZone: values.TimeZone.label || updatedDealer?.TimeZone }));
            dispatch(handleTabs(true));
        },
        enableReinitialize: true,
        validate: (values: any) => {
            return validateFormOnSubmit(values, [DealersLocationConfig]);
        }
    });
    React.useEffect(() => {
        if (formikProps.submitCount && Object.keys(formikProps.errors).length > 0) {
            setErrorMessage("Please fill all the required details");
        } else {
            setErrorMessage("");
        }
    }, [formikProps.errors, formikProps.submitCount]);
    return (
        <Box component="form" noValidate onSubmit={formikProps.handleSubmit} display="flex" flexDirection="column" gap={2} p={5}>
            <Box>
                <HoC.GenerateForm
                    FormData={DealersLocationConfig?.map((e: any) => {
                        if (e.Name === "State") {
                            if (formikProps?.values?.Country?.value === "US") {
                                return { ...e, List: USstates };
                            }
                            return { ...e, List: CAstates };
                        }
                        return e;
                    }).map((a: any) => (a.Name === "TimeZone" ? { ...a, List: [...CATimeZones, ...USTimeZones] } : a))}
                    FormikProps={formikProps}
                    lg={6}
                    xl={6}
                    md={6}
                    xs={12}
                />
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
                <Button variant="filled" type="submit">
                    Save & Continue
                </Button>
            </Box>
        </Box>
    );
};
export default DealerLocationForm;
