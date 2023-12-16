import { createSlice } from '@reduxjs/toolkit';

// Create the actors slice
const actorsSlice = createSlice({
    name: 'actors',
    initialState: {
        actors: [],
        status: null,
        error: null
    },
    reducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        setActors: (state, action) => {
            state.actors = action.payload;
            state.nbUpdate = 0;
        },
        clearActors: (state) => {
            state.actors.length = 0;
            state.nbUpdate = 0;
        },
        setActor: (state, action) => {
            state.actors.push(action.payload);
            state.status = 'adding ', (state.actors.length + 1);
        },
        updateActor: (state, action) => {
            state.status = 'updating ' + action.payload + ' ' + state.nbUpdate;
            state.nbUpdate++;
        },
        deleteActor: (state, action) => {
            state.actors = state.actors.filter((actor) => actor[0].content !== action.payload);
            state.status = 'deleting ', action.payload;
        },
    },
});

export const { setActors, clearActors, setActor, updateActor, deleteActor } = actorsSlice.actions;

// Export reducer
export default actorsSlice.reducer;