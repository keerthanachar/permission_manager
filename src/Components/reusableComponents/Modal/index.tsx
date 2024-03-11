import React from "react";

import { Backdrop, Box, Divider, Grid, Paper, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";

import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { handleModel } from "../../../Redux/Reducer";
// eslint-disable-next-line import/no-cycle
import AddAdministrator from "../../../Screens/Administator/AddAdminstrator";
import BuyFigureImageView from "../../../Screens/BuyFigure/BuyFigureDetail/BuyFigureImageView";
import MyGarageNote from "../../../Screens/MyGarage/AddNotes";
import Note from "../../../Screens/MyGarage/Note";
import ProductImageView from "../../../Screens/Product/ProductDetails/ProductImageView";
import Login from "../../Auths/index";
import SignUp from "../../Auths/SignUp";
import VerifyOtp from "../../Auths/VerifyOTP";
// eslint-disable-next-line import/no-cycle
import ProductDetailCard from "../ProductDetailCard";

import { ModelProps } from "./types";

const ModalComponent: React.FC<ModelProps> = ({ children, title }) => {
    const dispatch = useAppDispatch();
    const { modal } = useAppSelector((state) => state);

    return (
        <>
            {modal?.open && <Backdrop open={modal?.open} />}
            <Modal open={modal?.open || false} onClose={() => dispatch(handleModel({ open: false }))}>
                <Box component="div">
                    <Grid container width="100%" lg={12} justifyContent="center" height="100vh" overflow="auto">
                        <Grid item xl={6} sm={12} xs={12} lg={8} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {title && (
                                <Paper component="div" variant="elevation" elevation={1}>
                                    {title && (
                                        <>
                                            <Typography variant="h5" margin={1} fontWeight={700} color="primary">
                                                {modal?.modelTitle}
                                            </Typography>
                                            {modal?.modelTitle && <Divider variant="fullWidth" orientation="horizontal" />}
                                        </>
                                    )}
                                    {children}
                                </Paper>
                            )}
                            <Box component="div" height="auto">
                                {/* <Paper sx={{ borderRadius: 6 }}> */}
                                {!!modal?.modelTitle && <Divider variant="fullWidth" orientation="horizontal" />}
                                <Box>{modal?.type === "Login" && <Login />}</Box>
                                <Box>{modal?.type === "Signup" && <SignUp />}</Box>
                                <Box>{modal?.type === "VerifyOtp" && <VerifyOtp />}</Box>
                                <Box>{modal?.type === "Administrator" && <AddAdministrator />}</Box>
                                <Box>{modal?.type === "ProductImage" && <ProductImageView />}</Box>
                                <Box>{modal?.type === "AddToGarage" && <MyGarageNote />}</Box>
                                <Box>{modal?.type === "MyGarageProduct" && <ProductDetailCard carList={modal?.payload} />}</Box>
                                <Box>{modal?.type === "Note" && <Note noteData={modal?.payload} />}</Box>
                                <Box>{modal?.type === "BuyFigureImage" && <BuyFigureImageView />}</Box>
                                {/* </Paper> */}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
};

export default ModalComponent;
