import { configureStore } from '@reduxjs/toolkit';
import bookSlice from './bookSlice';
import reviewsSlice from './reviewSlice';
import usersSlice from './userSlice';

export const store = configureStore({
    reducer:{
        books: bookSlice.reducer,
        reviews: reviewsSlice.reducer,
        users : usersSlice.reducer
    }
})