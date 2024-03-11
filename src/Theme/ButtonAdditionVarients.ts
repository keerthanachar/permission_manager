import { Interpolation } from "@emotion/react";
import { Theme } from "@mui/material";

import { buttonColors } from "./CustomTheme";

export const filledButtonVerientStyles = (mode: "light" | "dark", color?: buttonColors): Interpolation<{ theme: Theme }> => ({
    backgroundColor: color?.main?.bgcolor,
    color: color?.main?.color,
    borderRadius: 0,
    ":hover": {
        backgroundColor: color?.hover?.bgcolor,
        color: color?.hover?.color
    },
    ":focus": {
        backgroundColor: color?.focus?.bgcolor,
        color: color?.focus?.color
    },
    ":active": {
        backgroundColor: color?.active?.bgcolor,
        color: color?.active?.color
    },
    ":disabled": {
        backgroundColor: color?.disabled?.bgcolor,
        color: color?.disabled?.color
    }
});
export const elevatedButtonVerientStyles = (mode: "light" | "dark", color?: buttonColors): Interpolation<{ theme: Theme }> => ({
    backgroundColor: color?.main?.bgcolor,
    color: color?.main?.color,
    borderRadius: 40,
    width: 200,
    // boxShadow: "0px 1px 2px rgba(153, 153, 153, 0.15), 0px 1px 3px 1px rgba(0, 0, 0, 0.3)",
    ":hover": {
        boxShadow: "0px 1px 2px rgba(153, 153, 153, 0.15), 0px 1px 3px 1px rgba(0, 0, 0, 0.3)",
        backgroundColor: color?.hover?.bgcolor,
        color: color?.hover?.color
    },
    ":focus": {
        boxShadow: "none",
        backgroundColor: color?.focus?.bgcolor,
        color: color?.focus?.color
    },
    ":active": {
        boxShadow: "none",
        backgroundColor: color?.active?.bgcolor,
        color: color?.active?.color
    },
    ":disabled": {
        boxShadow: "none",
        backgroundColor: color?.disabled?.bgcolor,
        color: color?.disabled?.color
    }
});
export const tonalButtonVerientStyles = (mode: "light" | "dark", color?: buttonColors): Interpolation<{ theme: Theme }> => ({
    backgroundColor: color?.main?.bgcolor,
    color: color?.main?.color,
    ":hover": {
        backgroundColor: color?.hover?.bgcolor,
        color: color?.hover?.color
    },
    ":focus": {
        backgroundColor: color?.focus?.bgcolor,
        color: color?.focus?.color
    },
    ":active": {
        backgroundColor: color?.active?.bgcolor,
        color: color?.active?.color
    },
    ":disabled": {
        backgroundColor: color?.disabled?.bgcolor,
        color: color?.disabled?.color
    }
});
