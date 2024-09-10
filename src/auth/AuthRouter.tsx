import { BrowserRouter as Router,Route,Routes,Link } from "react-router-dom";
import React from 'react'
import LoginScreen from './login/LoginScreen'
import RegisterScreen from './signin/RegisterScreen'

const AuthRouter = () => {
    return (
        
            
        <Routes >
            <Route path="/" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
        </Routes>
        
    )
    }

export default AuthRouter
