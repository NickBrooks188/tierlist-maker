import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// TODO: replace any
const initialState: any = {};

export const thunkGetOnePublished = (listId: number) => async (dispatch: any) => {
    const response = await fetch(`http://localhost:8000/api/published/${listId}/`);
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(listSlice.actions.setPublished(data));
        return data
    }
};

export const thunkCreatePublished = (published: any) => async (dispatch: any) => {
    const token: string = localStorage.getItem('token') || ''
    const response = await fetch(`http://localhost:8000/api/published/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Token ${token}` },
        body: JSON.stringify(published)
    })
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(listSlice.actions.setPublished(data));
        return data
    }
};

export const thunkUpdatePublished = (published: any) => async (dispatch: any) => {
    const token: string = localStorage.getItem('token') || ''
    const response = await fetch(`http://localhost:8000/api/published/${published.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Token ${token}` },
        body: JSON.stringify(published)
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(listSlice.actions.setPublished(data));
        return data
    }
};


export const listSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
        setTemplate: (state, action: PayloadAction) => {
            state.templates = {}
            const list: any = action.payload

            let cardsTemp: { [key: number]: object } = {}
            for (let card of list.cards) {
                const cardArr = JSON.parse(card)
                cardsTemp[Number(cardArr[0])] = cardArr
            }
            list.cards = cardsTemp
            state.templates = list

        },
        setPublished: (state, action: PayloadAction) => {
            state.published = {}
            const list: any = action.payload
            list.s_tier = JSON.parse(list.s_tier)
            list.a_tier = JSON.parse(list.a_tier)
            list.b_tier = JSON.parse(list.b_tier)
            list.c_tier = JSON.parse(list.c_tier)
            list.d_tier = JSON.parse(list.d_tier)
            list.f_tier = JSON.parse(list.f_tier)
            state.published = list

        }
    },
});

export const { setTemplate, setPublished } = listSlice.actions;
export const oneListReducer = listSlice.reducer;