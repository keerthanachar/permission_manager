import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";

import API from "../../../API";
import Header from "../../../Components/Header/Header";
import HoC from "../../../Components/reusableComponents";
import DragAndDropFile from "../../../Components/reusableComponents/DragAndDrop";
import RoutesEnum from "../../../Enums/Routes.enum";
import { GetInventory } from "../../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { showAlert, updateInventory } from "../../../Redux/Reducer";
import { getFileUrl, validateFormOnSubmit } from "../../../reusableFunctions/ReusableFunctions";
import { en } from "../../../translate/en";
import { addInventoryForm } from "../Uitilities";

import { convertObjectParms } from "./Logics";

const AddInventory = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { user, editInventory, breakPoints, theme } = useAppSelector((state) => state);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [buttonClick, setButtonClick] = useState(0);
    const editImgArr: any = [];
    useEffect(() => {
        if (editInventory.Inventory_ID && editInventory?.VehiclePhoto?.length > 0) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < editInventory?.VehiclePhoto?.length; i++) {
                editImgArr.push(editInventory?.VehiclePhoto[i]);
            }
        }
    }, []);
    const DealerShip: any = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < user?.Dealers?.length; i++) {
        DealerShip.push({ label: user?.Dealers[i]?.Name, value: user?.Dealers[i]?.DealerID });
    }

    const [dragImages, setDragImages] = useState<string[]>(editImgArr);
    const dealerAddInventoryForm: any = addInventoryForm && addInventoryForm[0]?.List && addInventoryForm[0]?.List[0];
    if (dealerAddInventoryForm) {
        dealerAddInventoryForm.label = user?.Dealers?.Name;
        dealerAddInventoryForm.value = user?.DealerID;
    }

    const dealerAddInventoryIntialVal: any = addInventoryForm && addInventoryForm[0];
    if (dealerAddInventoryIntialVal) {
        dealerAddInventoryIntialVal.InitialValue = user?.Dealers?.Name;
    }
    const handleClick = () => {
        setButtonClick(+1);
    };
    const formikProps = useFormik({
        initialValues: {
            ...addInventoryForm?.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a })),
            ...editInventory,
            ...dealerAddInventoryForm,
            ...dealerAddInventoryIntialVal
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
            } else if (editInventory.Inventory_ID) {
                try {
                    setLoading(true);
                    // const images = {
                    //     Type: null,
                    //     Inventory_ID: editInventory?.Inventory_ID,
                    //     VehiclePhoto: [...dragImages],
                    //     InventoryPhoto_Id: editInventory?.VehiclePhotos?.InventoryPhoto_Id
                    // };
                    const ApiParams: any = convertObjectParms({
                        ...values,
                        Inventory_ID: editInventory.Inventory_ID,
                        VehiclePhoto: dragImages,
                        ModifiedBy: editInventory.CreatedBy
                    });
                    const res: any = await API.Inventory.EditInventory({ ...ApiParams, Inventory_ID: editInventory.Inventory_ID });
                    if (res?.data?.status) {
                        await dispatch(GetInventory(user?.UserID));

                        dispatch(
                            showAlert({
                                open: true,
                                type: "success",
                                message: "Inventory Data Updated Successfully",
                                closeIcon: true
                            })
                        );
                        navigate(RoutesEnum.inventory);
                        dispatch(updateInventory([]));
                        setLoading(false);
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
            } else {
                try {
                    setLoading(true);
                    const ApiParams: any = convertObjectParms({
                        ...values,
                        DealerID: values?.DealerName?.value,
                        DealerName: values.DealerName?.label,
                        VehiclePhoto: dragImages,
                        CreatedBy: user?.Email
                    });
                    const res: any = await API.Inventory.addInventory(ApiParams);
                    if (res?.data?.status) {
                        await dispatch(GetInventory(user.UserID));
                        dispatch(
                            showAlert({
                                open: true,
                                type: "success",
                                message: "Inventory Data Added Successfully",
                                closeIcon: true
                            })
                        );
                        navigate(RoutesEnum.inventory);
                        setLoading(false);
                    } else {
                        setLoading(false);
                        dispatch(
                            showAlert({
                                open: true,
                                type: "error",
                                message: res.data.Message,
                                closeIcon: true
                            })
                        );
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
            }
        },
        validate: (values: any) => {
            return validateFormOnSubmit(values, [addInventoryForm]);
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
    const parentDealership = user.Dealers.map((e: any) => ({ label: e.PN_Name, value: e.PN_ID, IsPrivateNetwork: true }));
    useEffect(() => {
        if (buttonClick && Object.keys(formikProps.errors).length > 0) {
            setErrorMessage("Please fill all the required details");
        } else {
            setErrorMessage("");
        }
    }, [buttonClick, formikProps.errors]);

    return (
        <Box component="form" onSubmit={formikProps.handleSubmit} width="100%" p={2} pt={3}>
            <Grid container spacing={1} display="flex">
                <Header
                    title={en.inventory}
                    searchField
                    styles={{
                        paddingLeft: 3,
                        padding: 1,
                        paddingRight: 1.5
                    }}
                    backButton
                />
            </Grid>
            <Grid p={2} borderRadius={1}>
                <Box component={Paper} p={1} pb={3} sx={{ borderRadius: "0px" }}>
                    <Box sx={{ display: "flex", flexDirection: breakPoints?.sm ? "row" : "column" }}>
                        <Box display="flex" sx={{ justifyContent: "space-evenly", width: breakPoints?.sm ? "70%" : "100%" }}>
                            <Box flexDirection="column" width="100%" p={1}>
                                <Typography sx={{ color: "#333", fontWeight: "bold" }}>Vehicle Details</Typography>
                                <HoC.GenerateForm
                                    FormData={addInventoryForm
                                        ?.map((item: any) => {
                                            if (item.Name === "DealerName") {
                                                return {
                                                    ...item,
                                                    List: DealerShip
                                                };
                                            }
                                            if (item.Name === "PN_Name") {
                                                return {
                                                    ...item,
                                                    List: parentDealership
                                                };
                                            }
                                            return item;
                                        })
                                        ?.map((e: any) => (e.Name === "Year" ? { ...e, List: e.List?.sort((a: any, b: any) => b - a) } : e))
                                        .slice(parentDealership.length > 0 ? 0 : 1, 21)}
                                    FormikProps={formikProps}
                                    lg={4}
                                    xl={4}
                                    md={4}
                                    xs={12}
                                    spacing={1}
                                />
                            </Box>
                        </Box>

                        <Box
                            display="flex"
                            justifyContent="flex-start"
                            gap={2}
                            flexDirection="column"
                            px={2}
                            sx={{ width: breakPoints?.sm ? "34%" : "100%" }}
                        >
                            <Typography color="#333" fontWeight={700}>
                                Vehicle Photos
                            </Typography>
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
                                dispatch(updateInventory([]));
                                navigate(-1);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button variant="filled" type="submit" disabled={loading} onClick={handleClick}>
                            {loading ? "Processing..." : "Save"}
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Box>
    );
};

export default AddInventory;
