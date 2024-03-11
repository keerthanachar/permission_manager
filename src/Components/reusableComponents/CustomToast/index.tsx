import React from "react";
import { ToastContainer } from "react-toastify";

import { Box } from "@mui/material";

import { toastProps } from "./types";

import "react-toastify/dist/ReactToastify.css";

const CustomToast: React.FC<toastProps> = ({ position, theme }) => {
    const customeToastDetails: any = { position: "top-center", type: "success", theme: "dark" };
    return (
        <Box>
            <ToastContainer
                position={customeToastDetails?.position || position}
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                closeButton={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={customeToastDetails?.theme || theme}
            />
        </Box>
    );
};
export default CustomToast;
