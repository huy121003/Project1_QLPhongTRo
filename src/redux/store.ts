import {
    Action,
    configureStore,
    ThunkAction,
  } from '@reduxjs/toolkit';
  import authReducer from './slice/auth/authSlice';
  import serviceReducer from './slice/service/serviceSlice';
  import roleReducer from './slice/role/roleSlice';
  export const store = configureStore({
    reducer: {
    auth: authReducer,
    service: serviceReducer,
    role: roleReducer,
    },
  });
  export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;