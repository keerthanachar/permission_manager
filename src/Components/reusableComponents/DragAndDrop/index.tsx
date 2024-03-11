import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import { useAppDispatch } from "../../../Redux/hooks";
import { showAlert } from "../../../Redux/Reducer";

import { DropAndDragInterface } from "./types";

const DragAndDropFile: React.FC<DropAndDragInterface> = ({ handleChange, imageData }) => {
    const dispatch = useAppDispatch();
    const onDrop = useCallback((file: any) => {
        if (file?.length > 0) {
            for (const eachFile of file) {
                if (eachFile.type === "image/png" || eachFile.type === "image/jpeg") {
                    handleChange?.(eachFile);
                } else {
                    dispatch(
                        showAlert({
                            open: true,
                            type: "error",
                            message: "Invalid Image format. Please upload a Jpeg or Png.",
                            closeIcon: true
                        })
                    );
                }
            }
        }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });
    return (
        <Box
            {...getRootProps()}
            px={5}
            py={2}
            border={isDragActive ? "1px dashed #aaa" : "1px dashed #ccc"}
            bgcolor={isDragActive ? "gray.200" : "#d8e0e6"}
        >
            <input accept=".jpg, .png" name="file" {...getInputProps()} type="file" />
            <Box display="flex" justifyContent="center">
                {isDragActive ? (
                    <Typography>Drop the files here...</Typography>
                ) : (
                    <Box display="flex" flexDirection="column" justifyContent="center">
                        <Box display="flex" justifyContent="center">
                            <BackupOutlinedIcon />
                        </Box>
                        <Box display="flex" justifyContent="center">
                            <Typography>Drag and drop files here</Typography>
                        </Box>
                    </Box>
                )}
            </Box>
            {imageData && (
                <Box component="img" src={imageData} alt="Uploaded Image" style={{ maxWidth: "100%", maxHeight: "100%", display: "block" }} />
            )}
        </Box>
    );
};

export default DragAndDropFile;
