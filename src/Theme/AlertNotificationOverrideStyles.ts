import { Theme } from "@emotion/react";
import { AlertClasses } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

import { alertProps } from "./CustomTheme";

export const alertOverrideStyleObject = (
    mode: "light" | "dark",
    additionalPaperTheme?: alertProps
): Partial<OverridesStyleRules<keyof AlertClasses, "MuiAlert", Omit<Theme, "components">>> | undefined => ({
    root: ({ ownerState }) => ({
        ...(ownerState.severity === "success" && {
            ...additionalPaperTheme?.success
        }),
        ...(ownerState.severity === "error" && {
            ...additionalPaperTheme?.error
        }),
        ...(ownerState.severity === "info" && {
            ...additionalPaperTheme?.info
        }),
        ...(ownerState.severity === "warning" && {
            ...additionalPaperTheme?.warning
        })
    })
});
