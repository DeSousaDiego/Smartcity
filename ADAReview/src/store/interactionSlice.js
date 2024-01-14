import { createSlice } from '@reduxjs/toolkit';

const interactionSlice = createSlice({
    name: 'interactions',
    initialState: {
        interactions:[],
        status: null,
        error: null
    },
    reducers: {
        addInteraction: (state, action) => {
            state.interactions.push(action.payload);
        },
    },
});

export const { addInteraction } = interactionSlice.actions;

// Export reducer
export default interactionSlice;