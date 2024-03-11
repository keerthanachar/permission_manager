import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Grid } from "@mui/material";

import Header from "../../Components/Header/Header";
// import Select from "../../Components/reusableComponents/Select";
import TableComponent from "../../Components/reusableComponents/TableComponent";
import RoutesEnum from "../../Enums/Routes.enum";
import { GetPrivateNetwork } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";

// import { en } from "../../translate/en";
import { PrivateNetworkcolumns, tableDefaultSettingsforPrivateNetwork } from "./Uitilities";

const PrivateNetworks = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { PrivateNetworkLoader, PrivateNetworkData } = useAppSelector((state) => state);
    const [filterNetworkData, setfilterNetworkData] = useState<any>([]);
    const [searchData, setSearchData] = useState<any>([]);
    const GetPrivateNetworkAPI = async () => {
        await dispatch(GetPrivateNetwork());
    };
    useEffect(() => {
        GetPrivateNetworkAPI();
    }, []);
    useEffect(() => {
        setfilterNetworkData(searchData);
    }, [searchData]);
    return (
        <Box component="div">
            <Grid container spacing={1} mt={2} px={2}>
                <Header
                    title="Private Network"
                    searchField
                    button
                    buttontext="Add Private Network"
                    styles={{ fontSize: 12 }}
                    data={PrivateNetworkData}
                    searchData={setSearchData}
                    handleClick={() => {
                        navigate(RoutesEnum.addprivateNetworks);
                    }}
                />
            </Grid>
            <Box component="div" width="100%" p={4}>
                <TableComponent
                    data={PrivateNetworkData || filterNetworkData}
                    columns={PrivateNetworkcolumns}
                    loading={PrivateNetworkLoader?.loading}
                    tableHeader="Private Networks"
                    settings={tableDefaultSettingsforPrivateNetwork}
                />
            </Box>
        </Box>
    );
};

export default PrivateNetworks;
