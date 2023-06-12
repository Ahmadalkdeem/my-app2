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
    data2: { total: number, count: number, avg: number },
    data3: any,
    data4: Cardtype[]
}
const initialState: initialStatetype = {
    data1: [],
    data2: { total: 0, count: 0, avg: 0 },
    data3: [],
    data4: []
};


const Performence = createSlice({
    name: "Performence",
    initialState,
    reducers: {
        addarr: (state, action) => {
            if (action.payload.name === 'data1') {
                state.data1 = action.payload.arr
                let totalPrice = 0
                let count = 0
                let avg = 0
                action.payload.arr.map((e: typedate1) => {
                    totalPrice = totalPrice + e.totalPrice
                    count = count + e.count
                })
                avg = totalPrice / count
                state.data2 = { total: totalPrice, count: count, avg: avg }
            };
            if (action.payload.name === 'data3') { state.data3 = action.payload.arr };
            if (action.payload.name === 'data4') { state.data4 = action.payload.arr };
        }
    }
});
export const { addarr } = Performence.actions;

export default Performence.reducer