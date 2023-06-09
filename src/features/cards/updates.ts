import { createSlice } from "@reduxjs/toolkit";
import { Cardtype } from "../../@types/Mytypes";
interface initialStatetype {
    delate: string[]
    update: Cardtype[]
}
const initialState: initialStatetype = {
    delate: [],
    update: [],
};

const updates = createSlice({
    name: "updates",
    initialState,
    reducers: {
        addDelate: (state, action) => {
            state.delate.push(action.payload)
        }, addUpdate: (state, action) => {
            state.update = [action.payload, ...state.update]
        }
    }
});
// also exported fetchUsers at the top
export const { addDelate, addUpdate } = updates.actions;

//export the reducer
export default updates.reducer