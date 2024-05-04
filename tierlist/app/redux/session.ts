import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Credentials { [key: string]: string; }

let test: { [key: string]: string } = {
    email: 'test',
    password: 'test'
}

// TODO: replace any
const initialState: any = {};

export const thunkAuthenticate = () => async (dispatch: any) => {
    const response = await fetch("http://localhost:8000/api/authenticate/");
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(sessionSlice.actions.setUser(data));
        return data
    }
};

export const thunkLogin = (credentials: object) => async (dispatch: any) => {
    const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(sessionSlice.actions.setUser(data));
        return data;
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};

export const thunkSignup = (user: object) => async (dispatch: any) => {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(sessionSlice.actions.setUser(data));
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSessionState: (state, action: PayloadAction) => {
            state.sessionState = action.payload;
        },
        setUser: (state, action: PayloadAction) => {
            state.user = action.payload
        }
    },
});

export const { setSessionState, setUser } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;