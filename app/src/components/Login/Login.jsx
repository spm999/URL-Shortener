import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] =useState('')

  const { email, password } = formData;
  const navigate = useNavigate(); // useNavigate hook to redirect

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://url-shortener-tatk.onrender.com/user/login', {
        email,
        password
      });
      // Save token to localStorage
      localStorage.setItem('authToken', res.data.authtoken);
      // Redirect to Dashboard or wherever you want after successful login
      const userId = res.data.UserId;
      navigate(`/${userId}`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('Your Email is not registered.');
      } else {
        setError('Please check your credential');
      }
    }
  };


  return (
    <div className="home-container">
      <nav className="nav-container">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li> <Link to="/aboutus">About Us</Link></li>
        <li> <Link to="/login">Login</Link></li>
      </nav>
      <h1>Login</h1>
      <div className='form-container'>


      <form className="login-form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            className="form-input"
            minLength="6"
            required
          />
        </div>
        <input type="submit" value="Login" className="form-submit" />
        {error && <p className="error-message">{error}</p>}

      </form>

      </div>
      <p className="signup-text">Don't have an account? <Link to="/register" className="signup-link">Sign Up</Link></p>

    </div>
  );
};

export default Login;
