import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import { Box, Divider, Grid, Paper, Typography } from "@mui/material";

import { ReactComponent as Filter } from "../../Assets/filter.svg";
import HoC from "../../Components/reusableComponents";
import AccordionComponent from "../../Components/reusableComponents/Accordion";
// import PriceRangeSlider from "../../Components/reusableComponents/RangeSlider";
// import SearchFiled from "../../Components/reusableComponents/SearchField";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleFiltersInventory } from "../../Redux/Reducer";
import { validateFormOnSubmit } from "../../reusableFunctions/ReusableFunctions";
import { CarFiltersTypes } from "../Product/Filter";
import { vaidateFilterFields } from "../Product/logic";

import { getFilteredInventoryData, getInventoryDropDownData } from "./logic";
import {
    InventoryColorFormConfig,
    InventoryEngineFormConfig,
    InventoryMileageInputFormConfig,
    InventoryModelFormConfig,
    InventoryPriceInputFormConfig,
    InventoryTransmissionFormConfig,
    InventoryYearFormConfig
} from "./Uitilities";

const CarFilters = ({ InventoryList, handleFilteredData }: CarFiltersTypes) => {
    const dispatch = useAppDispatch();
    const { ClearAll } = useAppSelector((state: any) => state);

    const [FiltersData, setFiltersData] = useState<any>(InventoryList);

    const { LowYear, Make, Model, Trim, Transmission, Color, Engine, Price, Mileage } = getInventoryDropDownData(FiltersData);

    const formikProps = useFormik({
        initialValues: {
            ...InventoryYearFormConfig.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a })),
            ...InventoryModelFormConfig.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a })),
            ...InventoryTransmissionFormConfig.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a })),
            ...InventoryColorFormConfig.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a })),
            ...InventoryEngineFormConfig.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a })),
            ...InventoryPriceInputFormConfig.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a })),
            ...InventoryMileageInputFormConfig.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a }))
        },
        onSubmit: async () => {},
        enableReinitialize: true,
        validate: (values: any) => {
            dispatch(handleFiltersInventory(values));
            if (!vaidateFilterFields(values)) {
                const data = getFilteredInventoryData(values, InventoryList);
                setFiltersData(data);
                handleFilteredData(data);
            } else {
                setFiltersData(InventoryList);
                handleFilteredData(InventoryList);
            }

            return validateFormOnSubmit(values, [
                InventoryYearFormConfig,
                InventoryModelFormConfig,
                InventoryTransmissionFormConfig,
                InventoryColorFormConfig,
                InventoryEngineFormConfig,
                InventoryPriceInputFormConfig,
                InventoryMileageInputFormConfig
            ]);
        }
    });

    const clearFun = () => {
        if (ClearAll.ClearAll) {
            const values: any = { values: "" };
            formikProps.setValues(values);
            formikProps.resetForm();
        } else if (ClearAll.Year) {
            formikProps.setValues((prevValues: any) => ({
                ...prevValues,
                LowYear: "",
                HighYear: ""
            }));
        } else if (ClearAll.Price) {
            formikProps.setValues((prevValues: any) => ({
                ...prevValues,
                MinPrice: "",
                MaxPrice: ""
            }));
        } else if (ClearAll.Mileage) {
            formikProps.setValues((prevValues: any) => ({
                ...prevValues,
                MinMileage: "",
                MaxMileage: ""
            }));
        } else if (ClearAll.Make) {
            formikProps.setFieldValue("Make", "");
        } else if (ClearAll.Model) {
            formikProps.setFieldValue("Model", "");
        } else if (ClearAll.Color) {
            formikProps.setFieldValue("Color", "");
        } else if (ClearAll.Transmission) {
            formikProps.setFieldValue("Transmission", "");
        } else if (ClearAll.Trim) {
            formikProps.setFieldValue("Trim", "");
        } else if (ClearAll.Engine) {
            formikProps.setFieldValue("Engine", "");
        }
    };

    useEffect(() => {
        clearFun();
    }, [ClearAll]);
    return (
        <Grid p={2} borderRadius={1}>
            <Box
                component={Paper}
                sx={{
                    width: 250,
                    overflowY: "auto",
                    borderRadius: 0,
                    maxHeight: "1048px"
                }}
                p={1}
            >
                <Box display="flex" paddingBottom={2} mt={2}>
                    <Filter style={{ fill: "#000", width: "20px", height: "20px" }} />
                    <Typography sx={{ color: "#333", fontWeight: "bold", ml: 1 }}>Filter</Typography>
                </Box>
                <Divider sx={{ borderColor: "#F6F2EA", borderBottomWidth: "2px" }} />
                <Box>
                    <AccordionComponent title="Year">
                        <HoC.GenerateForm
                            FormData={InventoryYearFormConfig.map((item: any) => {
                                if (item.Name === "LowYear") {
                                    return { ...item, List: LowYear };
                                }
                                if (item.Name === "HighYear") {
                                    return { ...item, List: LowYear };
                                }
                                return item;
                            })}
                            FormikProps={formikProps}
                            spacing={0.5}
                        />
                    </AccordionComponent>
                </Box>
                <Box>
                    <AccordionComponent title="Make & Mode & Trim">
                        <HoC.GenerateForm
                            FormData={InventoryModelFormConfig.map((item: any) => {
                                if (item.Name === "Make") {
                                    return { ...item, List: Make };
                                }
                                if (item.Name === "Model") {
                                    return { ...item, List: Model };
                                }
                                if (item.Name === "Trim") {
                                    return { ...item, List: Trim };
                                }
                                return item;
                            })}
                            FormikProps={formikProps}
                            spacing={0.5}
                        />
                    </AccordionComponent>
                </Box>
                <Box>
                    <AccordionComponent title="Price">
                        {/* <Box display="flex" justifyContent="space-between" sx={{ mt: 1 }}>
                            <Typography variant="body2" color="textSecondary">
                                ${price[0]}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                ${price[1]}
                            </Typography>
                        </Box>
                        <PriceRangeSlider value={price} min={0} max={highestPrice} onChange={handlePriceChange} /> */}
                        <HoC.GenerateForm
                            FormData={InventoryPriceInputFormConfig.map((item: any) => {
                                if (item.Name === "MinPrice" || item.Name === "MaxPrice") {
                                    return { ...item, List: Price };
                                }
                                return item;
                            })}
                            FormikProps={formikProps}
                            spacing={0.5}
                        />
                    </AccordionComponent>
                </Box>
                <Box>
                    <AccordionComponent title="Mileage">
                        <HoC.GenerateForm
                            FormData={InventoryMileageInputFormConfig.map((item: any) => {
                                if (item.Name === "MinMileage" || item.Name === "MaxMileage") {
                                    return { ...item, List: Mileage };
                                }
                                return item;
                            })}
                            FormikProps={formikProps}
                            spacing={0.5}
                        />
                    </AccordionComponent>
                </Box>
                <Box>
                    <AccordionComponent title="Transmission">
                        <HoC.GenerateForm
                            FormData={InventoryTransmissionFormConfig.map((item: any) => {
                                if (item.Name === "Transmission") {
                                    return { ...item, List: Transmission };
                                }
                                return item;
                            })}
                            FormikProps={formikProps}
                            spacing={0.5}
                        />
                    </AccordionComponent>
                </Box>
                <Box>
                    <AccordionComponent title="Color">
                        <HoC.GenerateForm
                            FormData={InventoryColorFormConfig.map((item: any) => {
                                if (item.Name === "Color") {
                                    return { ...item, List: Color };
                                }
                                return item;
                            })}
                            FormikProps={formikProps}
                            spacing={0.5}
                        />
                    </AccordionComponent>
                </Box>
                <Box>
                    <AccordionComponent title="Engine">
                        <HoC.GenerateForm
                            FormData={InventoryEngineFormConfig.map((item: any) => {
                                if (item.Name === "Engine") {
                                    return { ...item, List: Engine };
                                }
                                return item;
                            })}
                            FormikProps={formikProps}
                            spacing={0.5}
                        />
                    </AccordionComponent>
                </Box>
            </Box>
        </Grid>
    );
};
export default CarFilters;
