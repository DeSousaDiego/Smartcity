import { createSlice } from '@reduxjs/toolkit';

  
// Create the books slice
const booksSlice = createSlice({
    name: 'books',
    initialState: {
        books: [],
        status: null,
        error: null
    },
    reducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        setBooks: (state, action) => {
            state.books = action.payload;
            state.nbUpdate = 0;
        },
        clearBooks: (state) => {
            state.books.length = 0;
            state.nbUpdate = 0;
        },
        setBook: (state, action) => {
            state.status = 'adding ' + (state.books.length + 1);
        },
        updateBook: (state, action) => {
            state.status = 'updating ' + action.payload + ' ' + state.nbUpdate;
            state.nbUpdate++;
        },
        deleteBook: (state, action) => {
            state.books = state.books.filter((book) => book[0].content !== action.payload);
            state.status = 'deleting ' + action.payload;
        },
        setBookStatus: (state, action) => {
            state.status = action.payload;
        },
        setBookError: (state, action) => {
            state.error = action.payload;
        },
    },
});

// Export actions
export const { setBooks, clearBooks, setBook, updateBook, deleteBook, setBookStatus, setBookError } = booksSlice.actions;

// Export reducer
export default booksSlice.reducer;
