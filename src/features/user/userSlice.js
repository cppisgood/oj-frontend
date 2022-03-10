import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: null,
        expire_time: 0,
    },
    reducers: {
        login: (state, action) => {
            state.username = action.payload.username
            state.expire_time = action.payload.expire_time
        },
        logout: (state) => {
            state.username = null
            state.expire_time = 0
        }
    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;