import React from "react";

import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { DialogBoxProps } from "./types";

const DialogBox: React.FC<DialogBoxProps> = ({ children, open, onClose, title, width }) => {
    const useStyles = makeStyles({
        customDialog: {
            borderRadius: 20, // Adjust this value as needed
            width: width ?? 400
        }
    });
    const classes = useStyles();

    if (!open) return <Box />;
    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{ borderRadius: "100px" }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            classes={{ paper: classes.customDialog }}
        >
            {title && (
                <DialogTitle id="alert-dialog-title" color="secondary">
                    {title}
                </DialogTitle>
            )}
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
};

export default DialogBox;
