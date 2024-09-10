import React from 'react'
import LoginScreen from './auth/login/LoginScreen'
import AuthRouter from './auth/authRouter'
import { BrowserRouter } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
    <AuthRouter/></BrowserRouter>
  )
}

export default App
