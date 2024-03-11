import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { Box, Button, Grid, IconButton, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";

import API from "../../API";
import LoginImage from "../../Assets/login-3.jpg";
import LoginLogo from "../../Assets/LoginLogo.png";
import RoutesEnum from "../../Enums/Routes.enum";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleModel, updateUser } from "../../Redux/Reducer";
import { validateFormOnSubmit } from "../../reusableFunctions/ReusableFunctions";
import { en } from "../../translate/en";
import GenerateForm from "../reusableComponents/GenerateForms";

import { OtpConfig } from "./uitilities";

const VerifyOtp = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const Theme = useTheme();
    const isMobile = useMediaQuery(Theme.breakpoints.down("sm" || "xs"));
    const { user } = useAppSelector((state) => state);

    const formikProps = useFormik({
        initialValues: {
            ...OtpConfig.map((e) => ({ [e.Name]: e.InitialValue })).reduce((a, b = {}) => ({ ...b, ...a }))
        },
        onSubmit: async (values) => {
            try {
                API.Dealer.validateOTP(values);
                // sessionStorage.setItem("accessToken", res?.data?.data);
                dispatch(updateUser({ ...user, values }));
                dispatch(handleModel({ open: false, type: "VerifyOtp" }));
                toast.success("Sign in Successful");
                navigate(RoutesEnum.dashboard);
            } catch (error: any) {
                toast.error(error?.response?.data?.message);
            }
        },
        validate: (values) => {
            return validateFormOnSubmit(values, [OtpConfig]);
        }
    });

    return (
        <Box component="form" onSubmit={formikProps.handleSubmit} display="flex" justifyContent="center" p={2}>
            <Paper elevation={5} sx={{ height: "auto", borderRadius: 6, width: "100%" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Box
                            component="div"
                            sx={{
                                position: "relative",
                                width: "100%",
                                borderTopLeftRadius: 15,
                                borderBottomLeftRadius: 15,
                                height: isMobile ? "auto" : "50vh"
                            }}
                        >
                            <img
                                src={LoginImage}
                                alt="signup img"
                                style={{ width: "100%", borderTopLeftRadius: 18, borderBottomLeftRadius: 18, height: "100%", objectFit: "cover" }}
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
                                <Box style={{ color: "#fff", fontWeight: "bold", marginLeft: "20px" }}>Road to Quality Cars</Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} p={2} mt={2}>
                        <Grid container lg={12} mt={1}>
                            <Grid item lg={11.5} display="flex" justifyContent="end">
                                <IconButton onClick={() => dispatch(handleModel({ open: false }))}>
                                    <HighlightOffRoundedIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={12} pb={4} display="flex" justifyContent="start">
                                <Typography variant="h5" fontWeight={700}>
                                    {en.verifyOtp}
                                </Typography>
                            </Grid>
                            <Grid item lg={12} md={12} mr={5} mt={-3}>
                                <Box width="100%" display="flex" justifyContent="center" gap={2} mt={2}>
                                    <GenerateForm FormData={OtpConfig} FormikProps={formikProps} />
                                </Box>
                                <Box width="100%" display="flex" justifyContent="center" mt={2} gap={2}>
                                    <Button variant="outlined" onClick={() => dispatch(handleModel({ open: true, type: "Login" }))}>
                                        {en.back}
                                    </Button>
                                    <Button variant="filled" type="submit">
                                        {en.verify}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default VerifyOtp;
