import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    users: []
};


// fetch user from api
const users = createSlice({
    name: "users",
    initialState,
    reducers: {
        addItems: (state, action) => {
            let arr: any = []
            action.payload.forEach((element: any) => {
                const index = state.users.findIndex((c: any) => c._id === element._id);
                if (index === -1) {
                    arr.push(element)
                }
            });
            state.users = [...state.users, ...arr];
        }, addItem: (state, action) => {

            const index = state.users.findIndex((c: any) => c._id === action.payload._id);
            if (index < 0) {
                state.users = [action.payload, ...state.users];
            } else {
                let arr = state.users
                arr.splice(index, 1)
                state.users = [action.payload, ...arr];

            }
        }, delteItem: (state, action) => {
            const index = state.users.findIndex((c: any) => c._id === action.payload);
            state.users.splice(index, 1);
        }
        , updateItem: (state, action) => {
            const index = state.users.findIndex((c: any) => c._id === action.payload._id);
            state.users[index].roles = action.payload.roles
        }
    },
    extraReducers: (builder) => {

    },
});
// also exported fetchUsers at the top
export const { addItem, addItems, delteItem, updateItem } = users.actions;

//export the reducer
export default users.reducer