import React from "react";

import { Box, Typography } from "@mui/material";

import Comingsoon from "../../Assets/ComingSoon.png";

const PageUnderDevelopment = () => {
    return (
        <Box width="100%" pt={2}>
            <Box width="100%" display="flex" justifyContent="center">
                <Box component="img" sx={{ width: "70%", height: "70vh" }} src={Comingsoon} alt="ComingSoon" />
            </Box>
            <Box display="flex" justifyContent="center" pt={1}>
                <Typography variant="h6" fontWeight={700}>
                    Page under development
                </Typography>
            </Box>
        </Box>
    );
};

export default PageUnderDevelopment;
