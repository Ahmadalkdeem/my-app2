// import { initialUserState, User } from "./user";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: any = {
    loading2: false,
    error2: "",
    users2: [],
    findusers2: [],
};

export const fetchUsers2 = createAsyncThunk<any[]>("user2/fetchUsers2", (length1: any) =>
    fetch(`http://localhost:3001/uplode/pantsproduct/0`).then((res) => res.json())
);

// fetch user from api
const cardpants = createSlice({
    name: "user2",
    initialState,
    reducers: {
        addItem2: (state, action) => {
            let arr: any = []
            action.payload.forEach((element: any) => {
                const index = state.users2.findIndex((c: any) => c._id === element._id);
                if (index === -1) {
                    arr.push(element)
                }
            });
            state.users2 = [...state.users2, ...arr];
        },
        delteItem2: (state, action) => {
            const index = state.users2.findIndex((c: any) => c._id === action.payload);
            state.users2.splice(index, 1);
        },
        addfindusers2: (state, action) => {
            state.findusers2 = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers2.pending, (state, action) => {
                state.loading2 = true
                state.error2 = ''
            })
            .addCase(fetchUsers2.fulfilled, (state, action) => {
                state.loading2 = false
                state.users2 = [...action.payload]

            })
            .addCase(fetchUsers2.rejected, (state, action) => {
                state.loading2 = false
                state.users2 = []
                state.error2 = 'Something went wrong'
            })
    },
});
// also exported fetchUsers at the top
export const { addItem2, delteItem2, addfindusers2 } = cardpants.actions;

//export the reducer
export default cardpants.reducer