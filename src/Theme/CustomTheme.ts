import { CSSInterpolation } from "@mui/material";

declare module "@mui/material/Button" {
    interface ButtonPropsVariantOverrides {
        filled: true;
        elevated: true;
        tonal: true;
        contained: false;
        text: true;
        muiText: true;
    }
}

export interface colorPair {
    bgcolor?: string;
    color?: string;
}
export interface palletColors {
    main: string;
    light?: string;
    dark?: string;
    contrastText?: string;
}
export interface themingColors {
    light?: palletColors;
    dark?: palletColors;
}
export interface themeModes {
    background?: {
        default?: string;
        paper?: string;
    };
    text?: {
        primary?: string;
        secondary?: string;
        disabled?: string;
    };
    divider?: string;
}
export interface colorThemeModes {
    dark?: themeModes;
    light?: themeModes;
}
export interface themeColorPair {
    light?: colorPair;
    dark?: colorPair;
}
export interface cssInterpolation {
    light?: CSSInterpolation;
    dark?: CSSInterpolation;
}
export interface buttonColors {
    main?: colorPair;
    hover?: colorPair;
    focus?: colorPair;
    active?: colorPair;
    disabled?: colorPair;
}
export interface buttonColorsFair {
    dark?: buttonTheme;
    light?: buttonTheme;
}
export interface buttonTheme {
    filled?: buttonColors;
    elavated?: buttonColors;
    outlined?: buttonColors;
    tonal?: buttonColors;
    text?: buttonColors;
    defaultOptions?: React.CSSProperties | Object;
}
export interface cssProperies {
    dark?: React.CSSProperties | any;
    light?: React.CSSProperties | any;
}
export interface alertProps {
    success?: React.CSSProperties | Object;
    warning?: React.CSSProperties | Object;
    info?: React.CSSProperties | Object;
    error?: React.CSSProperties | Object;
}
export interface dropDownListCss {
    selected?: React.CSSProperties | Object;
    notSelected?: React.CSSProperties | Object;
    disabled?: React.CSSProperties | Object;
}
export interface dropDownListTheme {
    dark?: dropDownListCss;
    light?: dropDownListCss;
}
export interface alertTheme {
    dark?: alertProps;
    light?: alertProps;
}
export interface themeObject {
    mode: "light" | "dark";
    backGroundTheming?: colorThemeModes;
    buttonTheme?: buttonColorsFair;
    paperTheme?: cssProperies;
    locationHeader?: themeColorPair;
    testBoxDisabled?: themeColorPair;
    testBoxNotSelected?: themeColorPair;
    testBoxSelected?: themeColorPair;
    primaryColor?: themingColors;
    secondaryColor?: themingColors;
    successColor?: themingColors;
    infoColor?: themingColors;
    errorColor?: themingColors;
    warningColor?: themingColors;
    textFields?: cssProperies;
    chip?: cssInterpolation;
    checkBoxAndRadioBox?: cssInterpolation;
    switchComponent?: cssInterpolation;
    typography?: cssProperies;
    alert?: alertTheme;
    dropDownList?: dropDownListTheme;
}
