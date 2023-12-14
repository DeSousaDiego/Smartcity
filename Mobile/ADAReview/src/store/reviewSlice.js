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
    },
});

// Export actions
export const { setReviews } = reviewsSlice.actions;

// Export reducer
export default reviewsSlice;