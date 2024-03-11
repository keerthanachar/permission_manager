import { AutocompleteClasses, Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

export const textFieldOverrideStyleObject = (
    mode: "light" | "dark",
    additionalPaperTheme?: React.CSSProperties
): Partial<OverridesStyleRules<"root", "MuiTextField", Omit<Theme, "components">>> | undefined => ({
    root: () => ({
        borderRadius: 20,
        ...additionalPaperTheme
    })
});

export const autoCompleteOverrideStyleObject = (
    mode: "light" | "dark",
    additionalPaperTheme?: React.CSSProperties
): Partial<OverridesStyleRules<keyof AutocompleteClasses, "MuiAutocomplete", Omit<Theme, "components">>> | undefined => ({
    root: () => ({
        borderRadius: 10,
        ...additionalPaperTheme
    })
});
