import { createSlice } from "@reduxjs/toolkit";
import { ServiceModel } from "../../../models/ServiceModel"; // Adjust the import path as necessary


export const initialState = {
    service: [] as ServiceModel[],
  
};
export const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {
        fetchServiceAction: (state, action) => {
            state.service = action.payload;
        },
        addServiceAction: (state, action) => {
            state.service.push(action.payload);
        },
        deleteServiceAction: (state, action) => {
            state.service.filter((item) => item._id !== action.payload);
        },
        updateServiceAction: (state, action) => {
            const index = state.service.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) {
                state.service[index] = action.payload;
            }
        },
    },
});

export const { fetchServiceAction, addServiceAction, deleteServiceAction, updateServiceAction } = serviceSlice.actions;
export default serviceSlice.reducer;