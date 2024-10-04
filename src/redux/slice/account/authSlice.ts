import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiRegister,
  apiLogout,
  apiLogin,
  apiFetchUser,
} from "../../../services/authtApi";
import { Status } from "../../status";

const initialState = {
  isAuthenticated: false,
  user: {
   email: "",
   name: "",
   role: "",
   _id: ""
  },
  status: Status.Idle,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginaction: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    getUserAction: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutAction: (state) => {
      state.isAuthenticated = false;
      state.user = {
        email: "",
        name: "",
        role: "",
        _id: ""
      };
    },
   
  },
});
export const { loginaction, getUserAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;