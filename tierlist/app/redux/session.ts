import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// todo: replace any
const initialState: any = {};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSessionState: (state, action: PayloadAction) => {
            state.sessionState = action.payload;
        },
        testFunction: () => {
            console.log('8888888888888888888')
        }
    },
});

export const { setSessionState, testFunction } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;