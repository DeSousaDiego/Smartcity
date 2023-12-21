import { createSlice } from '@reduxjs/toolkit';

// Create the reviews slice
const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviews: [],
        status: null,
        error: null,
        nbUpdate: 0
    },
    reducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        setReviews: (state, action) => {
            state.reviews = action.payload;
            state.nbUpdate = 0;
        },
        clearReviews: (state) => {
            state.reviews.length = 0;
            state.nbUpdate = 0;
        },
        setReview: (state, action) => {
            state.reviews.push(action.payload);
            state.status = 'adding ' + (state.reviews.length + 1);
        },
        updateReview: (state, action) => {
            state.status = 'updating ' + action.payload + ' ' + state.nbUpdate;
            state.nbUpdate++;
        },
        deleteReview: (state, action) => {
            state.reviews = state.reviews.filter((review) => review[0].content !== action.payload);
            state.status = 'deleting ' + action.payload;
        },
    },
});

export const { setReviews, clearReviews, setReview, updateReview, deleteReview } = reviewsSlice.actions;

// Export reducer
export default reviewsSlice.reducer;