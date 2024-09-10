import { BrowserRouter as Router,Route,Routes,Link, Navigate } from "react-router-dom";
import React from 'react'
import LoginScreen from './login/LoginScreen'
import RegisterScreen from './signin/RegisterScreen'

const AuthRouter = () => {
    return (
        
            
        <Routes >
            <Route path ="/" element={<Navigate to="/auth/login"/> }/>
            <Route path="/auth/login" element={<LoginScreen />} />
            <Route path="/auth/register" element={<RegisterScreen />} />
        </Routes>
        
    )
    }

export default AuthRouter
