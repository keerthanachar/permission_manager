import React, { useEffect, useState } from "react";

import { Box, Grid } from "@mui/material";

import Header from "../../Components/Header/Header";
import { GetBidsData } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { en } from "../../translate/en";

import BidsManagement from "./BidsManagement";

const Bid = () => {
    const dispatch = useAppDispatch();
    const { dealers, BidManagement } = useAppSelector((state) => state);
    const [searchData, setSearchData] = useState(BidManagement || []);
    useEffect(() => {
        dispatch(GetBidsData());
    }, []);
    return (
        <Box component="div" width="100%" p={3} pt={3}>
            <Grid container spacing={1}>
                <Header
                    title={`${en.bids} Management`}
                    searchField
                    styles={{
                        paddingLeft: 3,
                        padding: 1,
                        paddingRight: 1,
                        fontWeight: 800
                    }}
                    data={BidManagement}
                    searchData={setSearchData}
                />
            </Grid>
            <Box>
                <BidsManagement dealers={dealers} bidsDataFromInventory={searchData} />
            </Box>
        </Box>
    );
};

export default Bid;
