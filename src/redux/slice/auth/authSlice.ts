import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: {
    email: "",
    name: "",
    role: {
      _id: "",
      name: "",
    },
    _id: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginaction: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoading = false;
    },
    getUserAction: (state, action) => {
      //console.log(action.payload);
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoading = false;
    },
    logoutAction: (state) => {
      localStorage.removeItem("access_token");
      state.isAuthenticated = false;
      state.user = {
        email: "",
        name: "",
        role: {
          _id: "",
          name: "",
        },
        _id: "",
      };
    },
  },
});
export const { loginaction, getUserAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;
