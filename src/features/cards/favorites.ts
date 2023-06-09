import { createSlice } from "@reduxjs/toolkit";
import { Cardtype } from "../../@types/Mytypes";

interface initialStatetype {
    arr: Cardtype[],

}
const initialState: initialStatetype = {
    arr: []
};


// fetch user from api
const Favorites = createSlice({
    name: "Favorites",
    initialState,
    reducers: {
        addItem: (state, action) => {
            let index = state.arr.findIndex((e) => e._id === action.payload._id)

            if (index === -1) { state.arr = [...state.arr, action.payload] }
            else {
                state.arr.splice(index, 1)
            }
            localStorage.setItem('Favorites', JSON.stringify(state.arr));

        }, addItems: (state, action) => {
            state.arr = action.payload
        }, extraReducers: (builder) => {

        },
    }
});
// also exported fetcharr at the top
export const { addItem, addItems } = Favorites.actions;

//export the reducer
export default Favorites.reducer