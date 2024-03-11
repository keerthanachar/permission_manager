import React from "react";

import { Box, Grid } from "@mui/material";

import TableComponent from "../../../Components/reusableComponents/TableComponent";
import { useAppSelector } from "../../../Redux/hooks";

import { columnsData, tableDefaultSettingsforExistingDealer } from "./Uitility";

const ExistingDealer = ({ dealers, loader }: any) => {
    const { user } = useAppSelector((state) => state);
    const filterData: any = [];
    if (user?.RoleId !== 1 && user?.RoleId !== 2) {
        filterData.push(...dealers.filter((ee: any) => user?.Dealers?.some((e: any) => e.DealerID === ee.DealerID)));
    }
    const Data = dealers
        ?.filter((e: any) => e.IsDealerActive)
        ?.map((e: any) => ({
            ...e,
            Date: e.CreatedDate,
            Contact: e.ContactName ?? " -",
            Status: e.IsDealerActive ? "Active" : "Inactive"
        }))
        ?.map((e: any) => ({ ...e }))
        ?.sort((a: any, b: any) => {
            return b.DealerID - a.DealerID;
        });
    const combinedData: any = filterData.length ? filterData : Data;
    return (
        <Box component="div">
            <Grid container spacing={1}>
                <Grid item>
                    <TableComponent
                        data={combinedData}
                        columns={columnsData}
                        loading={loader?.loading}
                        enableTopToolbar={false}
                        enableColumnResizing
                        settings={tableDefaultSettingsforExistingDealer}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ExistingDealer;
