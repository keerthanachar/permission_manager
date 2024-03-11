import React from "react";

import { FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { RadioButtonProps } from "./types";

const RadioButtons: React.FC<RadioButtonProps> = ({ id, list, name, error, value, defaultValue, onChange, errorText, label, toolTip, onBlur }) => {
    return (
        <Box width="100%" display="flex" paddingY={0.5} justifyContent="start" gap={2} alignItems="start" position="relative">
            <Tooltip title={toolTip ?? ""} placement="top-start">
                <FormControl>
                    <Typography variant="body1" color="textPrimary" component="label" htmlFor={id}>
                        {label}
                    </Typography>
                    <RadioGroup
                        onBlur={onBlur}
                        id={id}
                        name={name}
                        value={value}
                        defaultValue={defaultValue}
                        onChange={(event: any) => onChange(event.target.value)}
                    >
                        {list?.map(
                            (
                                item: {
                                    label: string;
                                    value: string;
                                    disabled?: boolean;
                                    toolTipText?: string;
                                },
                                index: number
                            ) => (
                                <Tooltip key={item.label + item.value} title={item.toolTipText ?? ""}>
                                    <FormControlLabel
                                        key={item.label + item.value}
                                        disabled={item.disabled}
                                        sx={{
                                            mt: index === 0 ? 0 : 0.5,
                                            ml: 0,
                                            color: error ? "error" : "secondary"
                                        }}
                                        value={item.value}
                                        control={<Radio />}
                                        label={item.label}
                                    />
                                </Tooltip>
                            )
                        )}
                    </RadioGroup>
                    <FormHelperText error={error}>{errorText}</FormHelperText>
                    {/* {error && (
                        <Typography variant="body1" color="red">
                            {errorText}
                        </Typography>
                    )} */}
                </FormControl>
            </Tooltip>
        </Box>
    );
};

export default RadioButtons;
