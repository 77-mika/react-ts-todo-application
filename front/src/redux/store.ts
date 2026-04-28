import { configureStore } from "@reduxjs/toolkit";
import UiManagerReducer from "./ui-management/UiManagement";

const store = configureStore({
    reducer:{
        UiManagerReducer
    }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
