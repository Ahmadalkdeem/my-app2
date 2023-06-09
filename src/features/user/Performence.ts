import { createSlice } from "@reduxjs/toolkit";
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
}
const initialState: initialStatetype = {
    data1: [],
    data2: { _id: null, total: 0, count: 0, avg: 0 },
    data3: []
};


const Performence = createSlice({
    name: "Performence",
    initialState,
    reducers: {
        addarr: (state, action) => {
            if (action.payload.name === 'data1') { state.data1 = action.payload.arr };
            if (action.payload.name === 'data2') { state.data2 = action.payload.arr };
            if (action.payload.name === 'data3') { state.data3 = action.payload.arr };
        }
    }
});
// also exported fetchUsers at the top
export const { addarr } = Performence.actions;

//export the reducer
export default Performence.reducer