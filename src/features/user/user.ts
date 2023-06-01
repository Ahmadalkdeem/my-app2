import { createSlice } from "@reduxjs/toolkit";
import { user } from "../../@types/Mytypes";

const initialState: user = {
    id: '',
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
            localStorage.setItem('userdetalis', JSON.stringify(action.payload));
            state.accessToken = action.payload.accessToken
            state.id = action.payload.id
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
