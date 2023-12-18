import { createSlice } from '@reduxjs/toolkit';



// Create the users slice
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: null,
        error: null,
        nbUpdate: 0
    },
    reducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        setUsers: (state, action) => {
            console.log("action.payload", action.payload);
            state.users = action.payload;
            state.nbUpdate = 0;
        },
        clearUsers: (state) => {
            state.users.length = 0;
            state.nbUpdate = 0;
        },
        setUser: (state, action) => {
            state.users.push(action.payload);
            state.status = 'adding ' + (state.users.length + 1);

        },
        updateUser: (state, action) => {
            // state.users = state.users.map((user) => {
            //     if (user.id === action.payload.id) {
            //         return {
            //             ...user,
            //             ...action.payload
            //         };
            //     } else {
            //         return user;
            //     }
            // });
            console.log("id", action.payload);
            state.status = 'updating ' + action.payload + ' ' + state.nbUpdate;
            state.nbUpdate++;
        },
        deleteUser: (state, action) => {
            console.log("action.payload", action.payload);
            state.users = state.users.filter((user) => user[0].content !== action.payload);
            console.log("state.users", state.users);
            state.status = 'deleting ' + action.payload;
        }
    }
});

export const { setUsers, clearUsers, setUser, updateUser, deleteUser } = usersSlice.actions;

// Export reducer
export default usersSlice.reducer;