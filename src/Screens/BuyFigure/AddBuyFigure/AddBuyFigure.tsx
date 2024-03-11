import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";

import API from "../../../API";
import HeaderComponent from "../../../Components/Header/Header";
import HoC from "../../../Components/reusableComponents";
import DragAndDropFile from "../../../Components/reusableComponents/DragAndDrop";
import RoutesEnum from "../../../Enums/Routes.enum";
import { GetBuyFigure } from "../../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { showAlert } from "../../../Redux/Reducer";
import { getFileUrl, validateFormOnSubmit } from "../../../reusableFunctions/ReusableFunctions";
import { addBuyFigureForm } from "../Uitilities";

const AddBuyFigure = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user, breakPoints, theme } = useAppSelector((state) => state);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [buttonClick, setButtonClick] = useState(0);
    const editImgArr: any = [];
    const DealerShip: any = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < user?.Dealers?.length; i++) {
        DealerShip.push({ label: user?.Dealers[i]?.Name, value: user?.Dealers[i]?.DealerID });
    }
    const PrivateNetwork = user?.Dealers?.map((e: any) => ({ label: e?.PN_Name, value: e?.PN_ID }))?.filter((e: any) => e.label !== null);

    const [dragImages, setDragImages] = useState<string[]>(editImgArr);
    const handleClick = () => {
        setButtonClick(+1);
        setLoading(false);
    };
    const formikProps = useFormik({
        initialValues: {
            ...addBuyFigureForm?.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a })),
            First_Name: user?.First_Name ?? "",
            Last_Name: user?.Last_Name ?? "",
            Email: user?.Email ?? "",
            PhoneNumber: user?.Phone_No ?? "",
            DealerName: DealerShip?.length === 1 ? DealerShip[0] : null,
            PN_Name: PrivateNetwork?.length === 1 ? PrivateNetwork[0] : null
        },
        onSubmit: async (values: any) => {
            if (!dragImages?.length) {
                dispatch(
                    showAlert({
                        open: true,
                        type: "error",
                        message: "Please upload vehicle photos",
                        closeIcon: true
                    })
                );
            }
            try {
                const payload = {
                    ...values,
                    VIN: values.VIN !== "" ? values.VIN : null,
                    VehiclePhoto: dragImages,
                    CreatedBy: user.Email,
                    IsEmailSent: false,
                    IsSold: false,
                    UserID: user.UserID,
                    DealerID: values?.DealerName?.value,
                    Dealership: values?.DealerName?.label,
                    PN_ID: values?.PN_Name?.value,
                    PN_Name: values?.PN_Name?.label,
                    IsPrivateNetwork: !!(values?.PN_Name?.value && values?.PN_Name?.label)
                };
                setLoading(true);
                const res: any = await API.BuyFigure.addBuyFigure(payload);
                if (res?.data.status) {
                    await dispatch(GetBuyFigure());
                    setLoading(false);
                    dispatch(
                        showAlert({
                            open: true,
                            type: "success",
                            message: "Buy Figure Data Added Successfully",
                            closeIcon: true
                        })
                    );
                    navigate(RoutesEnum.buyFigure);
                }
            } catch (error: any) {
                setLoading(false);
                dispatch(
                    showAlert({
                        open: true,
                        type: "error",
                        message: error?.response?.data?.data,
                        closeIcon: true
                    })
                );
            }
        },
        validate: (values: any) => {
            return validateFormOnSubmit(values, [addBuyFigureForm]);
        }
    });
    const handleDragImageChange = async (files: FileList | null) => {
        if (files) {
            // eslint-disable-next-line no-plusplus
            // for (let i = 0; i < files.length; i++) {
            // eslint-disable-next-line no-await-in-loop
            const convertUrl: any = await getFileUrl(files);
            // Convert FileList to an array
            const newArr: any = [];
            newArr.push(convertUrl.Location);
            setDragImages((prevDragImages) => [...prevDragImages, ...newArr]);
            // }
        }
    };

    const handleDelete = (index: any) => {
        const copyDragImg = [...dragImages];
        copyDragImg.splice(index, 1);
        setDragImages(copyDragImg);
    };
    useEffect(() => {
        if (buttonClick && Object.keys(formikProps.errors).length > 0) {
            setErrorMessage("Please fill all the required details");
        } else {
            setErrorMessage("");
        }
    }, [buttonClick, formikProps.errors]);
    useEffect(() => {
        if (buttonClick && Object.keys(formikProps.errors).length > 0) {
            setErrorMessage("Please fill all the required details");
        } else {
            setErrorMessage("");
        }
    }, [buttonClick, formikProps.errors]);

    const isFormValid = Object.keys(formikProps.errors).length === 0 && dragImages.length > 0;

    return (
        <Box component="form" onSubmit={formikProps.handleSubmit} width="100%" p={2} pt={3}>
            <Grid container spacing={1} display="flex">
                <HeaderComponent
                    title="GET A BUY FIGURE"
                    // searchField
                    styles={{
                        paddingLeft: 1.5,
                        padding: 1,
                        paddingRight: 1.5
                    }}
                    backButton
                />
            </Grid>
            <Grid p={2} borderRadius={1}>
                <Box component={Paper} p={1} pb={3} sx={{ borderRadius: "0px" }}>
                    <Box flexDirection="column" width="100%" p={1}>
                        <Typography sx={{ color: "#333", fontWeight: "bold" }}>Vehicle Details</Typography>
                        <Divider sx={{ borderColor: "#ececec", mt: 2, mb: 2 }} />
                        <HoC.GenerateForm
                            FormData={addBuyFigureForm
                                ?.map((item: any) =>
                                    item.Name === "DealerName"
                                        ? {
                                              ...item,
                                              List: DealerShip || item.List
                                          }
                                        : item
                                )
                                ?.map((item: any) =>
                                    item.Name === "PN_Name"
                                        ? {
                                              ...item,
                                              List: PrivateNetwork
                                          }
                                        : item
                                )
                                ?.map((e: any) => (e.Name === "Year" ? { ...e, List: e.List?.sort((a: any, b: any) => b - a) } : e))
                                .slice(0, 6)}
                            FormikProps={formikProps}
                            lg={4}
                            xl={4}
                            md={4}
                            xs={12}
                            spacing={1}
                        />
                    </Box>
                    <Box width="100%" p={1}>
                        <Typography sx={{ color: "#333", fontWeight: "bold" }}>Vehicle Details</Typography>
                        <Divider sx={{ borderColor: "#ececec", mt: 2, mb: 2 }} />
                        <HoC.GenerateForm
                            FormData={addBuyFigureForm
                                ?.map((e: any) => (e.Name === "Year" ? { ...e, List: e.List?.sort((a: any, b: any) => b - a) } : e))
                                .slice(6, 13)}
                            FormikProps={formikProps}
                            lg={4}
                            xl={4}
                            md={4}
                            xs={12}
                            spacing={1}
                        />
                    </Box>
                    <Box display="flex" justifyContent="flex-start" flexDirection="column" px={2} sx={{ width: breakPoints?.sm ? "34%" : "100%" }}>
                        <Typography color="#333" fontWeight={700}>
                            Vehicle Photos
                        </Typography>
                        <Divider sx={{ borderColor: "#ececec", mt: 1, mb: 2 }} />

                        <Box sx={{ height: "fit-content" }}>
                            <DragAndDropFile handleChange={handleDragImageChange} />
                        </Box>

                        <Box
                            display="flex"
                            gap={2}
                            // flexWrap="wrap"
                            sx={{ overflow: "auto", borderRadius: 0, alignContent: "flex-start", padding: 2 }}
                        >
                            {dragImages?.map((image, index) => (
                                <Box
                                    sx={{
                                        maxWidth: "140px",
                                        border: "1px solid #EAEAEA",
                                        textAlign: "center",
                                        padding: 2
                                    }}
                                >
                                    <Box>
                                        <img key={index} src={image} alt="Car" style={{ maxWidth: "100px", aspectRatio: 1 }} />
                                    </Box>
                                    <Box>
                                        <CloseRoundedIcon sx={{ display: "flex", color: "red" }} onClick={() => handleDelete(index)} />
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    {errorMessage && (
                        <Typography color={theme?.errorColor?.[theme.mode]?.main} textAlign="center">
                            {errorMessage}
                        </Typography>
                    )}

                    <Box display="flex" justifyContent="flex-end" gap={2} px={2}>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button variant="filled" type="submit" disabled={loading || !isFormValid} onClick={handleClick}>
                            {loading ? "Processing..." : "Get Figures"}
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Box>
    );
};

export default AddBuyFigure;
