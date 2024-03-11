import { ButtonClasses, Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

import { buttonTheme } from "./CustomTheme";

export const buttonStyleOverrideObject = (
    mode: "light" | "dark",
    theme?: buttonTheme
): Partial<OverridesStyleRules<keyof ButtonClasses, "MuiButton", Omit<Theme, "components">>> | undefined => ({
    root: ({ ownerState }) => ({
        fontFamily: "Poppins, sans-serif",
        fontWeight: 700,
        fontSize: "14px",
        textTransform: "none",
        fontStyle: "normal",
        letterSpacing: "0.1px",
        ...(ownerState.variant === "outlined" && {
            border: `1px solid ${theme?.outlined?.main?.bgcolor}`,
            color: theme?.outlined?.main?.color,
            ":hover": {
                border: `1px solid ${theme?.outlined?.hover?.bgcolor}`,
                color: theme?.outlined?.main?.color
            },
            ":focus": {
                border: `1px solid ${theme?.outlined?.focus?.bgcolor}`,
                color: theme?.outlined?.main?.color
            },
            ":active": {
                border: `1px solid ${theme?.outlined?.active?.bgcolor}`,
                color: theme?.outlined?.main?.color
            },
            ":disabled": {
                border: `1px solid ${theme?.outlined?.disabled?.bgcolor}`,
                color: theme?.outlined?.disabled?.color
            }
        }),
        ...(ownerState.variant === "text" && {
            backgroundColor: "transparent",
            border: `1px solid ${theme?.text?.main?.bgcolor}`,
            color: theme?.text?.main?.color ?? (mode === "light" ? "black" : "white"),
            ":hover": {
                backgroundColor: "transparent",
                border: `1px solid ${theme?.text?.hover?.bgcolor}`,
                color: theme?.text?.hover?.color ?? (mode === "light" ? "black" : "white")
            },
            ":focus": {
                backgroundColor: "transparent",
                border: `1px solid ${theme?.text?.focus?.bgcolor}`,
                color: theme?.text?.focus?.color ?? (mode === "light" ? "black" : "white")
            },
            ":active": {
                border: "none",
                backgroundColor: theme?.text?.active?.bgcolor,
                color: theme?.text?.active?.color ?? (mode === "light" ? "black" : "white")
            },
            ":disabled": {
                backgroundColor: "transparent",
                border: "none",
                color: theme?.text?.disabled?.color
            }
        }),
        ...((ownerState.disabled || ownerState.onLoad) && {
            cursor: "not-allowed",
            pointerEvents: "all"
        }),
        ...(ownerState.size === "large" && {
            height: 50
        }),
        ...(ownerState.size === "medium" && {
            height: 40
        }),
        ...(ownerState.size === "small" && {
            height: 30
        }),
        ...theme?.defaultOptions
    })
});
