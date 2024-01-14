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
        modifyComment: (state, action) => {
            const index = state.comments.findIndex((comment) => comment.id === action.payload.id);
            state.comments[index] = action.payload;
        },
        deleteComment: (state, action) => {
            const index = state.comments.findIndex((comment) => comment.id === action.payload.id);
            state.comments.splice(index, 1);
        },
    },
});

// Export actions
export const { setComments, addComment, modifyComment, deleteComment } = commentSlice.actions;

// Export reducer
export default commentSlice;