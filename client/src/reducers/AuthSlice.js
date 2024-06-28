import { createSlice } from "@reduxjs/toolkit";
const initalState = {
    profile : localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile")) : null,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    loginData : null,
}
const AuthSlice = createSlice({
    name:"auth",
    initialState:initalState,
    reducers:{
        setProfile(state,actions){
            state.profile = actions.payload;
        },
        setToken(state,actions){
            state.token = actions.payload;
        },
        setLoginData(state,actions){
            state.loginData = actions.payload;
        },
    }
})

export const {setProfile,setToken,setLoginData} = AuthSlice.actions;
export default AuthSlice.reducer;