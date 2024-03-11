import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { IoGridSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Button, Divider, Grid, IconButton, Paper, Tooltip, Typography } from "@mui/material";

import API from "../../API";
import Header from "../../Components/Header/Header";
import HoC from "../../Components/reusableComponents";
import DialogBox from "../../Components/reusableComponents/Dailog";
import InventoryCard from "../../Components/reusableComponents/InventoryCar";
import InventoryListCar from "../../Components/reusableComponents/InventoryCarList";
import Select from "../../Components/reusableComponents/Select";
import SortBy from "../../Components/reusableComponents/SortBy";
import SwitchComponent from "../../Components/reusableComponents/SwitchComponent";
import RoutesEnum from "../../Enums/Routes.enum";
import { GetInventory } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleClearAllInventory, handleView, showAlert, updateInventory } from "../../Redux/Reducer";
import { en } from "../../translate/en";

import CarFilters from "./Filter";
// import { CarList } from "./Uitilities";

const Inventory = () => {
    const dispatch = useAppDispatch();
    const [privateInventory, setPrivateInventory] = useState(false);
    const [selectedInventoryIds, setSelectedInventoryIds] = React.useState<any>([]);
    const [confirm, setConfirm] = React.useState(false);
    const [privateNetwork, setPrivateNetwork] = React.useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [IsBulkUpdate, setIsBulkUpdate] = React.useState<boolean>(false);

    const onClose = () => {
        setConfirm(false);
    };
    const onOpen = () => setConfirm(true);
    const { breakPoints, InventoryList, FiltersData, user, inventoryLoader, View } = useAppSelector((state) => state);
    const filterInventoryData = InventoryList?.filter(
        (details: any) =>
            user?.RoleName === "Super Admin" ||
            user?.RoleName === "Road Dealer Admin" ||
            (user?.Dealers?.filter((e: any) => e?.DealerID === details?.DealerID) && !details.IsPrivateNetwork)
    );
    const filterPrivateInventory = InventoryList?.filter((item: any) => item.PN_ID);
    const [inventoryData, setInventoryData] = useState(filterInventoryData || []);

    const navigate = useNavigate();
    const windowWidth = window.innerWidth;
    const screen = user?.Screens?.filter((e: any) => e.Screen_Id === 5)?.[0];
    const [view, setView] = useState(View?.Inventory);

    const InventoryPrivateNetwork = user?.Dealers?.map((e: any) => ({ label: e?.PN_Name, value: e?.PN_ID }))?.filter((e: any) => e.label !== null);

    const handleViewType = () => {
        setView(view === 0 ? 1 : 0);
        dispatch(handleView({ ...View, Inventory: view === 0 ? 1 : 0 }));
    };
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
            Transmission: ""
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
        }
    };

    useEffect(() => {
        dispatch(GetInventory(user.RoleId === 1 && user.RoleId === 2 ? null : user?.UserID ?? null));
    }, []);
    const handleSortBy = (val: any) => {
        if (val === 0) {
            // Sort in ascending order
            const sortedBids = [...inventoryData].sort((a: any, b: any) => {
                const priceA = Number(a?.RDPrice) || 0;
                const priceB = Number(b?.RDPrice) || 0;

                return priceA - priceB;
            });

            setInventoryData(sortedBids);
        } else if (val === 1) {
            // Sort in descending order
            const sortedBids = [...inventoryData].sort((a: any, b: any) => {
                const priceA = Number(a?.RDPrice) || 0;
                const priceB = Number(b?.RDPrice) || 0;

                return priceB - priceA;
            });

            setInventoryData(sortedBids);
        } else {
            setInventoryData(filterInventoryData);
        }
    };

    const handleSwitchChange = () => {
        setPrivateInventory((prevState) => !prevState);
        if (!privateInventory) {
            setSelectedInventoryIds([]);
            setIsBulkUpdate(false);
            setInventoryData(filterPrivateInventory);
        } else {
            setIsBulkUpdate(false);
            setSelectedInventoryIds([]);
            setInventoryData(filterInventoryData);
        }
    };
    const handleCardClick = (cardObject: any) => {
        const inventoryId = cardObject.InventoryID;

        setSelectedInventoryIds((prevSelectedIds: any[]) => {
            const existingIndex = prevSelectedIds.findIndex((item: any) => item.InventoryID === inventoryId);

            if (existingIndex !== -1) {
                // Remove the card object from the array
                const newSelectedIds = [...prevSelectedIds];
                newSelectedIds.splice(existingIndex, 1);
                return newSelectedIds;
            }
            // Add the card object to the array
            return [...prevSelectedIds, cardObject];
        });
    };
    const handleBulkUpdate = async () => {
        if (!selectedInventoryIds?.[0]?.IsPrivateNetwork) {
            try {
                setLoading(true);
                const PtoP = selectedInventoryIds?.map((e: any) => ({
                    ...e,
                    PN_ID: privateNetwork.value,
                    PN_Name: privateNetwork.label,
                    IsPrivateNetwork: privateNetwork?.IsPrivateNetwork
                }));
                const responseArray: any = await API.Inventory.UnassignPNInventory(PtoP);
                Promise.all(
                    responseArray?.data?.map(async (res: any) => {
                        if (res?.status === 1) {
                            onClose();
                            setSelectedInventoryIds([]);
                            setIsBulkUpdate(false);
                            dispatch(GetInventory(user?.UserID));
                            dispatch(
                                showAlert({
                                    open: true,
                                    type: "success",
                                    message: "Updated Successfully",
                                    closeIcon: true
                                })
                            );
                            setLoading(false);
                        } else {
                            onClose();
                            setLoading(false);
                            dispatch(
                                showAlert({
                                    open: true,
                                    type: "success",
                                    message: "Failed to update",
                                    closeIcon: true
                                })
                            );
                        }
                    })
                );
            } catch (error: any) {
                onClose();
                setLoading(false);
                dispatch(
                    showAlert({
                        open: true,
                        type: "success",
                        message: error.response.data.message,
                        closeIcon: true
                    })
                );
            }
        } else {
            try {
                setLoading(true);
                const PtoP = selectedInventoryIds?.map((e: any) => ({
                    ...e,
                    PN_ID: null,
                    PN_Name: null,
                    IsPrivateNetwork: false
                }));
                const responseArrayData: any = await API.Inventory.UnassignPNInventory(PtoP);

                Promise.all(
                    responseArrayData?.data?.map(async (res: any) => {
                        if (res?.status === 1) {
                            onClose();
                            setSelectedInventoryIds([]);
                            setIsBulkUpdate(false);
                            setPrivateInventory(false);
                            dispatch(GetInventory(user?.UserID));
                            dispatch(
                                showAlert({
                                    open: true,
                                    type: "success",
                                    message: "Updated Successfully",
                                    closeIcon: true
                                })
                            );
                            setLoading(false);
                        } else {
                            onClose();
                            setLoading(false);
                            dispatch(
                                showAlert({
                                    open: true,
                                    type: "success",
                                    message: "Failed to update",
                                    closeIcon: true
                                })
                            );
                        }
                    })
                );
            } catch (error: any) {
                onClose();
                setLoading(false);
                dispatch(
                    showAlert({
                        open: true,
                        type: "success",
                        message: error.response.data.message,
                        closeIcon: true
                    })
                );
            }
        }
        setPrivateNetwork(null);
    };
    const uniquePN_Name = user?.Dealers?.map((e: any) => ({
        label: e.PN_Name,
        value: e.PN_ID,
        IsPrivateNetwork: true
    }));

    return (
        <Box p={2}>
            {inventoryLoader?.loading ? (
                <HoC.Spinner open={inventoryLoader?.loading} />
            ) : (
                <Box component="div" width="100%" p={1} pt={3}>
                    <Grid container spacing={1} display="flex-end">
                        <Header
                            title={en.inventory}
                            searchField
                            styles={{
                                paddingLeft: 3,
                                padding: 1,
                                paddingRight: user?.RoleName === "Super Admin" || user?.RoleName === "Road Dealer Admin" ? 1 : 2
                            }}
                            button={screen?.IsAdd}
                            buttontext="Inventory"
                            handleClick={() => {
                                dispatch(updateInventory([]));
                                navigate(RoutesEnum.addInventory);
                            }}
                            data={filterInventoryData}
                            searchData={setInventoryData}
                        />
                    </Grid>
                    <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Tooltip title={view === 0 ? "Click for List View" : "Click for Grid view"}>
                            <IconButton onClick={handleViewType}>{view === 0 ? <FaList /> : <IoGridSharp />}</IconButton>
                        </Tooltip>
                    </Grid>

                    <Grid borderRadius={1} display="flex">
                        <CarFilters InventoryList={filterInventoryData} handleFilteredData={(e) => setInventoryData(e)} />
                        <Grid p={2} borderRadius={1} sx={{ paddingLeft: "0px", width: "100%" }}>
                            <Box
                                component={Paper}
                                p={windowWidth < 800 ? 5 : 1}
                                pb={1}
                                sx={{ borderRadius: "0px", width: windowWidth < 800 ? "fit-content" : "100%" }}
                            >
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Typography sx={{ color: "#333", fontWeight: 800, ml: 2 }}>{inventoryData?.length} matching vehicles</Typography>

                                    {user.RoleId !== 1 && user.RoleId !== 2 && (
                                        <Box ml={1} display="flex" justifyContent="space-around" gap={1}>
                                            <Tooltip
                                                title={!InventoryPrivateNetwork?.length ? "Parent Dealership is Not Associated" : "Update Network"}
                                            >
                                                <Button
                                                    sx={{
                                                        padding: "5px",
                                                        backgroundColor: "#5318A3",
                                                        color: "#ffff",
                                                        "&:hover": {
                                                            background: "#5318A3"
                                                        },
                                                        fontWeight: 300,
                                                        fontSize: "small",
                                                        borderRadius: "0px !important",
                                                        "&:disabled": {
                                                            color: "#fff",
                                                            bgcolor: "#8247d4e1"
                                                        }
                                                    }}
                                                    disabled={!InventoryPrivateNetwork?.length}
                                                    onClick={() => (selectedInventoryIds?.length ? onOpen() : setIsBulkUpdate(true))}
                                                >
                                                    {IsBulkUpdate ? "Save" : "Update Network"}
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Cancel">
                                                <Button
                                                    sx={{
                                                        padding: "5px",
                                                        backgroundColor: "#5318A3",
                                                        fontWeight: 300,
                                                        color: "#fff",
                                                        "&:hover": {
                                                            background: "#5318A3"
                                                        },
                                                        fontSize: "small",
                                                        borderRadius: "0px !important",
                                                        cursor: IsBulkUpdate ? "pointer" : "not-allowed",
                                                        "&:disabled": {
                                                            color: "#fff",
                                                            bgcolor: "#8247d4e1"
                                                        }
                                                    }}
                                                    disabled={selectedInventoryIds?.length === 0 && !IsBulkUpdate}
                                                    onClick={() => {
                                                        setSelectedInventoryIds([]);
                                                        setIsBulkUpdate(false);
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                            </Tooltip>
                                            {IsBulkUpdate && (
                                                <Typography
                                                    sx={{ display: "flex", justifyContent: "center", color: "#333", fontWeight: 800, mt: 1, ml: 1 }}
                                                >
                                                    {selectedInventoryIds?.length} Inventory Selected
                                                </Typography>
                                            )}
                                        </Box>
                                    )}
                                    <Tooltip title="Private Inventory">
                                        <Box display="flex" alignItems="center" ml={1}>
                                            <SwitchComponent
                                                id="inventory"
                                                name="privateInventory"
                                                checked={privateInventory}
                                                onChange={handleSwitchChange}
                                                label="Private Inventory"
                                            />
                                        </Box>
                                    </Tooltip>
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
                                    p={2}
                                    sx={{
                                        display: view === 0 ? "grid" : "box",
                                        gap: 4,
                                        gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",

                                        // Media query for small screens
                                        "@media screen and (max-width: 600px)": {
                                            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))"
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
                                    {inventoryData?.length > 0 ? (
                                        inventoryData?.map((details: any) => (
                                            <Grid>
                                                {view === 0 && (
                                                    <Grid item>
                                                        <InventoryCard
                                                            carList={details}
                                                            handleCardClick={IsBulkUpdate ? handleCardClick : null}
                                                            selectedInventoryIds={selectedInventoryIds}
                                                        />
                                                    </Grid>
                                                )}
                                                {view === 1 && (
                                                    <Grid item>
                                                        <InventoryListCar
                                                            carList={details}
                                                            handleCardClick={IsBulkUpdate ? handleCardClick : null}
                                                            selectedInventoryIds={selectedInventoryIds}
                                                        />
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
                </Box>
            )}
            <DialogBox title="Confirm" open={confirm} onClose={onClose}>
                <Box>
                    <Box display="flex" justifyContent="center">
                        <Typography>{selectedInventoryIds?.[0]?.IsPrivateNetwork ? en.PrivateToPublic : en.SelectPrivateNetwork}</Typography>
                    </Box>
                    {!selectedInventoryIds?.[0]?.IsPrivateNetwork && (
                        <Select
                            id="DealerAssign"
                            value={privateNetwork}
                            placeHolder="Select Parent Dealership"
                            onChange={(e: any) => setPrivateNetwork(e)}
                            list={uniquePN_Name ?? []}
                        />
                    )}
                    {privateNetwork?.value && (
                        <Box display="flex" justifyContent="center">
                            <Typography>{en.PublicToPrivate}</Typography>
                        </Box>
                    )}
                    <Box
                        component="div"
                        marginTop={1.5}
                        display="flex"
                        flexDirection={breakPoints?.sm ? "row" : "column-reverse"}
                        gap={1}
                        justifyContent="flex-end"
                        width="100%"
                        py={1}
                    >
                        <Box display="flex" gap={1}>
                            <Button
                                type="button"
                                onClick={() => {
                                    setPrivateNetwork(null);
                                    setConfirm(false);
                                }}
                                variant="outlined"
                            >
                                No
                            </Button>
                            <Button onClick={handleBulkUpdate} variant="filled" sx={{ display: "flex" }} disabled={loading}>
                                {loading ? "Processing.." : "Yes"}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </DialogBox>
        </Box>
    );
};
export default Inventory;
