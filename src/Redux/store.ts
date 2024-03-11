import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import mainState from "./Reducer";

export const initialState = configureStore({
    reducer: mainState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export type AppDispatch = typeof initialState.dispatch;
export type RootState = ReturnType<typeof initialState.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
