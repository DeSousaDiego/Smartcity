import { createSlice } from '@reduxjs/toolkit';

// Create the roles slice
const rolesSlice = createSlice({
    name: 'roles',
    initialState: {
        roles: [],
        status: null,
        error: null,
        nbUpdate: 0
    },
    reducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        setRoles: (state, action) => {
            state.roles = action.payload;
            state.nbUpdate = 0;
        },
        clearRoles: (state) => {
            state.roles.length = 0;
            state.nbUpdate = 0;
        },
        setRole: (state, action) => {
            state.roles.push(action.payload);
            state.status = 'adding ' + (state.roles.length + 1);
        },
        updateRole: (state, action) => {
            
            state.status = 'updating ' + action.payload + ' ' + state.nbUpdate;
            state.nbUpdate++;
        },
        deleteRole: (state, action) => {
            state.roles = state.roles.filter((role) => role[0].content !== action.payload);
            state.status = 'deleting ' + action.payload;
        },
    },
});

export const { setRoles, clearRoles, setRole, updateRole, deleteRole } = rolesSlice.actions;

// Export reducer
export default rolesSlice.reducer;