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
        dispatch(listsSlice.actions.setTemplates(data));
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
        dispatch(listsSlice.actions.setPublished(data));
        return data
    }
};

export const thunkGetSelfPublished = () => async (dispatch: any) => {
    const token: string = localStorage.getItem('token') || ''
    const response = await fetch("http://localhost:8000/api/published/user/", {
        headers: { "Authorization": `Token ${token}` }
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(listsSlice.actions.setPublishedSelf(data));
        return data
    }


}


export const listsSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {
        setTemplates: (state, action: PayloadAction) => {
            state.templates = {}
            const lists: any = action.payload
            for (let list of lists) {
                let cardsTemp: { [key: number]: object } = {}
                for (let card of list.cards) {
                    // const cardArr = JSON.parse(card)
                    cardsTemp[Number(card.id)] = card
                }
                list.cards = cardsTemp
                state.templates[Number(list.id)] = list

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
                state.published[Number(list.id)] = list

            }
        },
        setPublishedSelf: (state, action: PayloadAction) => {
            state.user = {}
            const lists: any = action.payload
            for (let list of lists) {
                list.s_tier = JSON.parse(list.s_tier)
                list.a_tier = JSON.parse(list.a_tier)
                list.b_tier = JSON.parse(list.b_tier)
                list.c_tier = JSON.parse(list.c_tier)
                list.d_tier = JSON.parse(list.d_tier)
                list.f_tier = JSON.parse(list.f_tier)
                state.user[Number(list.id)] = list

            }
        }
    },
});

export const { setTemplates, setPublished } = listsSlice.actions;
export const allListsReducer = listsSlice.reducer;