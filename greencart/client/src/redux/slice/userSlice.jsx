import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice(
    {
        name: "user",
        initialState: [],
        reducers: {
            userDetails: (state,action)=>{
                state.push(action.payload);
            }
        }
    }
)

export const { userDetails } = userSlice.actions;
export default userSlice.reducer;