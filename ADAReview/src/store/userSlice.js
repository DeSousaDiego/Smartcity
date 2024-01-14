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
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        updateUser: (state, action) => {
            state.users = state.users.map((user) => user.id === action.payload.id ? action.payload : user);
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
        }
    },
});

// Export actions
export const { setUsers, addUser, updateUser, deleteUser } = usersSlice.actions;

// Export reducer
export default usersSlice;