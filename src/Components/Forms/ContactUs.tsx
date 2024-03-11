/* eslint-disable no-unsafe-optional-chaining */
import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { Box, Button, Grid, Paper, Typography } from "@mui/material";

import { addContactUsAPI } from "../../Redux/asyncThunk";
import { useAppDispatch } from "../../Redux/hooks";
import { showAlert } from "../../Redux/Reducer";
import { validateFormOnSubmit } from "../../reusableFunctions/ReusableFunctions";
import { en } from "../../translate/en";
import GenerateForm from "../reusableComponents/GenerateForms";

import { ContactUsConfig } from "./Uitilities";

const ContactUs = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const formikProps = useFormik({
        initialValues: {},
        onSubmit: async (values) => {
            try {
                const res: any = await dispatch(addContactUsAPI({ ...values }));
                if (res.payload.data.data.status) {
                    dispatch(
                        showAlert({
                            open: true,
                            type: "success",
                            message: en.getBackToYou,
                            closeIcon: true
                        })
                    );
                    formikProps.resetForm();
                    navigate("/");
                }
            } catch (error) {
                dispatch(
                    showAlert({
                        open: true,
                        type: "error",
                        message: en.internalServerError,
                        closeIcon: true
                    })
                );
            }
        },
        validate: (values: any) => {
            return validateFormOnSubmit(values, [ContactUsConfig]);
        }
    });
    return (
        <Box component="div" width="100%" mt={10} display="flex">
            <Grid container>
                <Grid
                    item
                    lg={8}
                    md={8}
                    sm={12}
                    xs={12}
                    component="form"
                    onSubmit={formikProps.handleSubmit}
                    width="75%"
                    display="flex"
                    justifyContent="center"
                    p={2}
                >
                    <Paper elevation={5} sx={{ p: 5, width: "100%" }}>
                        <Grid lg={12} container>
                            <Grid item pb={4}>
                                <Typography variant="h5" fontWeight={700}>
                                    Contact Us
                                </Typography>
                            </Grid>
                            <Grid item lg={12} gap={2}>
                                <Box width="100%" display="flex" justifyContent="center" gap={2}>
                                    <GenerateForm FormData={ContactUsConfig} FormikProps={formikProps} />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item lg={12} gap={5} pt={1}>
                            <Box width="100%" display="flex" justifyContent="flex-end" gap={2}>
                                <Box>
                                    <Button variant="filled" type="submit">
                                        {en.submit}
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} p={2}>
                    <Paper elevation={5} sx={{ width: "100%" }}>
                        <Grid lg={12} container>
                            <Grid item lg={12} sx={{ borderRadius: 2, width: "100%", backgroundColor: "#f5f5f5" }}>
                                <Typography p={2} variant="body1" fontWeight={300}>
                                    Contact Us
                                </Typography>
                            </Grid>
                            <Grid item gap={2} p={1}>
                                <Typography variant="body2" px={2}>
                                    Have questions or need help? Our friendly staff is available to answer any questions you may have.
                                </Typography>
                                <Typography variant="body2" px={2}>
                                    P: 708-692-2280 (US)
                                </Typography>
                                <Typography variant="body1" fontWeight={700} px={2}>
                                    Hours:
                                </Typography>
                                <Typography variant="body2" px={2}>
                                    Monday - Sunday
                                </Typography>
                                <Typography variant="body2" px={2}>
                                    12:00 AM - 11:30 PM
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
export default ContactUs;
