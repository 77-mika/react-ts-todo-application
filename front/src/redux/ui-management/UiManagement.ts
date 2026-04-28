import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ThemeType = "dark"|"light"

type initialStateType = { showSidebar:boolean , theme : ThemeType }

const initialState:initialStateType = {showSidebar:false, theme :  localStorage.getItem('theme') as ThemeType||'dark'};

const UiManagerSlice = createSlice({
    name:"Ui-Manager",
    initialState,
    reducers:{
        setShowSidebar : (state:initialStateType,action:PayloadAction<boolean>)=>{
            state.showSidebar = action.payload
        },
        toggleTheme : (state:initialStateType)=>{
            const newTheme = state.theme = state.theme === "light" ? "dark" : "light"
            state.theme = newTheme
            localStorage.setItem('theme',newTheme)

        },
        setTheme : (state:initialStateType,action:PayloadAction<ThemeType>)=>{
            state.theme = action.payload;
            localStorage.setItem('theme',action.payload)
        }
    }
})

const UiManagerReducer = UiManagerSlice.reducer;
export default UiManagerReducer;

export const {setShowSidebar, toggleTheme} = UiManagerSlice.actions;