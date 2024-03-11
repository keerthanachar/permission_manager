import React, { useEffect, useState } from "react";
import { MdExpandMore } from "react-icons/md";

import { Autocomplete, Button, TextField, Tooltip, Typography } from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { Box } from "@mui/system";

import { SelectOptions } from "../../../Types/InputProps";
import DailogBox from "../Dailog";

import { SelectComponentProps } from "./types";

const filter = createFilterOptions<SelectOptions | string>();
const CustomExpandMoreIcon: React.FC = () => {
    return <MdExpandMore />;
};

const Select: React.FC<SelectComponentProps> = ({
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
    list,
    onBlur,
    allowAddList,
    addListToDatabse,
    onInputChange,
    noOptionsText,
    readOnly,
    placeHolderfontWeight,
    fieldDisabled
}) => {
    const [allOptions, setOptions] = useState<any>(list || []);
    const [confirm, setConfirm] = React.useState(false);
    const [newOption, setNewOption] = React.useState<any>(null);
    const onClose = () => {
        setConfirm(false);
        setNewOption(null);
    };
    const onOpen = () => setConfirm(true);
    const addToList = (addListToDB: boolean, newInputValue?: string, typeOption?: string) => {
        let newValue: any = newInputValue ?? newOption?.value ?? "";
        const type = typeOption ?? newOption?.type ?? "";
        if (type === "string") {
            setOptions((currentList: any) => {
                if (currentList?.length) {
                    return [...currentList, newValue];
                }
                return [newValue];
            });
        } else {
            newValue = {
                value: "Other",
                label: newValue ?? ""
            };
            setOptions((currentList: any) => {
                if (currentList?.length) {
                    return [...currentList, newValue];
                }
                return [newValue];
            });
        }
        onChange(newValue);
        if (addListToDB) {
            // call the API to add the list
        }
        onClose();
    };
    useEffect(() => {
        if (list?.[0] && typeof list?.[0] === "object" && typeof value === "string") {
            const totalList: any[] = list ?? [];
            const newAutoSelectedValue: any = totalList?.filter((e: SelectOptions) => e?.value === value);
            onChange(newAutoSelectedValue?.[0] ?? value);
        }
    }, [allOptions]);

    function isEqual(arr1: any, arr2: any) {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    }
    useEffect(() => {
        if (!isEqual(list, allOptions)) {
            setOptions(list);
        }
    }, [list, allOptions]);
    return (
        <>
            <Box paddingY={1} width="100%" display="flex" justifyContent="space-around" gap={2} alignItems="center" position="relative">
                <Tooltip title={toolTip ?? ""} placement="top-start">
                    <Autocomplete
                        sx={{ cursor: fieldDisabled ? "not-allowed" : "pointer" }}
                        noOptionsText={noOptionsText}
                        onBlur={(e) => onBlur?.(e)}
                        disablePortal={disabled}
                        // placeholder={placeHolder}
                        disabled={fieldDisabled}
                        popupIcon={<CustomExpandMoreIcon />}
                        id={id}
                        filterOptions={(options, params: any) => {
                            const filtered = Array.isArray(options) ? filter(options, params) : [];
                            const { inputValue } = params;
                            const isExisting = options.some(
                                (option: SelectOptions | any) =>
                                    inputValue?.trim()?.toLowerCase() ===
                                    (typeof option === "string" ? option?.trim()?.toLowerCase() : option?.label?.trim().toLowerCase())
                            );
                            if (allowAddList && inputValue?.trim().toLowerCase() !== "" && !isExisting) {
                                if (typeof options?.[0] === "string") {
                                    filtered.push(`Add ${inputValue}`);
                                } else {
                                    filtered.push({
                                        value: "Other",
                                        label: `Add ${inputValue}`
                                    });
                                }
                            }
                            return filtered;
                        }}
                        readOnly={readOnly}
                        getOptionDisabled={(option) => typeof option === "object" && option?.additional?.disabled}
                        options={allOptions ?? []}
                        renderOption={(props, option, { index }) => (
                            <Box {...props} key={typeof option === "object" ? (option?.label ?? "") + index : option + index} component="li">
                                {typeof option === "object" ? option?.label : option}
                            </Box>
                        )}
                        onChange={(event, newValue: any) => {
                            if (allowAddList && typeof newValue === "string" && newValue?.includes("Add ")) {
                                if (addListToDatabse) {
                                    onOpen();
                                } else {
                                    addToList(false, newValue.split("Add ")?.[1] ?? "", "string");
                                }
                            } else if (allowAddList && typeof newValue === "object" && newValue?.label?.includes("Add ")) {
                                setNewOption({
                                    value: newValue?.label?.split("Add ")?.[1] ?? "",
                                    type: "object"
                                });
                                if (addListToDatabse) {
                                    onOpen();
                                } else {
                                    addToList(false, newValue?.label?.split("Add ")?.[1] ?? "", "object");
                                }
                            } else {
                                onChange(newValue);
                            }
                        }}
                        defaultValue={defaultValue}
                        value={value ?? null}
                        fullWidth
                        renderInput={(params) => (
                            <TextField
                                sx={{
                                    cursor: fieldDisabled ? "not-allowed" : "pointer",
                                    "& .MuiIconButton-root": {
                                        boxShadow: "0px 0px 0px white"
                                    },
                                    "& .MuiAutocomplete-endAdornment": {
                                        display: "flex",
                                        justifyContent: "space-around"
                                    },
                                    backgroundColor: "#fff",
                                    "& .MuiFormLabel-root": {
                                        fontWeight: placeHolderfontWeight ?? undefined
                                    }
                                }}
                                {...params}
                                helperText={helperText}
                                defaultValue={defaultValue}
                                placeholder={placeHolder}
                                required={required ?? false}
                                value={value ?? ""}
                                name={name}
                                error={error}
                                onChange={(inVal: any) => {
                                    onInputChange?.(inVal);
                                }}
                                size="small"
                                label={label}
                                fullWidth
                            />
                        )}
                    />
                </Tooltip>
            </Box>
            <DailogBox title="Confirm" open={confirm} onClose={onClose}>
                <Typography variant="body1" color="primary">
                    Do you want to save it in the option &quot;{newOption?.value ?? ""}
                    &quot; Permanently?
                </Typography>
                <Box component="div" marginTop={1.5} display="flex" flexDirection="column-reverse" gap={1} justifyContent="flex-end" width="100%">
                    <Button type="button" onClick={() => addToList(false)} size="small">
                        No
                    </Button>
                    <Button onClick={() => addToList(true)} size="small">
                        Yes
                    </Button>
                </Box>
            </DailogBox>
        </>
    );
};

export default Select;
