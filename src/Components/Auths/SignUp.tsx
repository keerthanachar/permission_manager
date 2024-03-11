/* eslint-disable no-unsafe-optional-chaining */
import React from "react";
import { useFormik } from "formik";

import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material";

import API from "../../API";
import { ReactComponent as CloseIcon } from "../../Assets/Close-circle.svg";
import LoginLogo from "../../Assets/LoginLogo.png";
import signup2 from "../../Assets/signup-logo-2.jpg";
import { GetDealer } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleModel, showAlert } from "../../Redux/Reducer";
import { validateFormOnSubmit } from "../../reusableFunctions/ReusableFunctions";
import { en } from "../../translate/en";
import GenerateForm from "../reusableComponents/GenerateForms";

import { SignupConfig } from "./uitilities";

const SignUp = () => {
    const dispatch = useAppDispatch();
    const { breakPoints } = useAppSelector((state) => state);
    const formikProps = useFormik({
        initialValues: {
            ...SignupConfig.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a }))
        },
        onSubmit: async (values: any) => {
            try {
                const res: any = await API.Dealer.createDealer({
                    ...values,
                    IsDealerActive: false,
                    InventoryStatus: "Not Listed",
                    PriceOption: "usePriceInInventory",
                    AutoListDays: "1"
                });
                if (res?.data?.status) {
                    await dispatch(GetDealer());
                    dispatch(
                        showAlert({
                            open: true,
                            type: "success",
                            message: en.signupSuccess,
                            closeIcon: true
                        })
                    );
                    dispatch(handleModel({ open: true, type: "Login" }));
                } else {
                    dispatch(
                        showAlert({
                            open: true,
                            type: "error",
                            message: res.data.message,
                            closeIcon: true
                        })
                    );
                }
            } catch (error: any) {
                dispatch(
                    showAlert({
                        open: true,
                        type: "error",
                        message: error?.response?.data?.data?.message,
                        closeIcon: true
                    })
                );
            }
        },
        validate: (values: any) => {
            return validateFormOnSubmit(values, [SignupConfig]);
        }
    });

    return (
        <Box component="form" onSubmit={formikProps.handleSubmit} display="flex" justifyContent="center">
            <Paper elevation={5} sx={{ height: "auto", borderRadius: 6, width: "100%", margin: !breakPoints?.sm ? "12px" : "0px" }}>
                <Grid container>
                    <Grid item xl={6} lg={6} md={6} xs={12} sm={6} sx={{ height: breakPoints?.sm ? "auto" : "fit-content" }}>
                        {breakPoints?.xs && !breakPoints?.sm ? (
                            <Grid item lg={11.5} md={11.5} sm={11.5} xs={12} display="flex" justifyContent="end">
                                <IconButton onClick={() => dispatch(handleModel({ open: false }))} sx={{ position: "absolute", zIndex: 1 }}>
                                    <CloseIcon fill="#fff" />
                                </IconButton>
                            </Grid>
                        ) : null}
                        <Box
                            component="div"
                            sx={{
                                position: "relative",
                                width: "100%",
                                borderTopLeftRadius: 15,
                                borderBottomLeftRadius: 15,
                                height: breakPoints?.sm ? "100%" : "70%"
                            }}
                        >
                            <img
                                src={signup2}
                                alt="signup img"
                                style={{
                                    width: "100%",
                                    borderTopLeftRadius: 15,
                                    borderBottomLeftRadius: !breakPoints?.sm ? 0 : 15,
                                    height: "100%",
                                    objectFit: "cover",
                                    borderTopRightRadius: !breakPoints?.sm ? 18 : 0
                                }}
                            />
                            <Box
                                style={{
                                    position: "absolute",
                                    top: "14%",
                                    left: "33%",
                                    transform: "translate(-50%, -50%)",
                                    marginTop: "20px"
                                }}
                            >
                                <img src={LoginLogo} alt="logo" style={{ width: "200px", height: "40px", border: "2px solid #fff" }} />
                                <Box variant="h5" component={Typography} sx={{ color: "#fff" }}>
                                    Road to
                                    <br />
                                    Quality Cars
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} pl={2}>
                        <Grid container px={1} justifyContent={!breakPoints?.sm ? "center" : "left"}>
                            {breakPoints?.xs && !breakPoints?.sm ? null : (
                                <Grid item lg={11.5} md={11.5} sm={11.5} xs={12} display="flex" justifyContent="end" mt={1}>
                                    {/* <Box> */}
                                    <IconButton onClick={() => dispatch(handleModel({ open: false }))}>
                                        <CloseIcon />
                                    </IconButton>
                                    {/* </Box> */}
                                </Grid>
                            )}
                            <Grid item xs={12} display="flex" justifyContent="start">
                                <Typography variant="h4" fontWeight={700} py={2}>
                                    {en.signUp}
                                </Typography>
                            </Grid>
                            <Grid item gap={2} mr={breakPoints?.sm ? 5 : 0}>
                                <Box width="300px" display="flex" justifyContent="center" gap={2}>
                                    <GenerateForm FormData={SignupConfig} FormikProps={formikProps} />
                                </Box>
                                <Box width="300px" display="flex" justifyContent="flex-end" mt={1.5}>
                                    <Button variant="filled" fullWidth type="submit">
                                        {en.signUp.toUpperCase()}
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item display="flex" justifyContent="center" xs={11} sm={12} md={12} lg={11}>
                                <Box display="flex" justifyContent="flex-start" alignItems="center" py={1}>
                                    <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>Already have an account?</Typography>
                                    <Box
                                        component="a"
                                        color="#3192F4"
                                        sx={{ cursor: "pointer", fontSize: "13x" }}
                                        onClick={() => dispatch(handleModel({ open: true, type: "Login" }))}
                                        px={0.5}
                                    >
                                        {en.login}
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};
export default SignUp;
