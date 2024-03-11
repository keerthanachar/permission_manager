import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { IoGridSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Button, Divider, Grid, IconButton, Paper, Tooltip, Typography } from "@mui/material";

import Header from "../../Components/Header/Header";
import ProductCard from "../../Components/reusableComponents/ProductCard";
import ProductListCard from "../../Components/reusableComponents/ProductListCard";
import SortBy from "../../Components/reusableComponents/SortBy";
import SpinnerComponent from "../../Components/reusableComponents/Spinner";
import SwitchComponent from "../../Components/reusableComponents/SwitchComponent";
import RoutesEnum from "../../Enums/Routes.enum";
import { GetMyGarageDetailsByUserId, GetProducts, GetViewList } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleClearAllInventory, handleView } from "../../Redux/Reducer";
import { en } from "../../translate/en";

import CarFilters from "./Filter";

const Product = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const windowWidth = window.innerWidth;
    const { FiltersData, ProductListData, PrivateProductList, viewProduct, user, productLoader, View } = useAppSelector((state) => state);
    const [view, setView] = useState(View?.Product);
    const [privateProduct, setPrivateProduct] = useState(false);
    const handleViewType = () => {
        setView(view === 0 ? 1 : 0);
        dispatch(handleView({ ...View, Product: view === 0 ? 1 : 0 }));
    };
    // viewed Product Mapping
    const filteredDealers = PrivateProductList?.map((e: any) => e?.ProductList?.PN_ID)?.filter((id: any) => id !== null);
    const userDealer = user?.Dealers?.map((e: any) => e?.PN_ID)?.filter((id: any) => id !== null);

    // Check if any PN_ID from filteredDealers exists in userDealer
    const hasMatchingPN_ID = filteredDealers?.some((id: any) => userDealer?.includes(id));

    let filteredData: any = [];
    if (hasMatchingPN_ID) {
        // Filter the PrivateProductList based on the condition
        filteredData = PrivateProductList?.filter((e: any) => userDealer?.includes(e?.ProductList?.PN_ID));
    }
    const viewedProduct: any = ProductListData?.map((ee: any) => {
        for (const c of viewProduct ?? []) {
            if (ee.ProductList.Inventory_ID === c.InventoryID) {
                return { ...ee, viewedProduct: c };
            }
        }
        return ee;
    });
    const [FilteredData, setFilteredData] = useState(viewedProduct || []);

    const handleClearFilter = (value: any) => {
        const filters: any = {
            ClearAll: "",
            Year: "",
            Price: "",
            Make: "",
            Mileage: "",
            Model: "",
            Trim: "",
            Engine: "",
            Color: "",
            Transmission: "",
            FreshListing: ""
        };
        if (value === "ClearAll") {
            filters.ClearAll = true;
            dispatch(handleClearAllInventory(filters));
        } else if (value === "Year") {
            filters.Year = true;
            dispatch(handleClearAllInventory(filters));
        } else if (value === "Price") {
            filters.Price = true;
            dispatch(handleClearAllInventory(filters));
        } else if (value === "Make") {
            filters.Make = true;
            dispatch(handleClearAllInventory(filters));
        } else if (value === "Model") {
            filters.Model = true;
            dispatch(handleClearAllInventory(filters));
        } else if (value === "Trim") {
            filters.Trim = true;
            dispatch(handleClearAllInventory(filters));
        } else if (value === "Mileage") {
            filters.Mileage = true;
            dispatch(handleClearAllInventory(filters));
        } else if (value === "Engine") {
            filters.Engine = true;
            dispatch(handleClearAllInventory(filters));
        } else if (value === "Color") {
            filters.Color = true;
            dispatch(handleClearAllInventory(filters));
        } else if (value === "Transmission") {
            filters.Transmission = true;
            dispatch(handleClearAllInventory(filters));
        } else if (value === "FreshListing") {
            filters.FreshListing = true;
            dispatch(handleClearAllInventory(filters));
        }
    };

    const handleSortBy = (val: any) => {
        if (val === 0) {
            // Sort in ascending order
            const sortedBids = [...FilteredData].sort((a: any, b: any) => {
                const priceA = Number(a?.ProductList?.RDPrice) || 0;
                const priceB = Number(b?.ProductList?.RDPrice) || 0;

                return priceA - priceB;
            });

            setFilteredData(sortedBids);
        } else if (val === 1) {
            // Sort in descending order
            const sortedBids = [...FilteredData].sort((a: any, b: any) => {
                const priceA = Number(a?.ProductList?.RDPrice) || 0;
                const priceB = Number(b?.ProductList?.RDPrice) || 0;

                return priceB - priceA;
            });

            setFilteredData(sortedBids);
        } else {
            // Restore the original order
            setFilteredData(viewedProduct);
        }
    };
    const handleSwitchChange = () => {
        setPrivateProduct((prevState) => !prevState);
        if (!privateProduct) {
            setFilteredData(filteredData);
        } else {
            setFilteredData(ProductListData);
        }
    };

    useEffect(() => {
        dispatch(GetProducts(user.UserID ? user.UserID : null));
        dispatch(GetViewList(user?.UserID));
        dispatch(GetMyGarageDetailsByUserId(user?.UserID));
    }, []);

    return (
        <Box>
            <Box component="div" width="100%" p={3} pt={3}>
                <Grid container spacing={1} display="flex-end">
                    <Header
                        title={en.product}
                        searchField
                        styles={{
                            paddingLeft: 3,
                            padding: 1,
                            paddingRight: 1
                        }}
                        handleClick={() => navigate(RoutesEnum.addInventory)}
                        data={viewedProduct}
                        searchData={setFilteredData}
                    />
                </Grid>
                <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Tooltip title={view === 0 ? "Click for List View" : "Click for Grid view"}>
                        <IconButton onClick={handleViewType}>{view === 0 ? <FaList /> : <IoGridSharp />}</IconButton>
                    </Tooltip>
                </Grid>
                {productLoader?.loading ? (
                    <SpinnerComponent open={productLoader.loading} />
                ) : (
                    <Grid borderRadius={1} display="flex">
                        <CarFilters InventoryList={viewedProduct} handleFilteredData={(e: any) => setFilteredData(e)} />
                        <Grid p={2} borderRadius={1} sx={{ paddingLeft: "0px", width: "100%" }}>
                            <Box
                                component={Paper}
                                p={windowWidth < 800 ? 5 : 1}
                                pb={1}
                                sx={{ borderRadius: "0px", width: windowWidth < 800 ? "fit-content" : "100%" }}
                            >
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Typography sx={{ color: "#333", fontWeight: 800, ml: 2 }}>{FilteredData?.length} matching vehicles</Typography>
                                    <Box ml={35}>
                                        <SwitchComponent
                                            id="product"
                                            name="privateProduct"
                                            checked={privateProduct}
                                            onChange={handleSwitchChange}
                                            label="Private Products"
                                        />
                                    </Box>
                                    <Box ml={2}>
                                        <SortBy onClick={handleSortBy} />
                                    </Box>
                                </Box>
                                <Divider sx={{ borderColor: "#F6F2EA", borderBottomWidth: "2px" }} />
                                <Box display="flex" flexWrap="wrap" sx={{ width: "100%" }}>
                                    <Box sx={{ mt: 1 }}>
                                        <Button
                                            sx={{
                                                fontSize: "small",
                                                fontWeight: 500,
                                                textAlign: "center",
                                                backgroundColor: "#DDDDDD",
                                                borderRadius: 0
                                            }}
                                            onClick={() => handleClearFilter("ClearAll")}
                                        >
                                            Clear All
                                        </Button>
                                    </Box>
                                    {FiltersData?.FreshListing?.label ? (
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            sx={{
                                                width: "fit-content",
                                                textAlign: "center",
                                                backgroundColor: "#DDDDDD",
                                                p: 1.3,
                                                m: 1
                                            }}
                                        >
                                            <Typography sx={{ fontSize: "small", textAlign: "center", fontWeight: 500 }}>
                                                {FiltersData.FreshListing.label}
                                            </Typography>
                                            <CloseRoundedIcon
                                                sx={{ fontSize: "medium", fontWeight: 500, ml: 1 }}
                                                onClick={() => handleClearFilter("FreshListing")}
                                            />
                                        </Box>
                                    ) : null}
                                    {FiltersData?.LowYear?.label || FiltersData?.HighYear?.label ? (
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            sx={{
                                                width: "fit-content",
                                                textAlign: "center",
                                                backgroundColor: "#DDDDDD",
                                                p: 1.3,
                                                m: 1
                                            }}
                                        >
                                            <Typography sx={{ fontSize: "small", textAlign: "center", fontWeight: 500 }}>
                                                {FiltersData?.LowYear?.label && FiltersData?.HighYear?.label
                                                    ? `Year: ${FiltersData.LowYear.label} - ${FiltersData.HighYear.label}`
                                                    : FiltersData?.LowYear?.label
                                                    ? `Year: ${FiltersData.LowYear.label}`
                                                    : FiltersData?.HighYear?.label
                                                    ? `Year: ${FiltersData.HighYear.label}`
                                                    : null}
                                            </Typography>
                                            <CloseRoundedIcon
                                                sx={{ fontSize: "medium", fontWeight: 500, ml: 1 }}
                                                onClick={() => handleClearFilter("Year")}
                                            />
                                        </Box>
                                    ) : null}

                                    {FiltersData?.MinPrice?.label || FiltersData?.MaxPrice?.label ? (
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            sx={{
                                                width: "fit-content",
                                                textAlign: "center",
                                                backgroundColor: "#DDDDDD",
                                                p: 1.3,
                                                m: 1
                                            }}
                                        >
                                            <Typography sx={{ fontSize: "small", textAlign: "center", fontWeight: 500 }}>
                                                {FiltersData?.MinPrice?.label && FiltersData?.MaxPrice?.label
                                                    ? `Price: ${FiltersData.MinPrice.label} - ${FiltersData.MaxPrice.label}`
                                                    : FiltersData?.MinPrice?.label
                                                    ? `Price: ${FiltersData.MinPrice.label}`
                                                    : FiltersData?.MaxPrice?.label
                                                    ? `Price: ${FiltersData.MaxPrice.label}`
                                                    : null}
                                            </Typography>
                                            <CloseRoundedIcon
                                                sx={{ fontSize: "medium", fontWeight: 500, ml: 1 }}
                                                onClick={() => handleClearFilter("Price")}
                                            />
                                        </Box>
                                    ) : null}
                                    {FiltersData?.MinMileage?.label || FiltersData?.MaxMileage?.label ? (
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            sx={{
                                                width: "fit-content",
                                                textAlign: "center",
                                                backgroundColor: "#DDDDDD",
                                                p: 1.3,
                                                m: 1
                                            }}
                                        >
                                            <Typography sx={{ fontSize: "small", textAlign: "center", fontWeight: 500 }}>
                                                {FiltersData?.MinMileage?.label && FiltersData?.MaxMileage?.label
                                                    ? `Mileage: ${FiltersData.MinMileage.label} - ${FiltersData.MaxMileage.label}`
                                                    : FiltersData?.MinMileage?.label
                                                    ? `Mileage: ${FiltersData.MinMileage.label}`
                                                    : FiltersData?.MaxMileage?.label
                                                    ? `Mileage: ${FiltersData.MaxMileage.label}`
                                                    : null}
                                            </Typography>
                                            <CloseRoundedIcon
                                                sx={{ fontSize: "medium", fontWeight: 500, ml: 1 }}
                                                onClick={() => handleClearFilter("Mileage")}
                                            />
                                        </Box>
                                    ) : null}

                                    {FiltersData?.Make?.label ? (
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            sx={{
                                                width: "fit-content",
                                                textAlign: "center",
                                                backgroundColor: "#DDDDDD",
                                                p: 1.3,
                                                m: 1
                                            }}
                                        >
                                            <Typography
                                                sx={{ fontSize: "small", textAlign: "center", fontWeight: 500 }}
                                            >{`Make: ${FiltersData.Make.label}`}</Typography>
                                            <CloseRoundedIcon
                                                sx={{ fontSize: "medium", fontWeight: 500, ml: 1 }}
                                                onClick={() => handleClearFilter("Make")}
                                            />
                                        </Box>
                                    ) : null}
                                    {FiltersData?.Model?.label ? (
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            sx={{
                                                width: "fit-content",
                                                textAlign: "center",
                                                backgroundColor: "#DDDDDD",
                                                p: 1.3,
                                                m: 1
                                            }}
                                        >
                                            <Typography
                                                sx={{ fontSize: "small", textAlign: "center", fontWeight: 500 }}
                                            >{`Model: ${FiltersData.Model.label}`}</Typography>
                                            <CloseRoundedIcon
                                                sx={{ fontSize: "medium", fontWeight: 500, ml: 1 }}
                                                onClick={() => handleClearFilter("Model")}
                                            />
                                        </Box>
                                    ) : null}
                                    {FiltersData?.Trim?.label ? (
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            sx={{
                                                width: "fit-content",
                                                textAlign: "center",
                                                backgroundColor: "#DDDDDD",
                                                p: 1.3,
                                                m: 1
                                            }}
                                        >
                                            <Typography
                                                sx={{ fontSize: "small", textAlign: "center", fontWeight: 500 }}
                                            >{`Trim: ${FiltersData.Trim.label}`}</Typography>
                                            <CloseRoundedIcon
                                                sx={{ fontSize: "medium", fontWeight: 500, ml: 1 }}
                                                onClick={() => handleClearFilter("Trim")}
                                            />
                                        </Box>
                                    ) : null}
                                    {FiltersData?.Engine?.label ? (
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            sx={{
                                                width: "fit-content",
                                                textAlign: "center",
                                                backgroundColor: "#DDDDDD",
                                                p: 1.3,
                                                m: 1
                                            }}
                                        >
                                            <Typography
                                                sx={{ fontSize: "small", textAlign: "center", fontWeight: 500 }}
                                            >{`Engine: ${FiltersData.Engine.label}`}</Typography>
                                            <CloseRoundedIcon
                                                sx={{ fontSize: "medium", fontWeight: 500, ml: 1 }}
                                                onClick={() => handleClearFilter("Engine")}
                                            />
                                        </Box>
                                    ) : null}
                                    {FiltersData?.Color?.label ? (
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            sx={{
                                                width: "fit-content",
                                                textAlign: "center",
                                                backgroundColor: "#DDDDDD",
                                                p: 1.3,
                                                m: 1
                                            }}
                                        >
                                            <Typography
                                                sx={{ fontSize: "small", textAlign: "center", fontWeight: 500 }}
                                            >{`Color: ${FiltersData.Color.label}`}</Typography>
                                            <CloseRoundedIcon
                                                sx={{ fontSize: "medium", fontWeight: 500, ml: 1 }}
                                                onClick={() => handleClearFilter("Color")}
                                            />
                                        </Box>
                                    ) : null}
                                    {FiltersData?.Transmission?.label ? (
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            sx={{
                                                width: "fit-content",
                                                textAlign: "center",
                                                backgroundColor: "#DDDDDD",
                                                p: 1.3,
                                                m: 1
                                            }}
                                        >
                                            <Typography
                                                sx={{ fontSize: "small", textAlign: "center", fontWeight: 500 }}
                                            >{`Transmission: ${FiltersData.Transmission.label}`}</Typography>
                                            <CloseRoundedIcon
                                                sx={{ fontSize: "medium", fontWeight: 500, ml: 1 }}
                                                onClick={() => handleClearFilter("Transmission")}
                                            />
                                        </Box>
                                    ) : null}
                                </Box>

                                <Box
                                    component={view === 0 ? Grid : Box}
                                    container
                                    m={view === 0 ? 0 : 2}
                                    p={3}
                                    sx={{
                                        display: view === 0 ? "grid" : "box",
                                        rowGap: 4,
                                        columnGap: 2,
                                        gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",

                                        // Media query for small screens
                                        "@media screen and (max-width: 600px)": {
                                            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))"
                                        },

                                        // Media query for large screens
                                        "@media screen and (min-width: 601px) and (max-width: 1024px)": {
                                            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"
                                        },

                                        // Media query for extra-large screens
                                        "@media screen and (min-width: 1025px)": {
                                            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"
                                        },
                                        justifyItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    {FilteredData?.length > 0 ? (
                                        FilteredData?.map((details: any) => (
                                            <Grid>
                                                {view === 0 && (
                                                    <Grid item>
                                                        <ProductCard carList={details} />
                                                    </Grid>
                                                )}
                                                {view === 1 && (
                                                    <Grid item>
                                                        <ProductListCard carList={details} />
                                                    </Grid>
                                                )}
                                            </Grid>
                                        ))
                                    ) : (
                                        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <Typography color="#000">No Results Found</Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                )}
            </Box>
            {/* )} */}
        </Box>
    );
};
export default Product;
