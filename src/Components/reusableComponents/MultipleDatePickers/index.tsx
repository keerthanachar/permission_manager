import React from "react";
import { format } from "date-fns";

import { Autocomplete, Chip, TextField, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

import { config } from "../../../config";
import { DateValidation } from "../../../reusableFunctions/ReusableFunctions";

import { MultiplDatePickerProps } from "./types";

let resetTime: any = "";
const MultipleDatePicker: React.FC<MultiplDatePickerProps> = ({
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
    errorText,
    item,
    minDate,
    maxDate,
    setFieldTouched
}: any) => {
    const [inputValue, setInputValue] = React.useState<string>("");
    const [dateVal, setDateVal] = React.useState<any>("");
    const addTag = (tag: string) => {
        if (tag) {
            if (!value?.includes(tag.toLowerCase())) onChange([...(value || []), tag.trim().toLowerCase()]);
            else onChange(value?.filter((e: string) => tag !== e) || []);
            setInputValue("");
            setDateVal("");
        }
    };
    const [open, setOpen] = React.useState<boolean>(false);
    const handleOpen = () => {
        setOpen(true);
        // setFieldTouched(name, true,false)
    };
    const handleClose = () => {
        setOpen(false);
        setFieldTouched(name, true, true);
    };
    const handleTags = (index: number) => onChange(value.filter((e: any, i: number) => index !== i));
    return (
        <Box width="100%" display="flex" justifyContent="space-around" gap={2} paddingY={1} alignItems="center" position="relative">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Tooltip title={error && !value?.length ? toolTip : ""} placement="top-start">
                    <Autocomplete
                        readOnly
                        value={value || []}
                        multiple
                        id={id}
                        inputValue={inputValue}
                        freeSolo
                        onBlur={() => {
                            addTag(inputValue.trim());
                        }}
                        clearIcon={false}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") e.preventDefault();
                        }}
                        onInput={(e: any) => {
                            setInputValue(e.target.value.replace(",", "").replace(" ", ""));
                        }}
                        renderTags={(tagValue) => (
                            <Box overflow="clip" width="100%">
                                {tagValue?.map((option: any, index: number) => (
                                    <Tooltip title={DateValidation(item, option)} placement="bottom-end" key={option}>
                                        <Box margin={0.5}>
                                            <Chip
                                                size="small"
                                                label={option}
                                                onDelete={() => handleTags(index)}
                                                variant="outlined"
                                                color={DateValidation(item, option) ? "error" : "success"}
                                            />
                                        </Box>
                                    </Tooltip>
                                ))}
                            </Box>
                        )}
                        size="small"
                        options={[]}
                        renderInput={(params) => (
                            <DatePicker
                                {...params}
                                minDate={minDate}
                                maxDate={maxDate}
                                toolbarPlaceholder="Pick Date"
                                open={Boolean(open)}
                                closeOnSelect={false}
                                onClose={handleClose}
                                PopperProps={{
                                    placement: "bottom-start",
                                    onMouseLeave: () => {
                                        resetTime = setTimeout(() => {
                                            handleClose();
                                        }, 500);
                                    },
                                    onMouseEnter: () => {
                                        if (resetTime) {
                                            clearInterval(resetTime);
                                        }
                                    }
                                }}
                                InputAdornmentProps={{
                                    onClick: () => handleOpen
                                }}
                                value={dateVal}
                                onChange={(inputValueOnChange) => {
                                    addTag(format(inputValueOnChange, config.dateFormat));
                                }}
                                renderDay={(day: any, selectedDay, pickerDayProps) => {
                                    const newDay = format(day, config.dateFormat);
                                    return <PickersDay {...pickerDayProps} selected={value?.includes(newDay)} />;
                                }}
                                renderInput={(props) => (
                                    <TextField
                                        {...props}
                                        onClick={handleOpen}
                                        type="text"
                                        focused={open}
                                        placeholder={placeHolder}
                                        name={name}
                                        onBlur={() => {
                                            addTag(inputValue.trim());
                                        }}
                                        disabled={disabled}
                                        label={label}
                                        error={error}
                                        helperText={!error ? helperText : errorText}
                                        required={required}
                                    />
                                )}
                            />
                        )}
                    />
                </Tooltip>
            </LocalizationProvider>
        </Box>
    );
};

export default MultipleDatePicker;
