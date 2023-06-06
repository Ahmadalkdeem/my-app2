import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Cardtype, initialStatetype, item } from "../../@types/Mytypes";
import { brands } from "../../arrays/list";
let array: item[] = []

brands.map((e) => {
    array.push({ name: e.label, loading: false, error: "", users: [], findusers: [], search: false, value: { size: [], colors: [], brands: [], categorys: [], categorys2: [], stopfindusers: false, stopusers: false } })
})
const initialState: initialStatetype = {
    arr: array
};

// fetch user from api
const arrays = createSlice({
    name: "arrayss",
    initialState,
    reducers: {
        addItem: (state, action) => {
            let index = state.arr.findIndex((e: item) => e.name === action.payload.name)
            let arr: Cardtype[] = []
            action.payload.arr.forEach((element: Cardtype) => {
                const i = state.arr[index].users.findIndex((c: Cardtype) => c._id === element._id);
                if (i === -1) {
                    arr.push(element)
                }
            });
            state.arr[index].users = [...state.arr[index].users, ...arr]

        },
        delteItem: (state, action) => {
            //const index = state.users.findIndex((c: Cardtype) => c._id === action.payload);

            // let index = state.arr.findIndex((e: any) => e.name === action.payload.name)
            // let index2 = state.arr.findIndex((e: any) => e.name === action.payload.name)
            // let index3 = state.arr.findIndex((e: any) => e.name === action.payload.name)
            // if (index !== undefined) return state.arr[index].users.splice(index, 1);


            // let index2 = state.arr.findIndex((e: any) => e.name === action.payload.name)
            // if (index2 !== undefined) return state.arr[index].users.splice(index, 1);
            // state.arr[index].users.splice(index, 1);
        },
        addfindusers: (state, action) => {
            let index = state.arr.findIndex((e: item) => e.name === action.payload.name)
            state.arr[index].findusers = action.payload.arr
            state.arr[index].search = true
        }, search: (state, action) => {
            let index = state.arr.findIndex((e: item) => e.name === action.payload.name)
            state.arr[index].search = false
        }, onchange: (state, action) => {
            let index = state.arr.findIndex((e: item) => e.name === action.payload.name)
            state.arr[index].value = action.payload.slice
        }
    },
    extraReducers: (builder) => {

    }
});
// also exported fetchUsers at the top
export const { addItem, delteItem, search, onchange, addfindusers } = arrays.actions;

//export the reducer
export default arrays.reducer