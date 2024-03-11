import React, { FC } from "react";

import { Autocomplete, Box, Chip, TextField, Tooltip } from "@mui/material";

import { SelectMultipleComponentProps } from "./types";

const SelectMultiple: FC<SelectMultipleComponentProps> = ({
    id,
    value,
    name,
    label,
    onChange,
    required,
    error,
    toolTip,
    helperText,
    defaultValue,
    list,
    errorText
}) => {
    const handleTags = (index: number) => onChange(value?.filter((e: any, i: number) => index !== i) ?? null);
    const renderOption = (props: any, option: any) => (
        <li {...props}>
            <Box
                component="div"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <span>{option.label}</span>
                {value?.includes(option) && <Chip size="small" label="Selected" sx={{ marginLeft: 1, backgroundColor: "#3f51b5", color: "#fff" }} />}
            </Box>
        </li>
    );
    return (
        <Box paddingY={1} width="100%" display="flex" justifyContent="space-around" gap={2} alignItems="center" position="relative">
            <Tooltip title={toolTip ?? ""} placement="top-start">
                <Autocomplete
                    multiple
                    id={id}
                    value={value ?? []}
                    defaultValue={defaultValue}
                    options={list ?? []}
                    onChange={(event, newValue: any) => onChange(newValue)}
                    filterSelectedOptions
                    getOptionDisabled={(option) => typeof option === "object" && option?.additional?.disabled}
                    renderOption={renderOption}
                    renderTags={(selected: any) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((item: any, index: any) => (
                                <Chip key={item.label} label={item.label} onDelete={() => handleTags(index)} />
                            ))}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            helperText={error ? errorText : helperText}
                            defaultValue={defaultValue}
                            required={required ?? false}
                            value={value ?? ""}
                            name={name}
                            error={error}
                            label={label}
                        />
                    )}
                />
            </Tooltip>
        </Box>
    );
};

export default SelectMultiple;
