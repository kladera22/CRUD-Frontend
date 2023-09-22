import { createSlice } from "@reduxjs/toolkit";

export const token = createSlice({
    name: "token",
    initialState: {
        token: null,
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
        clearToken(state) {
            state.token = null;
        },
    },
});

const admin = createSlice({
    name: "admin",
    initialState: {
        admin: false,
    },
    reducers: {
        setAdmin(state, action) {
            state.admin = action.payload;
        },
    },
});

export const { setToken, clearToken } = token.actions;
export const { setAdmin } = admin.actions;
export const tokenReducer = token.reducer;
export const adminReducer = admin.reducer;
