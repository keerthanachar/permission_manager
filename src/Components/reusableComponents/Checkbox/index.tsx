import React from "react";

import { Tooltip, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/system";

import { CheckBoxInterface } from "./types";

const CheckBox: React.FC<CheckBoxInterface> = ({ id, name, checked, onChange, disabled, error, label, toolTip, errorText, onBlur }) => {
    return (
        <Box paddingY={0.8} width="100%" display="flex" justifyContent="start" gap={2} alignItems="start" position="relative">
            <Tooltip title={toolTip ?? ""} placement="top-start">
                <Box display="flex" alignItems="center">
                    <Box>
                        <Checkbox
                            color={error ? "error" : "primary"}
                            onBlur={onBlur}
                            name={name}
                            id={id}
                            disabled={disabled}
                            checked={checked}
                            onChange={(e) => onChange(e.target.checked)}
                        />
                    </Box>
                    <Box>
                        <Typography
                            htmlFor={id}
                            variant="body1"
                            color={error ? "error" : "primary"}
                            component="label"
                            sx={{ cursor: "pointer" }}
                            dangerouslySetInnerHTML={{ __html: label }}
                        />
                    </Box>
                    {error && (
                        <Typography variant="body1" color="red">
                            {errorText}
                        </Typography>
                    )}
                </Box>
            </Tooltip>
        </Box>
    );
};

export default CheckBox;
