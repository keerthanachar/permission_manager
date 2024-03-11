import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { initialState } from "./Redux/store";
import ThemeProviders from "./Theme/ThemeProvider";

import "./index.css";

const container: any = document.getElementById("root");
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <Provider store={initialState}>
            <ThemeProviders />
        </Provider>
    </BrowserRouter>
);
