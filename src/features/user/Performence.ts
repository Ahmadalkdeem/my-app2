import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    data1: [],
    data2: { _id: null, total: 0, count: 0, avg: 0 },
    data3: []
};


const Performence = createSlice({
    name: "Performence2",
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