import { PaperClasses, Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

export const paperOverrideStyleObject = (
    mode: "light" | "dark",
    additionalPaperTheme?: React.CSSProperties
): Partial<OverridesStyleRules<keyof PaperClasses, "MuiPaper", Omit<Theme, "components">>> | undefined => ({
    root: ({ ownerState }) => ({
        ...(ownerState.elevation === 1 && {
            boxShadow: ""
        }),
        borderRadius: 10,
        ...additionalPaperTheme
    })
});
