import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: 'connections',
    initialState: null,
    reducers: {
        addConnections: (state, action) => {
            return action.payload;
        },
        removeConnections: (state, action) => {
            const newFeed = state.filter((feed) => feed._id !== action.payload)
            return newFeed;
        }
    }
});

export const { addConnections, removeConnections } = connectionSlice.actions;

export default connectionSlice.reducer;