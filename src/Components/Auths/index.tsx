/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { Box, Button, Grid, IconButton, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";

import API from "../../API";
import { ReactComponent as CloseIcon } from "../../Assets/Close-circle.svg";
import LoginImg from "../../Assets/login-3.jpg";
import LoginLogo from "../../Assets/LoginLogo.png";
import RoutesEnum from "../../Enums/Routes.enum";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleModel, showAlert, updateUser } from "../../Redux/Reducer";
import { validateFormOnSubmit } from "../../reusableFunctions/ReusableFunctions";
import { en } from "../../translate/en";
import GenerateForm from "../reusableComponents/GenerateForms";

import { LoginConfig } from "./uitilities";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { breakPoints } = useAppSelector((state) => state);
    const Theme = useTheme();
    const isMobile = useMediaQuery(Theme.breakpoints.down("sm" || "xs"));
    const [sending, setSending] = useState(false);
    const formikProps = useFormik({
        initialValues: {
            ...LoginConfig.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a }))
        },
        onSubmit: async (values: any) => {
            setSending(true);
            try {
                const res: any = await API.Dealer.initiateOTP(values);
                if (!res?.data?.status) {
                    setSending(false);
                    dispatch(
                        showAlert({
                            open: true,
                            type: "error",
                            message: res?.data?.message,
                            closeIcon: true
                        })
                    );
                } else {
                    setSending(false);
                    dispatch(updateUser(res?.data));
                    localStorage.setItem("user", JSON.stringify(res?.data));
                    dispatch(
                        showAlert({
                            open: true,
                            type: "success",
                            message: en.loginSuccess,
                            closeIcon: true
                        })
                    );
                    navigate(RoutesEnum.dashboard);
                    dispatch(handleModel({ open: false }));
                }
            } catch (error: any) {
                setSending(false);
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
            return validateFormOnSubmit(values, [LoginConfig]);
        }
    });
    return (
        <Box component="form" onSubmit={formikProps.handleSubmit} display="flex" justifyContent="center">
            <Paper elevation={5} sx={{ height: "auto", borderRadius: 6, width: "100%", margin: !breakPoints?.sm ? "12px" : "0px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
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
                                height: isMobile ? "auto" : "100%"
                            }}
                        >
                            <img
                                src={LoginImg}
                                alt="signup img"
                                style={{
                                    width: "100%",
                                    borderTopLeftRadius: 18,
                                    borderBottomLeftRadius: !breakPoints?.sm ? 0 : 18,
                                    height: "100%",
                                    objectFit: "cover",
                                    borderTopRightRadius: !breakPoints?.sm ? 18 : 0
                                }}
                            />
                            <Box
                                style={{
                                    position: "absolute",
                                    top: "25%",
                                    left: "30%",
                                    transform: "translate(-50%, -50%)"
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
                    <Grid item xs={12} sm={6}>
                        <Grid container lg={12} p={2} display="flex" alignItems="center">
                            {breakPoints?.xs && !breakPoints?.sm ? null : (
                                <Grid item lg={11.5} md={11.5} sm={11.5} xs={12} display="flex" justifyContent="end">
                                    <IconButton onClick={() => dispatch(handleModel({ open: false }))}>
                                        <CloseIcon />
                                    </IconButton>
                                </Grid>
                            )}
                            <Grid item lg={12} md={12} sm={12} xs={12} display="flex" justifyContent="start">
                                <Typography sx={{ color: "#000" }} variant="h4" fontWeight={700}>
                                    {en.login}
                                </Typography>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} mr={breakPoints?.sm ? 3 : 0}>
                                <Box width="330px" display="flex" justifyContent="center" mt={2}>
                                    <GenerateForm FormData={LoginConfig} FormikProps={formikProps} />
                                </Box>
                                <Box width="330px" display="flex" justifyContent="center" mt={2}>
                                    <Button disabled={sending} variant="filled" type="submit" fullWidth>
                                        {sending ? "Sending..." : en.getOtp}
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} pt={1}>
                                <Box display="flex" justifyContent="center" alignItems="center" maxWidth={350}>
                                    <Typography variant="body2" fontWeight={600}>
                                        By logging In you agree to our{" "}
                                        <Box
                                            component="a"
                                            color="#3192F4"
                                            href="https://www.roaddealer.com/privacy-policy"
                                            target="_new"
                                            sx={{ cursor: "pointer", textDecoration: "none" }}
                                        >
                                            Privacy Policy{" "}
                                        </Box>
                                        and{" "}
                                        <Box
                                            component="a"
                                            href="https://www.roaddealer.com/terms"
                                            target="_new"
                                            color="#3192F4"
                                            sx={{ cursor: "pointer", textDecoration: "none" }}
                                        >
                                            Terms & Conditions
                                        </Box>
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} py={1}>
                                <Box width="95%" display="flex" justifyContent="center" alignItems="center" mt={2}>
                                    <Typography variant="body2" fontWeight={600}>
                                        {en.dontHaveAccount}
                                    </Typography>
                                    <Box
                                        component="a"
                                        color="#3192F4"
                                        sx={{ cursor: "pointer" }}
                                        onClick={() => dispatch(handleModel({ open: true, type: "Signup" }))}
                                        px={0.8}
                                    >
                                        {en.signUp}
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

export default Login;
