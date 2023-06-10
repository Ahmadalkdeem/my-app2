import { createSlice } from "@reduxjs/toolkit";
import { Cardtype } from "../../@types/Mytypes";
interface typedate1 {
    avg: number,
    count: number,
    totalPrice: number,
    _id: { date: string }
}
interface initialStatetype {
    data1: typedate1[],
    data2: { _id: null, total: number, count: number, avg: number },
    data3: any,
    data4: Cardtype[]
}
const initialState: initialStatetype = {
    data1: [],
    data2: { _id: null, total: 0, count: 0, avg: 0 },
    data3: [],
    data4: []
};


const Performence = createSlice({
    name: "Performence",
    initialState,
    reducers: {
        addarr: (state, action) => {
            if (action.payload.name === 'data1') { state.data1 = action.payload.arr };
            if (action.payload.name === 'data2') { state.data2 = action.payload.arr };
            if (action.payload.name === 'data3') { state.data3 = action.payload.arr };
            if (action.payload.name === 'data4') { state.data4 = action.payload.arr };
        }
    }
});
export const { addarr } = Performence.actions;

export default Performence.reducer