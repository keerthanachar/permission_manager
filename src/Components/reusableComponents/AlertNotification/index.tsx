import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Alert, Button, IconButton, Paper, Snackbar, Typography } from "@mui/material";
import Grow from "@mui/material/Grow";
import Slide from "@mui/material/Slide";
import Zoom from "@mui/material/Zoom";
import { Box } from "@mui/system";

import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { initialState } from "../../../Redux/InitialState";
import { showAlert } from "../../../Redux/Reducer";

const AlertNotification = () => {
    const { alertNotification } = useAppSelector((state) => state);
    const verticalPosition = alertNotification?.position?.vertical || "top";
    const horizontalPosition = alertNotification?.position?.horizontal || "right";

    const dispatch = useAppDispatch();
    const onClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway" && !alertNotification?.closableOnBackDropClick) {
            return;
        }
        dispatch(showAlert(initialState?.alertNotification || { open: false }));
    };
    const action = (
        <Box component="div" display="flex" justifyContent="flex-end" gap={0.5} ml={1} alignItems="center" height="90%">
            {alertNotification?.onAction && (
                <Button size="small" variant="text" onClick={alertNotification?.onAction || onClose}>
                    <Typography variant="body1" color="initial">
                        {alertNotification?.actionText || "Close"}
                    </Typography>
                </Button>
            )}
            {alertNotification?.closeIcon && (
                <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            )}
        </Box>
    );
    if (alertNotification?.transitionState?.slide)
        return (
            // <Slide direction={alertNotification?.transitionState?.slide} in>
            <Snackbar
                open={alertNotification?.open || false}
                autoHideDuration={alertNotification?.duration || 10000}
                onClose={alertNotification?.closableOnBackDropClick || alertNotification?.duration ? onClose : () => {}}
                anchorOrigin={{
                    vertical: alertNotification?.position?.vertical || "top",
                    horizontal: alertNotification?.position?.horizontal || "right"
                }}
                TransitionComponent={Slide}
            >
                <Paper elevation={4} sx={{ width: "100%" }}>
                    <Alert severity={alertNotification?.type || "success"} variant="filled" action={action}>
                        {typeof alertNotification?.message === "string" ? (
                            <Typography variant="body1" color="inherit">
                                {alertNotification?.message}
                            </Typography>
                        ) : (
                            <ul style={{ marginLeft: 20 }}>
                                {alertNotification?.message?.map((e: any) => (
                                    <li key={e}>{e}</li>
                                ))}
                            </ul>
                        )}
                    </Alert>
                </Paper>
            </Snackbar>
            // </Slide>
        );
    if (alertNotification?.transitionState?.zoom)
        return (
            <Snackbar
                open={alertNotification?.open || false}
                autoHideDuration={alertNotification?.duration || 10000}
                onClose={alertNotification?.closableOnBackDropClick || alertNotification?.duration ? onClose : () => {}}
                anchorOrigin={{
                    vertical: verticalPosition,
                    horizontal: horizontalPosition
                }}
                TransitionComponent={Zoom}
            >
                <Paper elevation={4}>
                    <Alert severity={alertNotification?.type || "success"} variant="filled" action={action}>
                        {typeof alertNotification?.message === "string" ? (
                            <Typography variant="body1" color="inherit">
                                {alertNotification?.message}
                            </Typography>
                        ) : (
                            <ul style={{ marginLeft: 20 }}>
                                {alertNotification?.message?.map((e: any) => (
                                    <li key={e}>{e}</li>
                                ))}
                            </ul>
                        )}
                    </Alert>
                </Paper>
            </Snackbar>
        );
    return (
        <Snackbar
            open={alertNotification?.open || false}
            autoHideDuration={alertNotification?.duration || 10000}
            onClose={alertNotification?.closableOnBackDropClick || alertNotification?.duration ? onClose : () => {}}
            anchorOrigin={{
                vertical: verticalPosition,
                horizontal: horizontalPosition
            }}
            TransitionComponent={Grow}
        >
            <Paper elevation={4}>
                <Alert severity={alertNotification?.type || "success"} variant="filled" action={action}>
                    {typeof alertNotification?.message === "string" ? (
                        <Typography variant="body1" color="inherit">
                            {alertNotification?.message}
                        </Typography>
                    ) : (
                        <ul style={{ marginLeft: 20 }}>
                            {alertNotification?.message?.map((e: any) => (
                                <li key={e}>{e}</li>
                            ))}
                        </ul>
                    )}
                </Alert>
            </Paper>
        </Snackbar>
    );
};

export default AlertNotification;
