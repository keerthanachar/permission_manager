import React from "react";
import { format } from "date-fns";

import CloseIcon from "@mui/icons-material/Close";
import EventIcon from "@mui/icons-material/Event";
import { Tooltip } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { getDate } from "./logics";
import { InputDatePickerInterface } from "./types";

const DatePicker: React.FC<InputDatePickerInterface> = ({
    value,
    onChange,
    error,
    helperText,
    defaultValue,
    onBlur,
    errorText,
    setFieldTouched,
    minDate,
    maxDate,
    item
}: any) => {
    const { id, name, Label, required, toolTip, disabled, placeHolder } = item;
    const [open, setOpen] = React.useState(false);
    return (
        <Tooltip title={toolTip || ""} placement="top-start">
            <Box width="100%" display="flex" justifyContent="flex-start" gap={2} paddingY={1} alignItems="center" position="relative">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        label={Label}
                        value={getDate(value) ?? null}
                        closeOnSelect
                        onClose={() => {
                            setFieldTouched(name, true, false);
                            setOpen(false);
                        }}
                        minDate={minDate}
                        maxDate={maxDate}
                        InputProps={{ autoFocus: false }}
                        PopperProps={{
                            placement: "bottom-end"
                        }}
                        onChange={(newValue: any, manualInput: any) => {
                            try {
                                if (!newValue && !manualInput) {
                                    onChange(null);
                                } else if (manualInput !== undefined) {
                                    onChange(manualInput);
                                } else if (newValue) {
                                    const formatDate = format(new Date(newValue), "mm/dd/yyyy");
                                    onChange(formatDate);
                                }
                            } catch (e) {
                                onChange("");
                            }
                        }}
                        renderInput={(params: any) => {
                            const props: any = {
                                ...params,
                                id,
                                name,
                                defaultValue,
                                type: "text",
                                disabled,
                                placeholder: placeHolder,
                                required,
                                label: item.Required ? `${Label} *` : Label,
                                style: { color: "white" },
                                error,
                                helperText: error ? errorText : helperText,
                                onBlur: (e: any) => {
                                    onBlur(e);
                                }
                            };
                            return (
                                <TextField
                                    {...props}
                                    InputProps={{
                                        endAdornment: value ? (
                                            <>
                                                {/* <IconButton
                                                    size="small"
                                                    onClick={() => {
                                                        onChange(null);
                                                        setOpen(false);
                                                    }}
                                                > */}
                                                <CloseIcon
                                                    fontSize="small"
                                                    onClick={() => {
                                                        onChange(null);
                                                        setOpen(false);
                                                    }}
                                                />
                                                {/* </IconButton> */}
                                                {/* <IconButton
                                                    size="small"
                                                    onClick={() => {
                                                        setOpen(true);
                                                    }}
                                                > */}
                                                <EventIcon fontSize="small" />
                                                {/* </IconButton> */}
                                            </>
                                        ) : (
                                            // <IconButton
                                            //     size="small"
                                            //     onClick={() => {
                                            //         setOpen(true);
                                            //     }}
                                            // >
                                            <EventIcon fontSize="small" />
                                            // </IconButton>
                                        )
                                    }}
                                />
                            );
                        }}
                    />
                </LocalizationProvider>
            </Box>
        </Tooltip>
    );
};

export default DatePicker;
