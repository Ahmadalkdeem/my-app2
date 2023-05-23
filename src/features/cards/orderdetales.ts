import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    loading4: false,
    error4: "",
    users4: [],
};

const orders = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addItem2: (state, action) => {
            let arr: any = []
            action.payload.forEach((element: any) => {
                const index = state.users4.findIndex((c: any) => c._id === element._id);
                if (index === -1) {
                    arr.push(element)
                }
            });
            state.users4 = [...state.users4, ...arr];
        },
        updateitem: (state, action) => {
            const index = state.users4.findIndex((c: any) => c._id === action.payload);
            state.users4[index].status = true
        },
    }
});
// also exported fetchUsers at the top
export const { addItem2, updateitem } = orders.actions;

//export the reducer
export default orders.reducer