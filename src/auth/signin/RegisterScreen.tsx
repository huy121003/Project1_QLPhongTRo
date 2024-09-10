import React from 'react'
import { Link } from 'react-router-dom'
function RegisterScreen() {
  return (
    <div className="body">
      <div className="login-box">
        <h2>Register</h2>
        <form>
          <div className="input-group">
            
            <label htmlFor="username">
              <i className="fa fa-user"></i>
              <input type="text" id="username" placeholder="Type your username" />
            </label>
          </div>
          <div className="input-group">
            
            <label htmlFor="useremail">
              <i className="fa fa-envelope"></i>
              <input type="text" id="useremail" placeholder="Type your email" />
            </label>
          </div>
          <div className="input-group">
            <label htmlFor="password">
              <i className="fa fa-lock"></i>
              <input type="password" id="password" placeholder="Type your password" />
            </label>
          </div>
          
          <button className="login-button" type="submit">Register</button>
        </form>
        <div className="social-login">
          <p>Have  an account ? <Link to='/auth/login'>Sign in</Link></p>
          
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

export default RegisterScreen
