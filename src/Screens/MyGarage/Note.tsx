import React from "react";

import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { Grid, IconButton, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

import HeaderComponent from "../../Components/Header/Header";
import { useAppDispatch } from "../../Redux/hooks";
import { handleModel } from "../../Redux/Reducer";

const Note = ({ noteData }: any) => {
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(handleModel({ open: false }));
    };

    return (
        <Box
            component="form"
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh" // Adjust the height according to your needs
        >
            <Paper elevation={5} sx={{ borderRadius: 2, padding: 2, width: "500px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <HeaderComponent title="Notes" />
                            </Grid>
                            <Grid item mt={-2}>
                                <IconButton onClick={handleClose}>
                                    <HighlightOffRoundedIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ overflowWrap: "break-word" }}>
                            {noteData}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default Note;
