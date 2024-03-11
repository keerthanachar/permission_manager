import React from "react";

import { Box, Grid, Paper } from "@mui/material";

import HeaderComponent from "../../../../Components/Header/Header";
import TabsComponent from "../../../../Components/reusableComponents/Tabs";
import { en } from "../../../../translate/en";

import ExistingUserForm from "./ExistingUserForm";

const CreateUser = () => {
    const tabsData = [{ value: "Users", label: "Users", content: <ExistingUserForm />, disabled: false }];

    return (
        <Box>
            <Box>
                <Grid container spacing={1} mt={2}>
                    <HeaderComponent title={`${en.existingdealers} > Create User`} backButton />
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
export default CreateUser;
