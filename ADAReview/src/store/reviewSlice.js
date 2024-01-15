import { createSlice } from '@reduxjs/toolkit';

  
// Create the books slice
const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviews:[],
        status: null,
        error: null
    },
    reducers: {
        setReviews: (state, action) => {
            state.reviews = action.payload;
        },
        addReview: (state, action) => {
            state.reviews.push(action.payload);
        },
        updateReview: (state, action) => {
            state.reviews = state.reviews.map((review) => review.id === action.payload.id ? action.payload : review);
        },
        deleteReview: (state, action) => {
            const index = state.reviews.findIndex((review) => review.id === action.payload.id);
            state.reviews.splice(index, 1);
        }
    },
});

// Export actions
export const { setReviews, addReview, updateReview, deleteReview } = reviewsSlice.actions;

// Export reducer
export default reviewsSlice;