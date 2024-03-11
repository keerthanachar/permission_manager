import React from "react";

import { Switch, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { useAppSelector } from "../../../Redux/hooks";

import { SwitchInterface } from "./types";

const SwitchComponent: React.FC<SwitchInterface> = ({ id, name, checked, onChange, disabled, error, label, toolTip, errorText, onBlur }) => {
    const { theme } = useAppSelector((state) => state);

    return (
        <>
            <Box paddingY={0.8} width="100%" display="flex" justifyContent="start" gap={2} alignItems="start" position="relative">
                <Tooltip title={toolTip || ""} placement="top-start">
                    <Box display="flex" alignItems="center" gap={2}>
                        <Switch
                            onBlur={onBlur}
                            name={name}
                            id={id}
                            disabled={disabled}
                            checked={checked}
                            onChange={(e) => onChange(e.target.checked)}
                        />
                        <Typography
                            htmlFor={id}
                            variant="body1"
                            component="label"
                            sx={{ cursor: "pointer" }}
                            dangerouslySetInnerHTML={{ __html: label }}
                        />
                    </Box>
                </Tooltip>
            </Box>
            {error && (
                <Typography variant="body1" color={theme?.errorColor?.[theme.mode]?.main}>
                    {errorText}
                </Typography>
            )}
        </>
    );
};

export default SwitchComponent;
