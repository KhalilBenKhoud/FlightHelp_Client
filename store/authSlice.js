import { createSlice } from "@reduxjs/toolkit";
import { getFromSecureStore } from "../util/secureStorage";
import { logout } from "../services/auth.service";



const authSlice = createSlice({
    name : 'auth',
    initialState : {
        authenticated : false,
        accessToken : '',
        role : '',
        userId : ''
    },
    reducers : {
        login : (state,action) => {
            state.authenticated = true;
            state.accessToken = action.payload.accessToken ;
            state.role = action.payload.role,
            state.userId = action.payload.userId ;
        },
        logout :  (state) => {
            state.authenticated = false;
            state.accessToken = '' ;
            state.role = '' ;
        },
        attachAccessToken : (state,action) => {
           state.accessToken = action.payload ;
        }
    }
})


export const loginAction = authSlice.actions.login ;
export const logoutAction = authSlice.actions.logout ;
export const attachAccessTokenAction = authSlice.actions.attachAccessToken ;

export default authSlice.reducer  ; 