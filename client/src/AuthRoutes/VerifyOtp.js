import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
export const VerifyOtp = ({children}) => {
    const {loginData} = useSelector((state)=>state.auth);
    if(loginData){
        return children;
    }
    else{
       return <Navigate to={"/admin/login"}/>
    }
}
