import React from "react";

import { Autocomplete, Chip, TextField, Tooltip } from "@mui/material";
import { Box } from "@mui/system";

import { RegExValidation } from "../../../reusableFunctions/ReusableFunctions";

import { MultipleInputProps } from "./types";

const MultipleInput: React.FC<MultipleInputProps> = ({
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
    disabled,
    onBlur,
    errorText,
    regEx = null,
    item,
    preventBackSpace,
    rows
}) => {
    const [inputValue, setInputValue] = React.useState<string>("");
    const addTag = (tag: string) => {
        if (tag) {
            if (!value?.includes(tag.toLowerCase())) onChange([...(value ?? []), tag.trim().toLowerCase()]);
            setInputValue("");
        }
    };
    const handleTags = (index: number | null) => {
        if (index !== null) {
            if (preventBackSpace && value && value?.length <= preventBackSpace) {
                setTimeout(() => {
                    setInputValue(value[index]);
                }, 1);
            }
            onChange(value?.filter((e: any, i: number) => index !== i) ?? []);
        }
    };
    return (
        <Box
            width="100%"
            display="flex"
            justifyContent="space-around"
            gap={2}
            paddingY={1}
            alignItems="center"
            position="relative"
            key={name + label + id}
        >
            <Tooltip title={!value?.length ? toolTip ?? "" : ""} placement="top-start">
                <Autocomplete
                    value={value ?? []}
                    multiple
                    id={id}
                    inputValue={inputValue}
                    freeSolo
                    onBlur={(e) => {
                        addTag(inputValue.trim());
                        onBlur(e);
                    }}
                    clearIcon={false}
                    onKeyDown={(e) => {
                        if ((e.key === " " || e.key === "," || e.key === "Enter") && inputValue.trim()) {
                            addTag(inputValue.trim());
                        }
                        if (e.key === "Backspace" && !inputValue) {
                            handleTags(value ? (value?.length ?? 0) - 1 : null);
                        }
                        if (e.key === "Enter") e.preventDefault();
                    }}
                    onInput={(e: any) => {
                        setInputValue(e.target.value.replace(",", "").replace(" ", ""));
                    }}
                    renderTags={(tagValue) => (
                        <Box overflow="clip" width="100%">
                            {tagValue.map((option, index) => (
                                <Tooltip title={RegExValidation(item, option) ?? "Click to edit"}>
                                    <Box margin={0.5}>
                                        <Chip
                                            onClick={() => {
                                                handleTags(index);
                                                setInputValue(option);
                                            }}
                                            size="small"
                                            label={option}
                                            onDelete={() => handleTags(index)}
                                            variant="outlined"
                                            color={regEx?.length ? (RegExValidation(item, option) ? "error" : "success") : "default"}
                                        />
                                    </Box>
                                </Tooltip>
                            ))}
                        </Box>
                    )}
                    options={[]}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            type="text"
                            placeholder={placeHolder}
                            name={name}
                            onBlur={(e) => {
                                addTag(inputValue.trim());
                                onBlur?.(e);
                            }}
                            disabled={disabled}
                            label={label}
                            error={error}
                            helperText={!error ? helperText : errorText}
                            required={required ?? false}
                            rows={rows}
                        />
                    )}
                />
            </Tooltip>
        </Box>
    );
};

export default MultipleInput;
