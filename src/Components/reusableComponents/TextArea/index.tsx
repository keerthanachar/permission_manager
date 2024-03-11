import React from "react";

import { TextField } from "@mui/material";

import { TextAreaInterface } from "./types";

const TextArea: React.FC<TextAreaInterface> = ({
    label,
    name,
    placeholder,
    variant,
    rows,
    disabled,
    helperText,
    required,
    onChange,
    sx,
    value,
    type = "text",
    error,
    onBlur,
    regexPattern
}) => {
    const handleInputChange = (inputValue: any, event: any) => {
        if (
            inputValue === "" ||
            !regexPattern ||
            new RegExp(regexPattern).test(inputValue) ||
            event.nativeEvent.inputType === "deleteContentBackward"
        ) {
            onChange(inputValue);
        }
    };
    return (
        <TextField
            onBlur={onBlur}
            value={value || ""}
            size="small"
            fullWidth
            multiline
            type={type || "text"}
            label={label}
            name={name}
            placeholder={placeholder}
            variant={variant}
            rows={rows}
            required={required}
            disabled={disabled}
            helperText={helperText}
            error={error}
            onChange={(inputValue) => handleInputChange(inputValue.target.value, inputValue)}
            sx={sx}
        />
    );
};

export default TextArea;
