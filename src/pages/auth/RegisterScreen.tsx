
import { Link } from 'react-router-dom';
import './RegisterScreen.css'; // Thêm import cho CSS nếu cần

function RegisterScreen() {
  return (
    <div className="register">
      <div className="register__box">
        <h2 className="register__title">Register</h2>
        <form>
          <div className="register__input-group">
            <label htmlFor="username" className="register__label">
              <i className="fa fa-user register__icon"></i>
              <input type="text" id="username" placeholder="Type your username" className="register__input" />
            </label>
          </div>
          <div className="register__input-group">
            <label htmlFor="useremail" className="register__label">
              <i className="fa fa-envelope register__icon"></i>
              <input type="text" id="useremail" placeholder="Type your email" className="register__input" />
            </label>
          </div>
          <div className="register__input-group">
            <label htmlFor="password" className="register__label">
              <i className="fa fa-lock register__icon"></i>
              <input type="password" id="password" placeholder="Type your password" className="register__input" />
            </label>
          </div>
          <button className="register__button" type="submit">Register</button>
        </form>
        <div className="register__social-login">
          <p>Have an account? <Link to='/auth/login' className="register__link">Sign in</Link></p>
          <div className="register__social-icons">
            <i className="fab fa-facebook register__social-icon"></i>
            <i className="fab fa-twitter register__social-icon"></i>
            <i className="fab fa-google register__social-icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
