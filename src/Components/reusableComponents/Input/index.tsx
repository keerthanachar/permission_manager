import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import { Box, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";

import { InputFieldProps } from "./types";

const Input: React.FC<InputFieldProps> = ({
    id,
    value,
    name,
    label,
    onChange,
    required,
    error,
    toolTip,
    placeHolder,
    helperText,
    defaultValue,
    disabled,
    onBlur,
    sx,
    type = "text",
    readOnly,
    rows,
    regexPattern
}: any) => {
    const [showIcons, setShowIcons] = useState(false);

    const handleInputChange = (inputValue: any, event: any) => {
        if (inputValue === "" || !regexPattern || new RegExp(regexPattern).test(inputValue)) {
            onChange(inputValue);
        } else if (event.nativeEvent.inputType === "deleteContentBackward") {
            onChange(inputValue);
        } else {
            onChange(inputValue);
        }
    };
    return (
        <Box paddingY={1} width="100%" display="flex" justifyContent="space-around" gap={2} alignItems="center" position="relative">
            <Tooltip title={toolTip || ""} placement="top-start">
                <TextField
                    onBlur={onBlur}
                    id={id}
                    fullWidth
                    name={name}
                    InputProps={{
                        endAdornment:
                            type === "password" ? (
                                <InputAdornment position="end">
                                    <Box component="span" sx={{ cursor: "pointer" }}>
                                        <IconButton aria-label="toggle password visibility" onClick={() => setShowIcons((e) => !e)} edge="end">
                                            {showIcons ? <MdVisibilityOff /> : <MdVisibility />}
                                        </IconButton>
                                    </Box>
                                </InputAdornment>
                            ) : (
                                <div />
                            ),
                        readOnly: readOnly || false,
                        style: { borderRadius: "8px" }
                    }}
                    defaultValue={defaultValue}
                    type={showIcons ? "text" : type}
                    onChange={(inputValue) => handleInputChange(inputValue.target.value, inputValue)}
                    disabled={disabled}
                    placeholder={placeHolder}
                    required={required}
                    label={label}
                    size="small"
                    error={error}
                    helperText={helperText}
                    value={value || ""}
                    sx={sx}
                    rows={rows}
                />
            </Tooltip>
        </Box>
    );
};

export default Input;
