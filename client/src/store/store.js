import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from "../reducers/AuthSlice";
export const store = configureStore({
  reducer: {
    auth:authSliceReducer,
  },
})