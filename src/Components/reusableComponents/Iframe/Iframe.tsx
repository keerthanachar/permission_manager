import React from "react";

import { Box } from "@mui/material";

import { IframeProps } from "./type";

const IframeHOC: React.FC<IframeProps> = ({ src, width, height }) => {
    return (
        <Box component="div">
            <iframe src={src} width={width} height={height} title="Embedded Content" />
        </Box>
    );
};

export default IframeHOC;
