import { createTheme, darkScrollbar } from "@mui/material";

import { alertOverrideStyleObject } from "./AlertNotificationOverrideStyles";
import { elevatedButtonVerientStyles, filledButtonVerientStyles, tonalButtonVerientStyles } from "./ButtonAdditionVarients";
import { buttonStyleOverrideObject } from "./ButtonsStyleOverride";
import { themeObject } from "./CustomTheme";
import { paperOverrideStyleObject } from "./PaperOverrideStyle";

const createThemeObject = (themes: themeObject) => {
    const theme = createTheme({
        palette: {
            mode: themes.mode ?? "light",
            ...{
                primary: themes.primaryColor?.[themes.mode],
                secondary: themes.secondaryColor?.[themes.mode],
                error: themes.errorColor?.[themes.mode],
                warning: themes.warningColor?.[themes.mode],
                info: themes.infoColor?.[themes.mode],
                success: themes.successColor?.[themes.mode],
                divider: themes.backGroundTheming?.[themes.mode]?.divider,
                background: themes.backGroundTheming?.[themes.mode]?.background,
                text: themes.backGroundTheming?.[themes.mode]?.text
            }
        },
        typography: {
            allVariants: {
                fontFamily: "Poppins, sans-serif",
                color: themes.mode === "dark" ? "white" : "#393939",
                fontWeight: 400,
                ...themes?.typography?.[themes.mode]
            }
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: () => ({
                    body: darkScrollbar(
                        theme.palette.mode === "dark"
                            ? {
                                  active: "#858282",
                                  thumb: "#404040",
                                  track: "#121212"
                              }
                            : {
                                  active: "#a19e9e",
                                  thumb: "#b0aeae",
                                  track: "#fff"
                              }
                    )
                })
            },
            MuiChip: {
                styleOverrides: {
                    root: themes.chip?.[themes.mode]
                }
            },
            MuiInputBase: {
                styleOverrides: {
                    root: ({ ownerState }) => ({
                        ...((ownerState.disabled || ownerState.onLoad) && {
                            cursor: "not-allowed",
                            pointerEvents: "all"
                        }),
                        ...(ownerState.size === "medium" && {
                            minHeight: 50
                        }),
                        ...(ownerState.size === "small" && {
                            minHeight: 40
                        }),

                        ...themes.textFields?.[themes.mode],
                        borderRadius: 6
                    })
                }
            },
            MuiAutocomplete: {
                defaultProps: {
                    fullWidth: true
                }
            },
            MuiTooltip: {
                defaultProps: {
                    arrow: true
                }
            },
            MuiTextField: {
                defaultProps: {
                    variant: "outlined",
                    size: "small",
                    fullWidth: true
                }
            },
            MuiCheckbox: {
                styleOverrides: {
                    root: themes.checkBoxAndRadioBox?.[themes.mode]
                }
            },
            MuiSwitch: {
                styleOverrides: {
                    root: themes.switchComponent?.[themes.mode]
                }
            },
            MuiRadio: {
                styleOverrides: {
                    root: themes.checkBoxAndRadioBox?.[themes.mode]
                }
            },
            MuiButton: {
                variants: [
                    {
                        props: { variant: "filled" },
                        style: filledButtonVerientStyles(themes.mode, themes?.buttonTheme?.[themes.mode]?.filled)
                    },
                    {
                        props: { variant: "elevated" },
                        style: elevatedButtonVerientStyles(themes.mode, themes?.buttonTheme?.[themes.mode]?.elavated)
                    },
                    {
                        props: { variant: "tonal" },
                        style: tonalButtonVerientStyles(themes.mode, themes?.buttonTheme?.[themes.mode]?.tonal)
                    }
                ],
                styleOverrides: buttonStyleOverrideObject(themes.mode, themes?.buttonTheme?.[themes.mode]),
                defaultProps: {
                    variant: "muiText"
                }
            },
            MuiPaper: {
                styleOverrides: paperOverrideStyleObject(themes.mode, themes?.paperTheme?.[themes.mode])
            },
            MuiAlert: {
                styleOverrides: alertOverrideStyleObject(themes.mode, themes?.alert?.[themes.mode])
            }
        }
    });
    return theme;
};

export default createThemeObject;
