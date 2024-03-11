import React, { useRef, useState } from "react";

import { Backdrop, Box, Grid, Menu, MenuItem, Paper, Skeleton, Tooltip, Typography } from "@mui/material";

import { UploadImageProps } from "./types";

const UploadImage: React.FC<UploadImageProps> = ({
    capture,
    uploadFromDevice,
    Label,
    subLabel1,
    subLabel2,
    subLabel3,
    initialValue,
    error,
    onError,
    onUpload,
    errorText,
    name,
    toolTip
}) => {
    const [webCam, setWebCam] = React.useState<boolean>(false);
    // eslint-disable-next-line no-console
    console.log("webCam", webCam);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [loading, setLoading] = useState(false);
    const open = Boolean(anchorEl);
    const fileref: any = useRef();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (capture && uploadFromDevice) {
            setPosition({ x: event.clientX + 2, y: event.clientY + 2 });
            setAnchorEl(event.currentTarget);
        } else if (capture) {
            setWebCam(true);
        } else if (uploadFromDevice) {
            fileref.current!.click();
        }
    };
    const uploadImage = async (file: any) => {
        setLoading(true);
        try {
            onUpload(file);
            setLoading(false);
        } catch (e) {
            onError?.("Something Went's Wrong");
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const ariaControls = open ? name : undefined;
    let boxShadow = "-moz-initial";
    const animation = !uploadFromDevice ? "pulse" : "wave";

    if (error) {
        boxShadow = "0px 3px 5px -1px #505050, 0px 5px 8px 0px #303030, 0px 1px 14px 0px #a8a8a8";
    }
    return (
        <>
            <input hidden accept="image/*" type="file" ref={fileref} onChange={uploadImage} />
            <Menu
                id={name}
                aria-labelledby={name}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}
                anchorReference="anchorPosition"
                anchorPosition={{ top: position.y, left: position.x }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}
            >
                {uploadFromDevice && (
                    <MenuItem
                        onClick={() => {
                            handleClose();
                            fileref?.current!.click();
                        }}
                    >
                        <Box component="label" gap={2} display="flex" sx={{ cursor: "pointer" }} alignContent="center" alignItems="center">
                            <Typography variant="body1" color="secondary">
                                Upload Image From the Device
                            </Typography>
                        </Box>
                    </MenuItem>
                )}
            </Menu>
            <Tooltip title={toolTip ?? ""} placement="top-start">
                <Box maxWidth={600}>
                    <>
                        {initialValue ? (
                            <Box>
                                <>
                                    <Paper sx={{ overflow: "hidden" }}>
                                        <img src={initialValue} alt="Not Found" width="100%" height="100%" style={{ display: "block" }} />
                                    </Paper>

                                    <Box
                                        id={name}
                                        aria-controls={ariaControls}
                                        aria-haspopup="true"
                                        aria-expanded={open && "true"}
                                        onClick={handleClick}
                                        component="div"
                                        display="flex"
                                        gap={2}
                                        sx={{ cursor: "pointer" }}
                                        mb={1}
                                        alignContent="center"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Typography variant="body1" color="secondary" align="center">
                                            Change Image
                                        </Typography>
                                    </Box>
                                </>
                            </Box>
                        ) : (
                            <>
                                {error && (
                                    <Typography variant="body1" color="error" align="center">
                                        {errorText}
                                    </Typography>
                                )}
                                <Paper
                                    variant="elevation"
                                    elevation={5}
                                    onClick={handleClick}
                                    sx={{
                                        position: "relative",
                                        cursor: uploadFromDevice || capture ? "pointer" : "not-allowed",

                                        width: "100%",
                                        height: "50%",
                                        opacity: !uploadFromDevice ? 0.8 : 1,
                                        boxShadow
                                    }}
                                >
                                    <Box component="div">
                                        <Backdrop
                                            sx={{
                                                position: "absolute",
                                                height: "100%",
                                                width: "100%"
                                            }}
                                            component={Paper}
                                            open={!uploadFromDevice || loading}
                                            color="#0000006b"
                                        />
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                height: "100%",
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                            component="div"
                                        />
                                    </Box>
                                    <Box id="uploadImageMenu" component="div" padding={4}>
                                        <Typography align="left" variant="h5" color="primary" marginBottom={5}>
                                            {Label}
                                        </Typography>
                                        <Grid container justifyContent="space-between" gap={5} marginBottom={3}>
                                            <Grid item width="42%">
                                                <Skeleton animation={animation} variant="text" />
                                            </Grid>
                                            <Grid item width="42%">
                                                <Skeleton animation={animation} variant="text" />
                                            </Grid>
                                        </Grid>
                                        <Skeleton animation={animation} variant="text" />
                                        <br />
                                        <Skeleton animation={animation} variant="text" />
                                        <br />
                                        <Box
                                            component="span"
                                            sx={{
                                                position: "absolute",
                                                bottom: -13,
                                                right: -13
                                            }}
                                        />
                                    </Box>
                                </Paper>
                            </>
                        )}
                        {subLabel1 && (
                            <Typography variant="body2" marginTop={1} color="secondary" align="center">
                                {subLabel1}
                            </Typography>
                        )}
                        {subLabel3 && (
                            <Typography variant="body2" color="secondary" align="center">
                                {subLabel3}
                            </Typography>
                        )}

                        {subLabel2 && (
                            <Typography variant="body1" color="secondary" align="center">
                                {subLabel2}
                            </Typography>
                        )}
                    </>
                </Box>
            </Tooltip>
        </>
    );
};
export default UploadImage;
