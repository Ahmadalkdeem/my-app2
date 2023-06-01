import { createSlice } from "@reduxjs/toolkit";
interface user {
    _id: string,
    email: string,
    roles: [string],
    username: string
}
interface initialStatetype {
    arr: user[],

}
const initialState: initialStatetype = {
    arr: []
};


// fetch user from api
const users = createSlice({
    name: "users",
    initialState,
    reducers: {
        addItems: (state, action) => {
            let arr: any = []
            action.payload.forEach((element: any) => {
                const index = state.arr.findIndex((c: any) => c._id === element._id);
                if (index === -1) {
                    arr.push(element)
                }
            });
            state.arr = [...state.arr, ...arr];
        }, addItem: (state, action) => {

            const index = state.arr.findIndex((c: any) => c._id === action.payload._id);
            if (index < 0) {
                state.arr = [action.payload, ...state.arr];
            } else {
                let arr = state.arr
                arr.splice(index, 1)
                state.arr = [action.payload, ...arr];

            }
        }, delteItem: (state, action) => {
            const index = state.arr.findIndex((c: any) => c._id === action.payload);
            state.arr.splice(index, 1);
        }
        , updateItem: (state, action) => {
            const index = state.arr.findIndex((c: any) => c._id === action.payload._id);
            state.arr[index].roles = action.payload.roles
        }
    },
    extraReducers: (builder) => {

    },
});
// also exported fetcharr at the top
export const { addItem, addItems, delteItem, updateItem } = users.actions;

//export the reducer
export default users.reducer