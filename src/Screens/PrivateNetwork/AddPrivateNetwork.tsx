import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { Box, Button, Grid, Paper } from "@mui/material";

import API from "../../API";
import HeaderComponent from "../../Components/Header/Header";
import HoC from "../../Components/reusableComponents";
import { GetPrivateNetwork } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleModel, handleUpdatePrivateNetworks, showAlert } from "../../Redux/Reducer";
import { validateFormOnSubmit } from "../../reusableFunctions/ReusableFunctions";

import { AddPrivateNetworkConfig } from "./Uitilities";

const AddPrivateNetwork = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { user, UpdatePrivateNetworks, CAstates, USstates, USTimeZones, CATimeZones } = useAppSelector((state) => state);
    const formikProps = useFormik({
        initialValues: {
            ...AddPrivateNetworkConfig?.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a })),
            ...UpdatePrivateNetworks
        },
        onSubmit: async (values: any) => {
            if (UpdatePrivateNetworks.PN_ID) {
                setLoading(true);
                try {
                    const response: any = await API.PrivateNetwork.updatePrivateNetwork({ ...values, ModifiedBy: user.Email });
                    if (response?.data?.status) {
                        dispatch(showAlert({ open: true, type: "success", message: "Private Network Updated Successfully", closeIcon: true }));
                        await dispatch(GetPrivateNetwork());
                        navigate(-1);
                        setLoading(false);
                    }
                } catch (error: any) {
                    setLoading(false);
                    dispatch(showAlert({ open: true, type: "error", message: error?.response?.data?.data?.message, closeIcon: true }));
                }
            } else {
                setLoading(true);
                try {
                    const res: any = await API.PrivateNetwork.addPrivateNetwork({ ...values, CreatedBy: user.Email });
                    if (res?.data?.status) {
                        dispatch(handleModel({ open: false }));
                        dispatch(showAlert({ open: true, type: "success", message: "Private Network Created Successfully", closeIcon: true }));
                        await dispatch(GetPrivateNetwork());
                        navigate(-1);
                        setLoading(false);
                    }
                } catch (error: any) {
                    setLoading(false);
                    dispatch(showAlert({ open: true, type: "error", message: error?.response?.data?.data?.message, closeIcon: true }));
                }
            }
        },
        validate: (values: any) => {
            return validateFormOnSubmit(values, [AddPrivateNetworkConfig]);
        }
    });
    return (
        <Box component="form" noValidate onSubmit={formikProps.handleSubmit} width="100%" p={4} pt={3}>
            <Grid container spacing={1} display="flex">
                <HeaderComponent
                    title={`${UpdatePrivateNetworks?.PN_ID ? "UPDATE" : "CREATE"} A PRIVATE NETWORK`}
                    // searchField
                    styles={{
                        paddingLeft: 1.5,
                        padding: 1,
                        paddingRight: 1.5
                    }}
                    backButton
                    handleBackButtonClick={() => {
                        dispatch(handleUpdatePrivateNetworks([]));
                        formikProps.resetForm();
                    }}
                />
            </Grid>
            <Grid p={2} borderRadius={1}>
                <Box component={Paper} p={1} pb={3} sx={{ borderRadius: "0px" }}>
                    <Box flexDirection="column" width="100%" p={1}>
                        <HoC.GenerateForm
                            FormData={AddPrivateNetworkConfig?.map((e: any) => {
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
                    <Box display="flex" justifyContent="flex-end" gap={2} px={2}>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                dispatch(handleUpdatePrivateNetworks([]));
                                formikProps.resetForm();
                                navigate(-1);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button variant="filled" type="submit" disabled={loading}>
                            {loading ? "Creating..." : `${UpdatePrivateNetworks.PN_ID ? "Update" : "Create"} Private Network`}
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Box>
    );
};

export default AddPrivateNetwork;
