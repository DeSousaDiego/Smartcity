import { createSlice } from '@reduxjs/toolkit';

  
// Create the books slice
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users:[],
        status: null,
        error: null
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    },
});

// Export actions
export const { setUsers } = usersSlice.actions;

// Export reducer
export default usersSlice;