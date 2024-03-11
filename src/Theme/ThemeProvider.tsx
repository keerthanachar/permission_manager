import React from "react";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";

import App from "../App";
import HoC from "../Components/reusableComponents";
import { useAppSelector } from "../Redux/hooks";

import provideTheme from "./index";

const ThemeProviders = () => {
    const { theme } = useAppSelector((state) => state);
    const { loading } = useAppSelector((state: any) => state.loaderState);
    const { open } = useAppSelector((state: any) => state.alertNotification);
    return (
        <ThemeProvider theme={provideTheme(theme)}>
            <CssBaseline enableColorScheme />
            {loading ? (
                <Box sx={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <HoC.Spinner open={loading} />
                </Box>
            ) : (
                <Box component="div">
                    <App />
                    {open && <HoC.Notification />}
                </Box>
            )}
        </ThemeProvider>
    );
};

export default ThemeProviders;
