import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// TODO: replace any
const initialState: any = {};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSessionState: (state, action: PayloadAction) => {
            state.sessionState = action.payload;
        },
        testFunction: async () => {
            const res = await fetch(`http://localhost:8000/api/templates/`, {
                method: "GET"
            })
            const data = await res.json()
            console.log(data)
            return data
        }
    },
});

export const { setSessionState, testFunction } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;