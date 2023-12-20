import { createSlice } from '@reduxjs/toolkit';

// Create the comments slice
const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        status: null,
        error: null,
        nbUpdate: 0
    },
    reducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        setComments: (state, action) => {
            state.comments = action.payload;
            state.nbUpdate = 0;
        },
        clearComments: (state) => {
            state.comments.length = 0;
            state.nbUpdate = 0;
        },
        setComment: (state, action) => {
            state.status = 'adding ' + (state.comments.length + 1);
        },
        updateComment: (state, action) => {
            state.status = 'updating ' + action.payload + ' ' + state.nbUpdate;
            state.nbUpdate++;
        },
        deleteComment: (state, action) => {
            state.comments = state.comments.filter((comment) => comment[0].content !== action.payload);
            state.status = 'deleting ' + action.payload;
        },
    },
});

export const { setComments, clearComments, setComment, updateComment, deleteComment } = commentsSlice.actions;

// Export reducer
export default commentsSlice.reducer;