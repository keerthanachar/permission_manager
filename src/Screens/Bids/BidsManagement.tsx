import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { FaList } from "react-icons/fa";
import { IoGridSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// import { useNavigate } from "react-router-dom";
import { Box, Grid, IconButton, Paper, Tooltip, Typography } from "@mui/material";

import HoC from "../../Components/reusableComponents";
import BidManagementCard from "../../Components/reusableComponents/BidManagementCard";
import BidManagementList from "../../Components/reusableComponents/BidManagementList";
import SortBy from "../../Components/reusableComponents/SortBy";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleView, updateBidsDetails } from "../../Redux/Reducer";
import { validateFormOnSubmit } from "../../reusableFunctions/ReusableFunctions";

import { FilterManagement } from "./Uitilities";

const BidsManagement = ({ dealers, bidsDataFromInventory }: any) => {
    const { user, breakPoints, View } = useAppSelector((state) => state);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [bidsList, setBidsList] = useState(bidsDataFromInventory);
    const [sortOrder, setSortOrder] = useState(2);
    const [view, setView] = useState(View?.BidManagement);

    const handleViewType = () => {
        setView(view === 0 ? 1 : 0);
        dispatch(handleView({ ...View, BidManagement: view === 0 ? 1 : 0 }));
    };
    const handleSortBy = (val: any) => {
        setSortOrder(val);
        if (val === 0) {
            // Sort in ascending order
            const sortedBids = [...bidsDataFromInventory].sort((a: any, b: any) => {
                const priceA = Number(a?.RDPrice) || 0;
                const priceB = Number(b?.RDPrice) || 0;

                return priceA - priceB;
            });

            setBidsList(sortedBids);
        } else if (val === 1) {
            // Sort in descending order
            const sortedBids = [...bidsDataFromInventory].sort((a: any, b: any) => {
                const priceA = Number(a?.RDPrice) || 0;
                const priceB = Number(b?.RDPrice) || 0;

                return priceB - priceA;
            });

            setBidsList(sortedBids);
        } else {
            // Restore the original order
            setBidsList(bidsDataFromInventory);
        }
    };
    const filterDealerData = Array.from(
        new Set(
            dealers
                ?.filter((item: any) => item.IsDealerActive === 1)
                ?.map((e: any) => {
                    return { label: e.Name, value: e.DealerID };
                })
        )
    );
    const filterYear = Array.from(new Set(bidsList?.map((item: any) => item?.Year?.toString()).filter((e: any) => e !== undefined)))
        ?.sort((a: any, b: any) => b - a)
        ?.map((year: any) => ({ label: year, value: year }));
    const filterCardName = Array.from(new Set(bidsList?.map((item: any) => item?.Make?.toString()).filter((e: any) => e !== undefined)))?.map(
        (make: any) => ({ label: make, value: make })
    );
    const filterPrice = Array.from(new Set(bidsList?.map((item: any) => item?.RDPrice?.toString()).filter((e: any) => e !== undefined)))?.map(
        (RDPrice: any) => ({
            label: RDPrice !== "" ? `$${parseFloat(RDPrice).toFixed(0)}` : "Inquire for Price",
            value: `$${parseFloat(RDPrice).toFixed(0)}`
        })
    );

    const formikProps = useFormik({
        initialValues: {
            ...FilterManagement?.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a }))
        },
        onSubmit: async () => {},
        validate: (values: any) => {
            const filterConditions: any[] = [];

            if (values?.DealerName) {
                filterConditions.push((e: any) => e?.DealerID === values?.DealerName?.value);
            }

            if (values?.Year) {
                filterConditions.push((e: any) => e?.Year.toString() === values?.Year?.value);
            }

            if (values?.CarName) {
                filterConditions.push((e: any) => e?.Make === values?.CarName?.value);
            }

            if (values?.RDPrice) {
                filterConditions.push(
                    (e: any) =>
                        // eslint-disable-next-line no-console
                        `${parseFloat(e?.RDPrice.replace("$", "")).toFixed(0)}` === values?.RDPrice?.value.replace("$", "")
                );
            }

            // Combine all conditions using logical AND
            if (filterConditions.length > 0) {
                const combinedFilter = (e: any) => filterConditions.every((condition) => condition(e));
                const filteredData = bidsList?.filter(combinedFilter);
                setBidsList(filteredData);
            } else {
                handleSortBy(sortOrder);
            }

            return validateFormOnSubmit(values, [FilterManagement]);
        }
    });

    const handleClick = (data: any) => {
        dispatch(updateBidsDetails(data));
        navigate("/bids/details");
    };

    React.useEffect(() => {
        if (user?.RoleName === "Dealer Admin") {
            const filterByRole = bidsList?.filter((e: any) => e?.DealerID === user?.DealerID);
            setBidsList(filterByRole);
        }
    }, [user?.RoleName === "Dealer Admin", bidsList]);
    useEffect(() => {
        setBidsList(bidsDataFromInventory);
    }, [bidsDataFromInventory]);

    return (
        <Box p={2}>
            <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
                <Tooltip title={view === 0 ? "Click for List View" : "Click for Grid view"}>
                    <IconButton onClick={handleViewType}>{view === 0 ? <FaList /> : <IoGridSharp />}</IconButton>
                </Tooltip>
            </Grid>
            <Box component={Paper} p={1} sx={{ borderRadius: 0 }}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ flexDirection: breakPoints?.sm ? "row" : "column" }}
                    paddingBottom={2}
                >
                    <Box width={breakPoints?.sm ? "80%" : "100%"}>
                        <HoC.GenerateForm
                            FormData={FilterManagement?.filter((e: any) => {
                                if (user?.RoleName !== "Super Admin" && user?.RoleName !== "Road Dealer Admin") {
                                    if (["DealerName"]?.includes(e?.Name)) {
                                        return false;
                                    }
                                }

                                return true;
                            })?.map((item: any) => {
                                if (item.Name === "DealerName") {
                                    return { ...item, List: filterDealerData };
                                }
                                if (item.Name === "Year") {
                                    return { ...item, List: filterYear };
                                }
                                if (item.Name === "CarName") {
                                    return { ...item, List: filterCardName };
                                }
                                if (item.Name === "RDPrice") {
                                    return { ...item, List: filterPrice };
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
                    <Box width="16%">
                        <SortBy onClick={handleSortBy} />
                    </Box>
                </Box>
                <Box
                    component={view === 0 ? Grid : Box}
                    container
                    m={view === 0 ? 0 : 1}
                    p={3}
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
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
                        },
                        justifyItems: "center",
                        justifyContent: "center"
                    }}
                >
                    {bidsList?.length ? (
                        bidsList?.map((details: any) => (
                            <Grid>
                                {view === 0 && (
                                    <Grid item>
                                        <BidManagementCard carList={details} handleClick={handleClick} />
                                    </Grid>
                                )}
                                {view === 1 && (
                                    <Grid item>
                                        <BidManagementList carList={details} handleClick={handleClick} />
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
        </Box>
    );
};

export default BidsManagement;
