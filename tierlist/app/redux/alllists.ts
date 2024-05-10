import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// TODO: replace any
const initialState: any = {};

export const thunkGetAllTemplates = () => async (dispatch: any) => {
    const response = await fetch("http://localhost:8000/api/templates/");
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(sessionSlice.actions.setTemplates(data));
        return data
    }
};

export const thunkGetAllPublished = () => async (dispatch: any) => {
    const response = await fetch("http://localhost:8000/api/published/");
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(sessionSlice.actions.setPublished(data));
        return data
    }
};


export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setTemplates: (state, action: PayloadAction) => {
            state.templates = {}
            const lists: any = action.payload
            for (let list of lists) {
                let cardsTemp: { [key: number]: object } = {}
                for (let card of list.cards) {
                    const cardArr = JSON.parse(card)
                    cardsTemp[cardArr[0]] = cardArr
                }
                list.cards = cardsTemp
                state.templates[list.id] = list

            }
        },
        setPublished: (state, action: PayloadAction) => {
            state.published = {}
            const lists: any = action.payload
            for (let list of lists) {
                list.s_tier = JSON.parse(list.s_tier)
                list.a_tier = JSON.parse(list.a_tier)
                list.b_tier = JSON.parse(list.b_tier)
                list.c_tier = JSON.parse(list.c_tier)
                list.d_tier = JSON.parse(list.d_tier)
                list.f_tier = JSON.parse(list.f_tier)
                state.published[list.id] = list

            }
        }
    },
});

export const { setTemplates, setPublished } = sessionSlice.actions;
export const allListsReducer = sessionSlice.reducer;