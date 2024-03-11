import React from "react";
import { Rings } from "react-loader-spinner";

import { Backdrop, Box } from "@mui/material";

import { spinnerProps } from "./types";

const SpinnerComponent: React.FC<spinnerProps> = ({ open }) => {
    return (
        <Box sx={{ width: "100%", height: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Backdrop open={open}>
                <Rings height={80} width={80} color="#000" wrapperStyle={{}} wrapperClass="" visible ariaLabel="oval-loading" />
            </Backdrop>
        </Box>
    );
};
export default SpinnerComponent;
