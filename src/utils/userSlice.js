import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        },
        removeUser: (state, action) => {
            return null;
        },
        updateUser: (state, action) => {
            if (!state) return state; // if no user logged in, ignore update
            return { ...state, ...action.payload };
        },
    }
})

export const { addUser, removeUser, updateUser } = userSlice.actions;

export default userSlice.reducer;