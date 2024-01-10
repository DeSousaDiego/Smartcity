import { createSlice } from '@reduxjs/toolkit';

// Create the comments slice
const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        comments:[],
        status: null,
        error: null
    },
    reducers: {
        setComments: (state, action) => {
            state.comments = action.payload;
        },
        addComment: (state, action) => {
            state.comments.push(action.payload);
        },
    },
});

// Export actions
export const { setComments, addComment } = commentSlice.actions;

// Export reducer
export default commentSlice;