import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sliCecatgre, Cardtype } from "../../@types/Mytypes";

const initialState: sliCecatgre = {
    loading: false,
    error: "",
    users: [],
    findusers: [],
    search: false,
    value: { size: [], colors: [], brands: [], stopfindusers: false, stopusers: false },
};

export const fetchUsers = createAsyncThunk<any[]>("user/fetchUsers", (length1: any) =>
    fetch(`http://localhost:3001/cards/filtering/Shirtsproduct/0`).then((res) => res.json())
);

// fetch user from api
const cardshirts = createSlice({
    name: "user",
    initialState,
    reducers: {
        addItem: (state, action) => {
            let arr: Cardtype[] = []
            if (state.search === false) {
                action.payload.forEach((element: Cardtype) => {
                    const index = state.users.findIndex((c: Cardtype) => c._id === element._id);
                    if (index === -1) {
                        arr.push(element)
                    }
                });
                state.users = [...state.users, ...arr]
            }
            else {
                action.payload.forEach((element: Cardtype) => {
                    const index = state.findusers.findIndex((c: Cardtype) => c._id === element._id);
                    if (index === -1) {
                        arr.push(element)
                    }
                });
                state.findusers = [...state.findusers, ...arr]
            }
        }, delteItem: (state, action) => {
            const index = state.users.findIndex((c: any) => c._id === action.payload);
            state.users.splice(index, 1);
        }, addfindusers: (state, action) => {
            state.findusers = action.payload
            state.search = true
            state.value.stopfindusers = false
        }, search: (state) => {
            state.search = false
        }, onchange: (state, action) => {
            state.value = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.loading = true
                state.error = ''
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = [...action.payload]

            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false
                state.users = []
                state.error = action.error.message ?? 'Something went wrong'
            })
    },
});
// also exported fetchUsers at the top
export const { addItem, delteItem, addfindusers, search, onchange } = cardshirts.actions;

//export the reducer
export default cardshirts.reducer