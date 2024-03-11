import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

import API from "../../../API";
import HoC from "../../../Components/reusableComponents";
import RoutesEnum from "../../../Enums/Routes.enum";
import { GetDealer } from "../../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { handleTabs, handleUpdateDealer, showAlert } from "../../../Redux/Reducer";

import { InventoryListSettingsConfig, InventorySettingsConfig } from "./Uitility";

const InventorySettings = () => {
    const { updatedDealer, theme, user, PrivateNetworkData } = useAppSelector((state) => state);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const formikProps = useFormik({
        initialValues: {
            ...InventorySettingsConfig?.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a })),
            ...InventoryListSettingsConfig?.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a })),
            ...updatedDealer
        },
        onSubmit: async (values: any) => {
            if (updatedDealer?.DealerID) {
                dispatch(handleUpdateDealer({ ...updatedDealer, ...values }));
                try {
                    setLoading(true);
                    const response: any = await API.Dealer.updateDealer({
                        ...updatedDealer,
                        ...values,
                        ModifiedBy: user?.Email
                    });
                    if (response?.data?.status) {
                        setLoading(false);
                        await dispatch(GetDealer());
                        dispatch(handleTabs(true));
                    } else {
                        setLoading(false);
                    }
                } catch (error: any) {
                    setLoading(false);
                    dispatch(showAlert({ open: true, type: "error", message: error?.response?.data?.data?.message, closeIcon: true }));
                }
            } else {
                try {
                    setLoading(true);
                    const response: any = await API.Dealer.createDealer({
                        ...updatedDealer,
                        ...values,
                        DataFeedID: values?.DataFeedID !== "" ? values?.DataFeedID : 0,
                        CreatedBy: user?.Email,
                        Cutoff_Days: Number(values?.Cutoff_Days)
                    });
                    if (response?.data?.status) {
                        dispatch(handleUpdateDealer({ ...updatedDealer, ...values, DealerID: response?.data?.DealerID }));
                        setLoading(false);
                        await dispatch(GetDealer());
                        dispatch(handleTabs(true));
                    } else {
                        setLoading(false);
                    }
                } catch (error: any) {
                    setLoading(false);
                    dispatch(showAlert({ open: true, type: "error", message: error?.response?.data?.data?.message, closeIcon: true }));
                }
            }
        },
        enableReinitialize: true
    });
    const PN_Name = PrivateNetworkData.map((e: any) => ({
        label: e.PN_Name,
        value: e.PN_ID,
        IsPrivateNetwork: true
    }));

    React.useEffect(() => {
        if (formikProps.submitCount && Object.keys(formikProps.errors).length > 0) {
            setErrorMessage("Please fill all the required details");
        } else {
            setErrorMessage("");
        }
    }, [formikProps.errors]);

    return (
        <Box component="form" noValidate onSubmit={formikProps.handleSubmit} display="flex" flexDirection="column" gap={2} p={5}>
            <Box>
                <HoC.GenerateForm
                    FormData={
                        formikProps?.values?.InventoryStatus?.value === 1
                            ? InventoryListSettingsConfig?.map((item: any) => {
                                  if (item.Name === "PN_Name") {
                                      return { ...item, List: PN_Name };
                                  }
                                  return item;
                              })
                            : InventorySettingsConfig?.map((item: any) => {
                                  if (item.Name === "PN_Name") {
                                      return { ...item, List: PN_Name };
                                  }
                                  return item;
                              })
                    }
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
                <Button variant="filled" type="submit" disabled={loading}>
                    {loading ? "loading..." : "Save & Continue"}
                </Button>
            </Box>
        </Box>
    );
};
export default InventorySettings;
