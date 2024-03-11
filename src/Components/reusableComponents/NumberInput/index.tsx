import React from "react";

import { Box, InputAdornment, TextField, Tooltip } from "@mui/material";

import { NumberInputFieldProps } from "./types";

const NumberInput: React.FC<NumberInputFieldProps> = ({
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
    rows,
    sx,
    regexPattern,
    Amount
}: any) => {
    const handleInputChange = (inputValue: any, event: any) => {
        // Check against the regex pattern before updating the state
        if (
            inputValue === "" ||
            !regexPattern ||
            new RegExp(regexPattern).test(inputValue) ||
            event.nativeEvent.inputType === "deleteContentBackward"
        ) {
            onChange(inputValue);
        } else if (regexPattern && inputValue.length <= 5) {
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
                    defaultValue={defaultValue}
                    type="number"
                    onInput={(event: any) => {
                        // Remove leading minus sign (-)
                        event.target.value = event.target.value.replace(/^-/, "");
                    }}
                    onChange={(inputValue) => handleInputChange(inputValue.target.value, inputValue)}
                    disabled={disabled}
                    placeholder={placeHolder}
                    required={required}
                    label={label}
                    size="small"
                    error={error}
                    helperText={helperText}
                    value={value || ""}
                    sx={
                        sx || {
                            "& .MuiInputBase-adornedEnd": {
                                borderRadius: 2,
                                display: "none"
                            }
                        }
                    }
                    rows={rows}
                    InputProps={{
                        startAdornment: Amount ? (
                            <InputAdornment position="start">
                                <InputAdornment position="start">$</InputAdornment>
                            </InputAdornment>
                        ) : null
                    }}
                />
            </Tooltip>
        </Box>
    );
};

export default NumberInput;
