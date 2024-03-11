import React, { useRef } from "react";

import Button from "@mui/material/Button";
import { Box } from "@mui/system";

import Input from "../Input";

import { uploadFileProps } from "./types";

const FileInputWithButton: React.FC<uploadFileProps> = ({ value, handleChange }) => {
    // const [selectedFile, setSelectedFile] = useState<any>(value || null);
    const fileInputRef: any = useRef();

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            handleChange?.(file);
        }
    };

    const handleBrowseFileClick = () => {
        // Trigger the file input element
        if (fileInputRef.current) {
            fileInputRef?.current?.click();
        }
    };

    return (
        <Box display="flex" component="form" noValidate>
            <Box>
                <Input onChange={() => null} value={value?.name || value?.fileName} readOnly label="File name" required />
            </Box>
            <Button
                sx={{
                    backgroundColor: "#d8e0e6",
                    color: "#101010",
                    width: "150px",
                    height: "38px",
                    fontSize: "12px",
                    textTransform: "none", // Adjust the margin as needed
                    marginTop: "8px",
                    fontWeight: 700 // Adjust the margin as needed
                }}
                onClick={handleBrowseFileClick}
            >
                Browse File
            </Button>
            <input
                type="file"
                accept=".jpg, .png, .pdf" // Customize the accepted file types
                style={{ display: "none" }}
                onChange={handleFileChange}
                ref={fileInputRef}
                required
            />
        </Box>
    );
};

export default FileInputWithButton;
