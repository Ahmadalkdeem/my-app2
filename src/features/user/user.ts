import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    accessToken: '',
    email: '',
    roles: ['user'],
    username: '',
};


const userdetalis = createSlice({
    name: "userdetalis",
    initialState,
    reducers: {
        updatedetalise: (state, action) => {
            localStorage.setItem('userdetalis', action.payload.accessToken);
            state.accessToken = action.payload.accessToken
            state.email = action.payload.email
            state.username = action.payload.username
            state.roles = action.payload.roles
        }
    }
});
// also exported fetchUsers at the top
export const { updatedetalise } = userdetalis.actions;

//export the reducer
export default userdetalis.reducer