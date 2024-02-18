import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const { username, email, password } = formData;
  const navigate = useNavigate(); // Using useNavigate instead of useHistory

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://url-shortener-tatk.onrender.com/user/register', {
        username,
        email,
        password
      });
      console.log(res.data); // Assuming you want to do something with the response, like redirecting the user
      // Redirect to login page after successful registration
      navigate('/login'); // Using navigate function to redirect
    } catch (error) {
      console.error('Registration Error:', error.message);
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
      <h1>Register</h1>
      <div className='form-container'>
      <form className="login-form" onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="form-input"
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="form-input"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="form-input"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <input type="submit" value="Register" className="form-submit" />
      </form>
      </div>
      <p className="signup-text"  >Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
