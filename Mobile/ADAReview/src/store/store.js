import { configureStore } from '@reduxjs/toolkit';
import bookSlice from './bookSlice';
import reviewsSlice from './reviewSlice';
import usersSlice from './userSlice';
import authSlice from './authSlice';
import commentSlice from './commentSlice';

export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        books: bookSlice.reducer,
        reviews: reviewsSlice.reducer,
        users : usersSlice.reducer,
        comments : commentSlice.reducer
    }
})