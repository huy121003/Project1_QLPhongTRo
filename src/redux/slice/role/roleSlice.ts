import { createSlice } from "@reduxjs/toolkit";

import { RoleModel } from "../../../models/RoleModel";


export const initialState = {
    role: [] as RoleModel[],
  
};
export const roleSlice = createSlice({
    name: "service",
    initialState,
    reducers: {
        fetchRoleAction: (state, action) => {
            state.role = action.payload;
        },
      
    },
});

export const { fetchRoleAction } = roleSlice.actions;
export default roleSlice.reducer;