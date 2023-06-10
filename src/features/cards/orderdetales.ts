import { createSlice } from "@reduxjs/toolkit";
import { order } from "../../@types/Mytypes";
interface initialStatetype {
    arr: order[]
    arr2: order[]
}
const initialState: initialStatetype = {
    arr: [],
    arr2: [],
};

const orders = createSlice({
    name: "orders",
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
        }, addfindItems: (state, action) => {
            state.arr2 = action.payload;
        },
        updateitem: (state, action) => {
            const indexarr = state.arr.findIndex((c) => c._id === action.payload);
            if (indexarr !== -1) { state.arr[indexarr].status = true }
            const indexarr2 = state.arr2.findIndex((c) => c._id === action.payload);
            if (indexarr2 !== -1) { state.arr2[indexarr2].status = true }
        }, delateitem: (state, action) => {
            const indexarr = state.arr.findIndex((c) => c._id === action.payload);
            if (indexarr !== -1) { state.arr.splice(indexarr, 1) }
            const indexarr2 = state.arr2.findIndex((c) => c._id === action.payload);
            if (indexarr2 !== -1) { state.arr2.splice(indexarr2, 1) }
        }
    }
});
export const { addItems, updateitem, addfindItems, delateitem } = orders.actions;

//export the reducer
export default orders.reducer