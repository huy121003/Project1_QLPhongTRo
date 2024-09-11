
import { Link } from 'react-router-dom';

import './LoginScreen.css';

function LoginScreen() {
 


  return (
    <div className="login">
      <div className="login__box">
        <h2 className="login__title">Login</h2>
        <form className="login__form">
          <div className="login__input-group">
            <label htmlFor="username" className="login__label">
              <i className="login__icon fa fa-user"></i>
              <input type="text" id="username" className="login__input" placeholder="Type your username" />
            </label>
          </div>
          <div className="login__input-group">
            <label htmlFor="password" className="login__label">
              <i className="login__icon fa fa-lock"></i>
              <input type="password" id="password" className="login__input" placeholder="Type your password" />
            </label>
          </div>
          <div className="login__forgot-password">
            <a href="/" className="login__forgot-link">Forgot password?</a>
          </div>
          <button className="login__button" type="submit">Login</button>
        </form>
        <div className="login__social-login">
          <p className="login__text">Have not an account? <Link to='/auth/register' className="login__register-link">Sign up</Link></p>
          <div className="login__social-icons">
            <i className="login__social-icon fab fa-facebook"></i>
            <i className="login__social-icon fab fa-twitter"></i>
            <i className="login__social-icon fab fa-google"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
