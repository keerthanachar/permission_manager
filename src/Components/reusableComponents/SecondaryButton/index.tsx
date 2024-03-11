import React from "react";

import { Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { buttonProps } from "../PrimaryButton/types";

const CustomSecondaryButton: React.FC<buttonProps> = ({ buttonText, variant, backgroundColor, color, handleClick, type }) => {
    const SecondaryButtonDetails: any = { color: "#000000", backgroundColor: "#0000", variant: "outlined" };
    const useStyles = makeStyles({
        customButton: {
            backgroundColor: SecondaryButtonDetails?.backgroundColor || backgroundColor,
            color: SecondaryButtonDetails?.color || color,
            boxShadow: "none",
            width: "100%",
            textTransform: "none"
        }
    });
    const classes = useStyles();
    return (
        <Box component="div" width="100%" display="flex" justifyContent="center">
            <Button
                className={classes.customButton}
                type={type}
                variant={SecondaryButtonDetails?.variant || variant || "outlined"}
                onClick={handleClick}
            >
                {buttonText}
            </Button>
        </Box>
    );
};
export default CustomSecondaryButton;
