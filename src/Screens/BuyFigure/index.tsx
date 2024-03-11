import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { FaList } from "react-icons/fa";
import { IoGridSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import { Button, Grid, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";

import API from "../../API";
import Header from "../../Components/Header/Header";
import HoC from "../../Components/reusableComponents";
import DialogBox from "../../Components/reusableComponents/Dailog";
import Select from "../../Components/reusableComponents/Select";
import { RolesData } from "../../config";
// import SwitchComponent from "../../Components/reusableComponents/SwitchComponent";
import RoutesEnum from "../../Enums/Routes.enum";
import { GetBuyFigure } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleView, showAlert } from "../../Redux/Reducer";
import { validateFormOnSubmit } from "../../reusableFunctions/ReusableFunctions";
import { en } from "../../translate/en";

import BuyFigureCard from "./BuyFigureCard";
import BuyFigureListDetails from "./BuyFigureList";
import { filterBuyfigureData } from "./Logics";
import { BuyFigureFilterManagement } from "./Uitilities";

const BuyFigureDetails = () => {
    const navigate = useNavigate();
    const { breakPoints, BuyFigureData, PrivateBuyFigureData, user, dealers, View } = useAppSelector((state) => state);
    const [buyFigure, setBuyFigure] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [searchData, setSearchData] = useState(BuyFigureData || []);
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState(View?.BuyFigure);

    const [selectedBuyFigure, setSelectedBuyFigure] = React.useState<any>([]);
    const [IsBulkUpdate, setIsBulkUpdate] = React.useState<boolean>(false);
    const [privateNetwork, setPrivateNetwork] = React.useState<any>(null);
    const [IsDailog, setIsDailog] = useState<any>(false);

    const dispatch = useAppDispatch();
    const handleViewType = () => {
        setView(view === 0 ? 1 : 0);
        dispatch(handleView({ ...View, BuyFigure: view === 0 ? 1 : 0 }));
    };
    // const [showMyBuyFigure, setShowMyBuyFigure] = useState(false);
    const PrivateNetwork = user?.Dealers?.map((e: any) => ({ label: e?.PN_Name, value: e?.PN_ID }))?.filter((e: any) => e.label !== null);
    const screen = user?.Screens?.filter((e: any) => e.Screen_Id === 13)?.[0];
    const filterDealerData = Array.from(
        new Set(
            dealers
                ?.filter((item: any) => item.IsDealerActive === 1)
                ?.map((e: any) => {
                    return { label: e.Name, value: e.DealerID };
                })
        )
    );
    const filterYear = Array.from(new Set(buyFigure?.map((item: any) => item?.Year?.toString()).filter((e: any) => e !== undefined)))
        ?.sort((a: any, b: any) => b - a)
        ?.map((year: any) => ({ label: year, value: year }));
    const filterMake = Array.from(new Set(buyFigure?.map((item: any) => item?.Make?.toString()).filter((e: any) => e !== undefined)))?.map(
        (make: any) => ({ label: make, value: make })
    );
    const filterModel = Array.from(new Set(buyFigure?.map((item: any) => item?.Model?.toString()).filter((e: any) => e !== undefined)))?.map(
        (model: any) => ({ label: model, value: model })
    );
    // const filterMyBuyFigure: any = buyFigure?.map((item: any) => item).filter((e: any) => e?.UserID === user.UserID);
    // eslint-disable-next-line no-console
    const filteredDealers = PrivateBuyFigureData?.map((e: any) => e?.PN_ID).filter((id: any) => id !== null);

    const userDealer = user?.Dealers?.map((e: any) => e?.PN_ID).filter((id: any) => id !== null);

    // Check if any PN_ID from filteredDealers exists in userDealer
    const hasMatchingPN_ID = filteredDealers?.some((id: any) => userDealer?.includes(id));

    let filteredBuyFigureData: any = [];
    if (hasMatchingPN_ID) {
        // Filter the PrivateBuyFigureData based on the condition
        filteredBuyFigureData = PrivateBuyFigureData?.filter((e: any) => userDealer?.includes(e?.PN_ID));
    }

    const formikProps: any = useFormik({
        initialValues: {
            ...BuyFigureFilterManagement?.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a }))
        },
        onSubmit: async () => {},
        validate: (values: any) => {
            const filterConditions: any[] = filterBuyfigureData(values, user);
            if (values?.IsPrivateNetwork) {
                setIsBulkUpdate(false);
                if (values?.MyBuyFigure) {
                    const combinedFilter = (e: any) => filterConditions.every((condition) => condition(e));
                    const filteredData = filteredBuyFigureData.filter(combinedFilter);
                    setBuyFigure(filteredData);
                } else {
                    const combinedFilter = (e: any) => filterConditions.every((condition) => condition(e));
                    const filteredData = filteredBuyFigureData.filter(combinedFilter);
                    setBuyFigure(filteredData);
                    // setBuyFigure(PrivateBuyFigureData);
                }
            } else if (filterConditions.length > 0) {
                const combinedFilter = (e: any) => filterConditions?.every((condition) => condition(e));
                const filteredData = buyFigure?.filter(combinedFilter);
                setBuyFigure(filteredData);
            } else {
                setBuyFigure(originalData);
            }

            return validateFormOnSubmit(values, [BuyFigureFilterManagement]);
        }
    });
    const getApi = async () => {
        try {
            setLoading(true);
            await dispatch(GetBuyFigure());
            setLoading(false);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log("error", error);
        }
    };
    const HandleStatus = () => {
        getApi();
    };
    const handleCardClick = (cardObject: any) => {
        const buyFigure_ID = cardObject.BuyFigure_ID;

        setSelectedBuyFigure((prevSelectedIds: any[]) => {
            const existingIndex = prevSelectedIds.findIndex((item: any) => item.BuyFigure_ID === buyFigure_ID);

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
        if (!selectedBuyFigure?.[0]?.IsPrivateNetwork) {
            try {
                setLoading(true);
                const PtoP = selectedBuyFigure.map((e: any) => ({
                    ...e,
                    PN_ID: privateNetwork.value,
                    PN_Name: privateNetwork.label,
                    IsPrivateNetwork: 1
                }));
                const responseArray: any = await API.BuyFigure.updateBuyFigurePrivateNetwork(PtoP);
                Promise.all(
                    responseArray?.data?.map(async (res: any) => {
                        if (res?.status === 1) {
                            setIsDailog(false);
                            setIsBulkUpdate(false);
                            setSelectedBuyFigure([]);
                            await dispatch(GetBuyFigure());
                            dispatch(
                                showAlert({
                                    open: true,
                                    type: "success",
                                    message: "Updated to Private Network Successfully",
                                    closeIcon: true
                                })
                            );
                            setLoading(false);
                        } else {
                            setIsDailog(false);
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
                setLoading(false);
                dispatch(
                    showAlert({
                        open: true,
                        type: "success",
                        message: error?.response?.data?.message,
                        closeIcon: true
                    })
                );
            }
        } else {
            setLoading(true);
            try {
                const PtoP = selectedBuyFigure.map((e: any) => ({
                    ...e,
                    PN_ID: null,
                    PN_Name: null,
                    IsPrivateNetwork: false
                }));
                const responseArrayData: any = await API.BuyFigure.updateBuyFigurePrivateNetwork(PtoP);

                Promise.all(
                    responseArrayData?.data?.map(async (res: any) => {
                        if (res?.status === 1) {
                            setIsBulkUpdate(false);
                            setIsDailog(false);
                            setSelectedBuyFigure([]);
                            await dispatch(GetBuyFigure());
                            dispatch(
                                showAlert({
                                    open: true,
                                    type: "success",
                                    message: "Updated to Public Network Successfully",
                                    closeIcon: true
                                })
                            );
                            setLoading(false);
                        } else {
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
                setLoading(false);
                dispatch(
                    showAlert({
                        open: true,
                        type: "success",
                        message: error?.response?.data?.message,
                        closeIcon: true
                    })
                );
            }
        }
        setPrivateNetwork(null);
    };
    useEffect(() => {
        if (searchData) {
            setBuyFigure(searchData);
            setOriginalData(searchData);
        } else {
            setBuyFigure(BuyFigureData);
            setOriginalData(BuyFigureData);
        }
    }, [searchData, BuyFigureData]);
    useEffect(() => {
        getApi();
        setBuyFigure(BuyFigureData);
    }, []);
    // const handleSwitchChange = () => {
    //     setSearchData(filterMyBuyFigure);
    // };
    return (
        <Box>
            {loading ? (
                <HoC.Spinner open={loading} />
            ) : (
                <Box m={2} mt={3} p={2}>
                    <Grid container spacing={1} display="flex-end">
                        <Header
                            title="Buy Figure"
                            searchField
                            styles={{
                                paddingLeft: 3,
                                padding: 1,
                                paddingRight: 2
                            }}
                            button={screen.IsAdd}
                            buttontext="Add Buy Figure"
                            handleClick={() => {
                                navigate(RoutesEnum.addBuyFigure);
                            }}
                            data={BuyFigureData}
                            searchData={setSearchData}
                        />
                    </Grid>
                    <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Tooltip title={view === 0 ? "Click for List View" : "Click for Grid view"}>
                            <IconButton onClick={handleViewType}>{view === 0 ? <FaList /> : <IoGridSharp />}</IconButton>
                        </Tooltip>
                    </Grid>
                    <Box component={Paper} p={3} m={1} sx={{ borderRadius: 0, boxShadow: 0 }}>
                        {/* <Tooltip title="Dealer is not assigned to any Private network"> */}
                        {user?.RoleId !== RolesData?.SuperAdmin?.RoleId && user?.RoleId !== RolesData?.RoadDealerAdmin?.RoleId && (
                            <Box ml={1} display="flex" justifyContent="flex-end" gap={2}>
                                {IsBulkUpdate && (
                                    <Typography sx={{ display: "flex", justifyContent: "center", color: "#333", fontWeight: 800, mt: 1, ml: 1 }}>
                                        {selectedBuyFigure?.length} Buy Figures Selected
                                    </Typography>
                                )}
                                <Button
                                    sx={{
                                        padding: "5px",
                                        backgroundColor: "#5318A3",
                                        color: "#ffff",
                                        fontWeight: 300,
                                        "&:hover": {
                                            background: "#5318A3"
                                        },
                                        "&:disabled": {
                                            color: "#fff",
                                            bgcolor: "#8247d4e1"
                                        },
                                        fontSize: "small",
                                        borderRadius: "0px !important"
                                    }}
                                    disabled={!PrivateNetwork?.length}
                                    onClick={
                                        IsBulkUpdate
                                            ? selectedBuyFigure?.[0]?.IsPrivateNetwork
                                                ? () => handleBulkUpdate()
                                                : () => setIsDailog(true)
                                            : () => setIsBulkUpdate(true)
                                    }
                                >
                                    {IsBulkUpdate ? "Save" : "Update Network"}
                                </Button>
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
                                    disabled={!IsBulkUpdate && selectedBuyFigure?.length === 0}
                                    onClick={() => {
                                        setSelectedBuyFigure([]);
                                        setIsBulkUpdate(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        )}
                        {/* </Tooltip> */}
                        <Box>
                            <HoC.GenerateForm
                                FormData={BuyFigureFilterManagement?.map((item: any) => {
                                    if (item.Name === "DealerName") {
                                        return { ...item, List: filterDealerData };
                                    }
                                    if (item.Name === "Year") {
                                        return { ...item, List: filterYear };
                                    }
                                    if (item.Name === "Make") {
                                        return { ...item, List: filterMake };
                                    }
                                    if (item.Name === "Model") {
                                        return { ...item, List: filterModel };
                                    }

                                    return item;
                                })}
                                FormikProps={formikProps}
                                lg={3}
                                xl={3}
                                md={3}
                                xs={12}
                            />
                        </Box>
                        <Grid pt={2} sx={{ display: "flex", flexDirection: "column" }}>
                            {view === 0 && (
                                <Box display="flex" justifyContent={buyFigure?.length ? "flex-start" : "center"} flexWrap="wrap" gap={4}>
                                    {buyFigure?.length ? (
                                        buyFigure?.map((item: any) => (
                                            <BuyFigureCard
                                                carList={item}
                                                handleCardClick={IsBulkUpdate ? handleCardClick : null}
                                                selectedBuyFigure={selectedBuyFigure}
                                                handleUpdatedStatus={HandleStatus}
                                            />
                                        ))
                                    ) : (
                                        <Typography display="flex" justifyContent="center">
                                            No Results Found
                                        </Typography>
                                    )}
                                </Box>
                            )}
                            {view === 1 && (
                                <Box display="flex" justifyContent={buyFigure?.length ? "flex-start" : "center"} flexWrap="wrap" gap={3}>
                                    {buyFigure?.length ? (
                                        buyFigure?.map((item: any) => (
                                            <BuyFigureListDetails
                                                carList={item}
                                                handleCardClick={IsBulkUpdate ? handleCardClick : null}
                                                selectedBuyFigure={selectedBuyFigure}
                                                handleUpdatedStatus={HandleStatus}
                                            />
                                        ))
                                    ) : (
                                        <Typography>No Results Found</Typography>
                                    )}
                                </Box>
                            )}
                        </Grid>
                    </Box>
                </Box>
            )}
            <DialogBox title="Confirm" open={IsDailog} onClose={() => setIsDailog(false)}>
                <Box>
                    <Box display="flex" justifyContent="center">
                        <Typography>{selectedBuyFigure?.[0]?.IsPrivateNetwork ? en.PrivateToPublic : en.SelectPrivateNetwork}</Typography>
                    </Box>
                    {!selectedBuyFigure?.[0]?.IsPrivateNetwork && (
                        <Select
                            id="DealerAssign"
                            value={privateNetwork}
                            placeHolder="Select Dealership"
                            onChange={(e: any) => setPrivateNetwork(e)}
                            list={PrivateNetwork ?? []}
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
                                    setIsDailog(false);
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
export default BuyFigureDetails;
