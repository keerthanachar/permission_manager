import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import { Box, Button, Divider, Drawer, Grid, Typography } from "@mui/material";

import API from "../../../API";
// Import the GenerateForm component
import HoC from "../../../Components/reusableComponents/index";
// import Select from "../../../Components/reusableComponents/Select";
import { GetQuotesByBuyFigureId } from "../../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { handleDrawer, showAlert, UpdateQuote } from "../../../Redux/Reducer";
import { validateFormOnSubmit } from "../../../reusableFunctions/ReusableFunctions";

import QuotesList from "./BuyFigureQuoteList";
import { QuoteDetailsConfig } from "./Uitility";

const UserDetailsForm = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { UpdatedQuoteData, buyFigureDetail, user, dealers, drawerState } = useAppSelector((state) => state);
    // const [buyfigureStatus, setBuyfigureStatus] = React.useState<any>(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    // const statusList = [
    //     { label: "Won", value: "won" },
    //     { label: "Loss", value: "loss" },
    //     { label: "SoldOut", value: "soldout" }
    // ];
    const closeDrawer = () => {
        setIsDrawerOpen(false);
        dispatch(UpdateQuote([]));
        dispatch(handleDrawer({ open: false }));
    };

    const formikProps = useFormik({
        initialValues: {
            ...QuoteDetailsConfig?.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a })),
            ...UpdatedQuoteData
        },
        onSubmit: async (values: any) => {
            if (UpdatedQuoteData?.Quote_ID) {
                try {
                    setLoading(true);
                    const res: any = await API.Quote.updateQuote({
                        ...values,
                        Name: values.Name || UpdatedQuoteData.Name,
                        DealerName: values.DealerName.Name || UpdatedQuoteData.DealerName,
                        Received: values?.Received?.label ? values?.Received?.label || values?.Received : UpdatedQuoteData?.Received,
                        ModifiedBy: user?.Email
                    });
                    if (res?.data?.status) {
                        formikProps.resetForm();
                        dispatch(UpdateQuote([]));
                        dispatch(
                            showAlert({
                                open: true,
                                type: "success",
                                message: "Quote Updated Successfully",
                                closeIcon: true
                            })
                        );
                        closeDrawer();
                        dispatch(GetQuotesByBuyFigureId(buyFigureDetail?.BuyFigureList.BuyFigure_ID));
                        setLoading(false);
                    } else {
                        setLoading(false);
                        dispatch(showAlert({ open: true, type: "error", message: res?.data?.data?.message, closeIcon: true }));
                    }
                } catch (error: any) {
                    setLoading(false);
                    dispatch(showAlert({ open: true, type: "error", message: error?.response?.data?.data?.message, closeIcon: true }));
                }
            } else {
                try {
                    setLoading(true);
                    const res: any = await API.Quote.addQuote({
                        ...values,
                        BuyFigure_ID: buyFigureDetail?.BuyFigureList.BuyFigure_ID,
                        UserID: user?.UserID,
                        DealerID: values?.DealerName?.DealerID,
                        DealerName: values?.DealerName?.Name,
                        Received: values?.Received?.label,
                        CreatedBy: user?.Email
                    });
                    if (res?.data?.data?.status) {
                        dispatch(
                            showAlert({
                                open: true,
                                type: "success",
                                message: "Quote added Successfully",
                                closeIcon: true
                            })
                        );
                        formikProps.resetForm();
                        closeDrawer();
                        dispatch(GetQuotesByBuyFigureId(buyFigureDetail?.BuyFigureList.BuyFigure_ID));
                        setLoading(false);
                    } else {
                        setLoading(false);
                        dispatch(showAlert({ open: true, type: "error", message: res?.data?.data?.message, closeIcon: true }));
                    }
                } catch (error: any) {
                    setLoading(false);
                    dispatch(showAlert({ open: true, type: "error", message: error?.response?.data?.data?.message, closeIcon: true }));
                }
            }
        },
        enableReinitialize: true,
        validate: (values: any) => {
            return validateFormOnSubmit(values, [QuoteDetailsConfig]);
        }
    });
    const openDrawer = () => {
        setIsDrawerOpen(true);
        dispatch(handleDrawer({ open: true }));
        const initialValues = UpdatedQuoteData
            ? { ...UpdatedQuoteData }
            : {
                  ...QuoteDetailsConfig?.map((e: any) => ({ [e?.Name]: e?.InitialValue }))?.reduce((a: any, b = {}) => ({ ...b, ...a }))
              };
        formikProps.setValues(initialValues);
    };
    const handleSubmit = (ee: any) => {
        formikProps.handleSubmit(ee);
    };
    const DealershipData = dealers
        ?.filter((dealer: any) => !user?.Dealers?.some((userDealer: any) => userDealer?.DealerID === dealer?.DealerID))
        .map((dealer: any) => ({
            ...dealer,
            label: `${dealer?.Name}`,
            value: dealer?.DealerID
        }));
    useEffect(() => {
        if (drawerState.open) {
            setIsDrawerOpen(true);
        }
    }, [drawerState]);

    return (
        <Box>
            <Grid container display="flex" flexDirection="column" gap={2}>
                <Grid item sx={{ paddingLeft: 2 }}>
                    <Grid container display="flex" justifyContent="flex-start" alignItems="center">
                        <Grid item width={120}>
                            <Button
                                onClick={openDrawer}
                                disabled={user.UserID !== buyFigureDetail?.BuyFigureList.UserID}
                                sx={{
                                    cursor: user.UserID !== buyFigureDetail?.BuyFigureList.UserID ? "not-allowed" : "pointer",
                                    border: user.UserID !== buyFigureDetail?.BuyFigureList.UserID ? "1px solid #EBEBE4" : "1px solid black"
                                }}
                            >
                                Add Quote
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Box mt={1}>
                        <QuotesList />
                    </Box>
                </Grid>
                <Drawer
                    anchor="right"
                    open={isDrawerOpen}
                    onClose={() => {
                        closeDrawer();
                        formikProps.resetForm();
                    }}
                    sx={{ "& .css-ykq1wf-MuiPaper-root-MuiDrawer-paper": { borderRadius: "0px" } }}
                >
                    <Typography p={2} variant="h5" fontWeight="bold" display="flex" justifyContent="center" alignItems="center">
                        ADD QUOTE
                    </Typography>
                    <Divider sx={{ borderColor: "gray", opacity: 0.5 }} />
                    <Box p={3} width="30vw" display="flex" flexDirection="column">
                        {" "}
                        <HoC.GenerateForm
                            FormData={QuoteDetailsConfig.map((e) => (e.Name === "DealerName" ? { ...e, List: DealershipData || e?.List } : e))}
                            FormikProps={formikProps}
                        />
                        <Box mt={2} />
                        <Box display="flex">
                            <Box display="flex" width="100%" justifyContent="flex-Start" gap={2}>
                                <Button
                                    sx={{ width: "130px", borderRadius: 0 }}
                                    variant="outlined"
                                    onClick={() => {
                                        dispatch(UpdateQuote([]));
                                        formikProps.resetForm();
                                        closeDrawer();
                                    }}
                                >
                                    Back
                                </Button>
                            </Box>
                            <Box display="flex" width="100%" justifyContent="flex-end" gap={2}>
                                <Button
                                    variant="filled"
                                    type="submit"
                                    onClick={(e) => handleSubmit(e)}
                                    disabled={Object.keys(formikProps.errors).length > 0 || loading}
                                >
                                    {loading ? "Proccesing..." : UpdatedQuoteData?.Quote_ID ? "Update Quote" : "Add Quote"}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Drawer>
            </Grid>
        </Box>
    );
};

export default UserDetailsForm;
