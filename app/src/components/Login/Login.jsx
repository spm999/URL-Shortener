import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const navigate = useNavigate(); // useNavigate hook to redirect

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5172/user/login', {
        email,
        password
      });
      // console.log(res.data); // Assuming you want to do something with the response, like redirecting the user
      // Save token to localStorage
      const userId=res.data.UserId;
      // console.log(userId)
      localStorage.setItem('authToken', res.data.authtoken);
      // Redirect to Dashboard or wherever you want after successful login
      navigate(`/${userId}`);
    } catch (error) {
      console.error('Login Error:', error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
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
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <input type="submit" value="Login" />
      </form>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p> {/* Link to signup page */}
    </div>
  );
};

export default Login;
