/* eslint-disable no-unsafe-optional-chaining */
import React from "react";

import { Box, Grid, Paper, Typography } from "@mui/material";

import BackButton from "../../../Components/reusableComponents/BackButton";
import { useAppSelector } from "../../../Redux/hooks";

const ViewDetails = () => {
    const { breakPoints, dealerAdminData } = useAppSelector((state) => state);
    const filteredData = Object.entries(dealerAdminData).filter(
        ([key, value]: [string, any]) =>
            value !== null &&
            typeof value !== "object" &&
            (typeof value !== "string" || value.trim() !== "") &&
            !key.startsWith("Is") &&
            key !== "RowGUID" &&
            key !== "RecordStatus" &&
            value !== 0 &&
            key !== "CreatedDate" &&
            key !== "ModifyDate" &&
            key !== "DealerID" &&
            key !== "PriceOption" &&
            key !== "CreatedBy"
    );
    const keyDisplayNameMap: any = {
        ContactName: "Contact Name",
        Name: "Dealer Name",
        BillingEmail: "Billing Email",
        PhoneNo: "Phone Number",
        SecondaryPhoneNo: "Secondary Phone",
        WebsiteURL: "Website URL",
        Address_1: "Address",
        Address_2: "Address 2",
        TimeZone: "Time Zone",
        GeoLocation: "Geo Location",
        InventoryStatus: "Inventory Status",
        AutoListDays: "Auto List Days",
        PriceOption: "Price Option",
        Cutoff_Days: "Cutoff Days"
    };
    const dealerFormKeys = ["Name", "ContactName", "Email", "BillingEmail", "PhoneNo", "SecondaryPhoneNo", "Fax", "WebsiteURL"];
    const locationKeys = ["Country", "State", "City", "Address_1", "Address_2", "TimeZone", "Zipcode", "GeoLocation"];
    const inventoryKeys = ["InventoryStatus", "AutoListDays", "PriceOption", "Cutoff_Days"];
    return (
        <>
            <Box m={2}>
                <BackButton />
            </Box>
            <Grid container spacing={1} p={4} flexWrap="wrap">
                <Grid item display={!breakPoints?.sm ? "block" : "flex"} justifyContent="space-between" sx={{ columnGap: 2 }}>
                    <Box component={Paper} width="24.5vw">
                        <Box>
                            <Typography variant="h5" sx={{ textDecoration: "underline", fontWeight: "bold" }} p={1}>
                                Dealer Form
                            </Typography>
                            {filteredData
                                .filter(([key]) => dealerFormKeys?.includes(key))
                                .map(([key, value]: any, index) => (
                                    <Box key={index} p={2} display="flex">
                                        <Typography variant="body1" sx={{ fontWeight: 600, marginRight: "8px" }}>{`${
                                            keyDisplayNameMap[key] || key
                                        }:`}</Typography>
                                        <Typography variant="body2" noWrap textOverflow="ellipsis">
                                            {value}
                                        </Typography>
                                    </Box>
                                ))}
                        </Box>
                    </Box>

                    <Box component={Paper} width="24vw">
                        <Box>
                            <Typography variant="h5" sx={{ textDecoration: "underline", fontWeight: "bold" }} p={2}>
                                Inventory
                            </Typography>
                            {filteredData
                                .filter(([key]: any) => inventoryKeys?.includes(key))
                                .map(([key, value]: any, index) => (
                                    <Box key={index} p={2} display="flex">
                                        <Typography variant="body2" sx={{ fontWeight: 600, marginRight: "8px" }}>{`${
                                            keyDisplayNameMap[key] || key
                                        }:`}</Typography>
                                        <Box />
                                        <Typography variant="body1">{value}</Typography>
                                    </Box>
                                ))}
                        </Box>
                    </Box>

                    <Box component={Paper} width="25.5vw">
                        <Box>
                            <Typography variant="h5" sx={{ textDecoration: "underline", fontWeight: "bold" }} p={2}>
                                Location Details
                            </Typography>
                            {filteredData
                                .filter(([key]: any) => locationKeys?.includes(key))
                                .map(([key, value]: any, index) => (
                                    <Box key={index} p={2} display="flex">
                                        <Typography variant="body1" sx={{ fontWeight: 600, marginRight: "8px" }}>{`${
                                            keyDisplayNameMap[key] || key
                                        }:`}</Typography>
                                        <Box />
                                        <Typography variant="body2" noWrap>
                                            {value}
                                        </Typography>
                                    </Box>
                                ))}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default ViewDetails;
