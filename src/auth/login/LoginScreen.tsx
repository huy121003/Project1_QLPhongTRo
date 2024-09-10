import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './LoginScreen.css'
function LoginScreen() {

    const navigate = useNavigate()
    const handlerRegister = () => {
        navigate('/register')
    }
    
  return (

    <div className="body">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="input-group">
            
            <label htmlFor="username">
              <i className="fa fa-user"></i>
              <input type="text" id="username" placeholder="Type your username" />
            </label>
          </div>
          <div className="input-group">
            <label htmlFor="password">
              <i className="fa fa-lock"></i>
              <input type="password" id="password" placeholder="Type your password" />
            </label>
          </div>
          <div className="forgot-password">
            <a href="/">Forgot password?</a>
          </div>
          <button className="login-button" type="submit">Login</button>
        </form>
        <div className="social-login">
          <p>Have not an account ? <Link to='/auth/register'>Sign up</Link></p>
          
           <div className="social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-google"></i>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
