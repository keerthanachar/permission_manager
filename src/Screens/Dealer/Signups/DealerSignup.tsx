import React from "react";

import { Box, Grid } from "@mui/material";

import TableComponent from "../../../Components/reusableComponents/TableComponent";

import { columns, tableDefaultSettingsforDealerSignup } from "./Uitility";

const DealerSignup = ({ dealers, loader }: any) => {
    const filteredData = dealers?.filter((e: any) => !e.IsDealerActive);
    const data = filteredData
        ?.map((e: any) => ({ ...e, Address_1: `${e.Address_1 ?? ""} ${e.Address_2 ?? ""}` }))
        ?.sort((a: any, b: any) => {
            return b.DealerID - a.DealerID;
        });
    return (
        <Box component="div" width="100%" p={2}>
            <Grid container spacing={1}>
                <Grid item xs={12} lg={12}>
                    <TableComponent
                        data={data}
                        columns={columns}
                        loading={loader?.loading}
                        enableTopToolbar={false}
                        enableColumnResizing
                        settings={tableDefaultSettingsforDealerSignup}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default DealerSignup;
