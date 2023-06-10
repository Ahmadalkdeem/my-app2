import { createSlice } from "@reduxjs/toolkit";
import { Cardtype } from "../../@types/Mytypes";
import axios from "axios";
import { Url } from "../../arrays/list";
interface initialStatetype {
    arr: Cardtype[],

}
const initialState: initialStatetype = {
    arr: []
};


const Favorites = createSlice({
    name: "Favorites",
    initialState,
    reducers: {
        addItem: (state, action) => {
            let index = state.arr.findIndex((e) => e._id === action.payload.card._id)
            if (index === -1) { state.arr = [...state.arr, action.payload.card] }
            else { state.arr.splice(index, 1) }
            localStorage.setItem('Favorites', JSON.stringify(state.arr));
            if (action.payload.accessToken !== '') {
                let arrobjecctid: string[] = []
                state.arr.map((e) => {
                    arrobjecctid.push(e._id)
                })
                axios.put(`${Url}favorite`, { params: { arr: JSON.stringify(arrobjecctid), accessToken: action.payload.accessToken } }).then((e) => {
                    console.log(e);

                }).catch(e => {
                    console.log(e);

                })
            }
        }, addItems: (state, action) => {
            state.arr = action.payload
            localStorage.setItem('Favorites', JSON.stringify(action.payload));
        }, extraReducers: (builder) => {

        },
    }
});
// also exported fetcharr at the top
export const { addItem, addItems } = Favorites.actions;

//export the reducer
export default Favorites.reducer