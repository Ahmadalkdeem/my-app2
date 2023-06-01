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
        addItem: (state, action) => {
            let arr: any = []
            action.payload.forEach((element: any) => {
                const index = state.arr.findIndex((c: any) => c._id === element._id);
                if (index === -1) {
                    arr.push(element)
                }
            });
            state.arr = [...state.arr, ...arr];
        }, addItems: (state, action) => {
            let arr: any = []
            state.arr.forEach((element) => {
                const index = action.payload.findIndex((c: any) => c._id === element._id);
                if (index === -1) {
                    arr.push(element)
                }
            });
            state.arr = arr;
            state.arr2 = action.payload;

        },
        updateitem: (state, action) => {
            const index = state.arr.findIndex((c: any) => c._id === action.payload);
            state.arr[index].status = true
        }, delateitem: (state, action) => {
            const index = state.arr.findIndex((c: any) => c._id === action.payload);
            state.arr.splice(index, 1)
        }
    }
});
// also exported fetchUsers at the top
export const { addItem, updateitem, addItems, delateitem } = orders.actions;

//export the reducer
export default orders.reducer