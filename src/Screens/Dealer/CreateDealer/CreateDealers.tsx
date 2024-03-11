import React from "react";

import { Box, Grid, Paper } from "@mui/material";

import HeaderComponent from "../../../Components/Header/Header";
import TabsComponent from "../../../Components/reusableComponents/Tabs";
import { useAppSelector } from "../../../Redux/hooks";
import { en } from "../../../translate/en";

import UserDetailsForm from "./User/UserDetailsForm";
import DealerForm from "./DealersForm";
import InventorySettings from "./InventorySettings";
import DealerLocationForm from "./LocationDetailsForm";

const CreateDealer = () => {
    const { updatedDealer } = useAppSelector((state) => state);
    const tabsData = [
        { value: "Dealer Details", label: "Dealer Details", content: <DealerForm />, disabled: false, color: "#A462FF", tabColor: "#A462FF" },
        {
            value: "Location Details",
            label: "Location Details",
            content: <DealerLocationForm />,
            disabled: !updatedDealer?.IsDealerActive
        },
        {
            value: "Inventory and List Settings",
            label: "Inventory and List Settings",
            content: <InventorySettings />,
            disabled: !updatedDealer?.IsDealerActive
        },
        { value: "Users", label: "Users", content: <UserDetailsForm />, disabled: !updatedDealer?.IsDealerActive }
    ];

    return (
        <Box>
            <Box>
                <Grid container spacing={1} mt={2}>
                    <HeaderComponent title={`${en.dealers} > Create Dealer`} backButton />
                </Grid>
            </Box>
            <Box component="div" width="100%" mt={2} px={4}>
                <Grid container lg={12} spacing={1}>
                    <Grid item lg={12}>
                        <Box component={Paper}>
                            <TabsComponent tabData={tabsData} />
                            {/* <DealerUserList /> */}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
export default CreateDealer;
