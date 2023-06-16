import { createSlice } from "@reduxjs/toolkit";
import { optionstype } from "../../@types/Mytypes";
export interface initialStatetype {
    Topproduct: { size: optionstype[], colors: optionstype[], brands: optionstype[], categorys: optionstype[], categorys2: optionstype[] },
    Favoriteproduct: { size: optionstype[], colors: optionstype[], brands: optionstype[], categorys: optionstype[], categorys2: optionstype[] },


}
const initialState: initialStatetype = {
    Topproduct: { size: [], colors: [], brands: [], categorys: [], categorys2: [] },
    Favoriteproduct: { size: [], colors: [], brands: [], categorys: [], categorys2: [] },

};

const fillter = createSlice({
    name: "fillter",
    initialState,
    reducers: {
        addItem: (state, action) => {
            if (action.payload.name === 'Topproduct') { state.Topproduct = action.payload.item }
            if (action.payload.name === 'Favoriteproduct') { state.Favoriteproduct = action.payload.item }
        }
    },
    extraReducers: (builder) => {

    }
});
// also exported fetchUsers at the top
export const { addItem } = fillter.actions;

//export the reducer
export default fillter.reducer