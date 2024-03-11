import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material";

import API from "../../API";
import GenerateForm from "../../Components/reusableComponents/GenerateForms";
import RoutesEnum from "../../Enums/Routes.enum";
import { GetMyGarageDetailsByUserId } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleGarageData, handleModel, showAlert } from "../../Redux/Reducer";
import { validateFormOnSubmit } from "../../reusableFunctions/ReusableFunctions";
import { en } from "../../translate/en";

import { AddNoteConfig } from "./Uitilities";

const MyGarageNote = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading, setloading] = useState(false);
    const { user, GarageData } = useAppSelector((state) => state);

    const formikProps = useFormik({
        initialValues: {
            ...AddNoteConfig.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a, b = {}) => ({ ...b, ...a }))
        },
        onSubmit: async (values: any) => {
            try {
                setloading(true);
                const res: any = await API.MyGarage.createGarage({
                    DealerID: GarageData?.DealerID,
                    InventoryID: GarageData?.Inventory_ID,
                    UserID: user?.UserID,
                    Note: values?.Note,
                    CreatedBy: user?.Email
                });
                if (res?.data?.data?.data?.status === 1) {
                    dispatch(
                        showAlert({
                            open: true,
                            type: "success",
                            message: "Added to My Garage Successfully",
                            closeIcon: true
                        })
                    );
                    dispatch(handleGarageData({}));
                    if (user?.UserID) {
                        await dispatch(GetMyGarageDetailsByUserId(user?.UserID));
                    }
                    dispatch(handleModel({ open: false, type: "AddToGarage" }));
                    setloading(false);
                    toast.success("Added to My Garage Successfully");
                    navigate(RoutesEnum.product);
                }
            } catch (error: any) {
                dispatch(
                    showAlert({
                        open: true,
                        type: "error",
                        message: error?.response?.data?.message,
                        closeIcon: true
                    })
                );
                setloading(false);
            }
        },
        validate: (values) => {
            return validateFormOnSubmit(values, [AddNoteConfig]);
        }
    });

    return (
        <Box component="form" onSubmit={formikProps.handleSubmit} display="flex" justifyContent="center" sx={{ width: "600px" }}>
            <Paper elevation={5} sx={{ height: "auto", borderRadius: 3, p: 2 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} pb={1} lg={6} display="flex" justifyContent="start">
                        <Typography variant="h5" fontWeight={700}>
                            {en.addNote}
                        </Typography>
                    </Grid>
                    <Grid item lg={6} display="flex" justifyContent="end" alignItems="center">
                        <IconButton sx={{ mt: -3 }} onClick={() => dispatch(handleModel({ open: false }))}>
                            <HighlightOffRoundedIcon />
                        </IconButton>
                    </Grid>

                    <Grid item xs={12} md={12} lg={12} justifyContent="center">
                        <Box display="flex" justifyContent="center" gap={1}>
                            <GenerateForm FormData={AddNoteConfig} FormikProps={formikProps} />
                        </Box>
                        <Box display="flex" justifyContent="flex-end" m={1} gap={2}>
                            <Button
                                variant="outlined"
                                sx={{ width: "102px" }}
                                onClick={() => dispatch(handleModel({ open: false, type: "AddToGarage" }))}
                            >
                                {en.back}
                            </Button>
                            <Button variant="filled" type="submit">
                                {loading ? "Adding" : "Add Note"}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default MyGarageNote;
