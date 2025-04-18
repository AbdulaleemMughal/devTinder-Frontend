import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addRequests: (state, action) => {
            return action.payload;
        },
        removeRequest: (state, action) => {
            return state.filter((r) => r._id !== action.payload);
        }
    },
});

export const { addRequests, removeRequest } = requestSlice.actions;

export default requestSlice.reducer;
