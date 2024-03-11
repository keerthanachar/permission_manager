import * as React from "react";
import { useNavigate } from "react-router-dom";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

const Breadcrumb = ({ screen, title }: any) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    };
    const breadcrumbs = [
        <Typography key="3" color="text.primary" sx={{ cursor: "pointer" }} onClick={handleClick}>
            {screen}
        </Typography>,
        <Typography key="3" color="text.primary">
            {title}
        </Typography>
    ];
    return (
        <Box>
            <Stack spacing={2}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
        </Box>
    );
};
export default Breadcrumb;
