import { createSlice } from "@reduxjs/toolkit";
import { cart } from "../../@types/Mytypes";

const initialState: cart = {
    cart: []
};

const cardpants = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCard: (state, action) => {
            let x: any = ''
            state.cart.map((e: any, index: number) => {
                if (action.payload._id === e._id) {
                    if (action.payload.sizeselect === e.sizeselect && action.payload.color === e.color) {
                        if (e.quantity + action.payload.quantity > 10) {
                            state.cart[index].quantity = 10
                        }
                        else {
                            state.cart[index].quantity = e.quantity + action.payload.quantity
                        }

                        x = true
                    }
                }
            })
            if (x === '') {
                state.cart = [...state.cart, action.payload]
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        editCard: (state, action) => {
            const cardToEdit = action.payload;
            const index = state.cart.findIndex((c: any) => c.id === cardToEdit.id);
            state.cart[index].quantity = state.cart[index].quantity + cardToEdit.quantity2;
            localStorage.setItem('cart', JSON.stringify(state.cart));

        },
        deleteCard: (state, action) => {
            const index = state.cart.findIndex((c: any) => c.id === action.payload);
            state.cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(state.cart));

        },
        deleteArr: (state) => {
            state.cart = []
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        AddArr: (state, action) => {
            state.cart = [...action.payload]
        },
    }
});
export const { addCard, editCard, deleteCard, deleteArr, AddArr } = cardpants.actions;

export default cardpants.reducer