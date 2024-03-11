import React from "react";

import { Box, Button } from "@mui/material";

import { buttonProps } from "./types";

const CustomPrimaryButton: React.FC<buttonProps> = ({ buttonText, variant, backgroundColor, color, handleClick, type }) => {
    const PrimaryButtonDetails: any = { color: "#fdfdfd", backgroundColor: "#101010", variant: "contained" };
    return (
        <Box component="div" width="100%" display="flex" justifyContent="center">
            <Button
                sx={{
                    backgroundColor: PrimaryButtonDetails?.backgroundColor || backgroundColor || "#101010",
                    color: PrimaryButtonDetails?.color || color,
                    boxShadow: "none",
                    width: "100%",
                    textTransform: "none",
                    fontWeight: 700
                }}
                type={type}
                variant={PrimaryButtonDetails?.variant || variant || "contained"}
                onClick={handleClick}
            >
                {buttonText}
            </Button>
        </Box>
    );
};
export default CustomPrimaryButton;
