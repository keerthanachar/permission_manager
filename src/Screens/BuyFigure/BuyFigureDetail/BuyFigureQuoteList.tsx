import React from "react";

import { Box, Grid } from "@mui/material";

import TableComponent from "../../../Components/reusableComponents/TableComponent";
import { useAppSelector } from "../../../Redux/hooks";

import { columnsData, tableDefaultSettingsforBuyFigure } from "./Uitility";

const QuotesList = ({ Loader }: any) => {
    const { quoteDetails } = useAppSelector((state) => state);

    return (
        <Box component="div" width="100%" p={2}>
            <Grid container spacing={1}>
                <Grid item xs={12} lg={12}>
                    <TableComponent
                        data={quoteDetails}
                        columns={columnsData}
                        loading={Loader?.loading}
                        enableTopToolbar={false}
                        enableColumnResizing
                        settings={tableDefaultSettingsforBuyFigure}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default QuotesList;
