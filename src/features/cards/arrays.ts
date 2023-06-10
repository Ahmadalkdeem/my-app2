import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Cardtype, initialStatetype, item } from "../../@types/Mytypes";
import { brands } from "../../arrays/list";
let array: item[] = []

brands.map((e) => {
    array.push({ name: e.label, loading: false, error: "", users: [], findusers: [], search: false, value: { size: [], colors: [], brands: [], categorys: [], categorys2: [], stopfindusers: false, stopusers: false } })
})
const initialState: initialStatetype = {
    arr: array,
    arrproduct: [],
};

const arrays = createSlice({
    name: "arrayss",
    initialState,
    reducers: {
        addItems: (state, action) => {
            let index = state.arr.findIndex((e: item) => e.name === action.payload.name)
            let arr: Cardtype[] = []
            action.payload.arr.forEach((element: Cardtype) => {
                const i = state.arr[index].users.findIndex((c: Cardtype) => c._id === element._id);
                if (i === -1) {
                    arr.push(element)
                }
            });
            state.arr[index].users = [...state.arr[index].users, ...arr]
            state.arrproduct = [...state.arrproduct, ...action.payload.arr]

        }, addfindItems: (state, action) => {
            let index = state.arr.findIndex((e: item) => e.name === action.payload.name)
            state.arr[index].findusers = action.payload.arr
            state.arrproduct = [...state.arrproduct, ...action.payload.arr]
            state.arr[index].search = true
            state.arr[index].value.stopfindusers = false
        }, addfindItems2: (state, action) => {
            let index = state.arr.findIndex((e: item) => e.name === action.payload.name)
            let arr: Cardtype[] = []
            action.payload.arr.forEach((element: Cardtype) => {
                const i = state.arr[index].findusers.findIndex((c: Cardtype) => c._id === element._id);
                if (i === -1) {
                    arr.push(element)
                }
            });
            state.arr[index].findusers = [...state.arr[index].findusers, ...arr]
            state.arrproduct = [...state.arrproduct, ...action.payload.arr]

        }, search: (state, action) => {
            let index = state.arr.findIndex((e: item) => e.name === action.payload.name)
            state.arr[index].search = false
            state.arr[index].value.stopfindusers = false
        }, onchange: (state, action) => {
            let index = state.arr.findIndex((e: item) => e.name === action.payload.name)
            state.arr[index].value = action.payload.slice
        }
    },
    extraReducers: (builder) => {

    }
});
// also exported fetchUsers at the top
export const { addItems, search, onchange, addfindItems, addfindItems2 } = arrays.actions;

//export the reducer
export default arrays.reducer