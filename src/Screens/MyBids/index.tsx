import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { IoGridSharp } from "react-icons/io5";

import { Box, Grid, IconButton, Paper, Tooltip, Typography } from "@mui/material";

import Header from "../../Components/Header/Header";
import HoC from "../../Components/reusableComponents";
import { GetBidByUserIdData } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleView } from "../../Redux/Reducer";

import MyBidsDetailCard from "./myBidsCardDetails";
import MyBidsDetailList from "./myBidsListDetails";

const MyBids = () => {
    const dispatch = useAppDispatch();
    const { mybids, user, View } = useAppSelector((state) => state);
    const [searchData, setSearchData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState(View?.MyBids);
    const handleViewType = () => {
        setView(view === 0 ? 1 : 0);
        dispatch(handleView({ ...View, MyBids: view === 0 ? 1 : 0 }));
    };
    const GetAPI = async () => {
        setLoading(true);
        await dispatch(GetBidByUserIdData(user.UserID));
        setLoading(false);
    };
    useEffect(() => {
        GetAPI();
        setSearchData(mybids);
    }, []);

    return (
        <Box m={3}>
            {loading ? (
                <HoC.Spinner open={loading} />
            ) : (
                <>
                    <Grid container spacing={1}>
                        <Grid container spacing={1} display="flex-end">
                            <Header
                                title="My Bids"
                                searchField
                                styles={{
                                    paddingLeft: 3,
                                    padding: 1,
                                    paddingRight: 1
                                }}
                                data={mybids}
                                searchData={setSearchData}
                            />
                        </Grid>
                    </Grid>
                    <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Tooltip title={view === 0 ? "Click for List View" : "Click for Grid view"}>
                            <IconButton onClick={handleViewType}>{view === 0 ? <FaList /> : <IoGridSharp />}</IconButton>
                        </Tooltip>
                    </Grid>
                    <Box component={Paper} p={1} pt={1} mt={2} sx={{ borderRadius: "0px", width: "100%" }}>
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
                                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
                                },
                                justifyItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            {searchData?.length ? (
                                searchData?.map((details: any) =>
                                    details?.Inventory?.map((ee: any) => (
                                        <Grid>
                                            {view === 0 && (
                                                <Grid item>
                                                    <MyBidsDetailCard MyBids={details} Inventory={ee} />
                                                </Grid>
                                            )}
                                            {view === 1 && (
                                                <Grid item>
                                                    <MyBidsDetailList MyBids={details} Inventory={ee} />
                                                </Grid>
                                            )}
                                        </Grid>
                                    ))
                                )
                            ) : (
                                <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                    <Typography color="#000">No Results Found</Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default MyBids;
