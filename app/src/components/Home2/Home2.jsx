import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import axios from 'axios';

const Home2 = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  console.log(userId)
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    // console.log(token)
    // console.log(userId)
    if (token) {
      setIsLoggedIn(true);
      // Fetch the user's data including username
      axios.get(`http://localhost:5172/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          setUsername(response.data.username);
        })
        .catch(error => {
          console.error('Error fetching user data:', error.message);
        });
    }
  }, [userId]);

  const logout = () => {
    // Clear token from localStorage
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUsername('');
    // Redirect to home page or login page
    navigate('/');
  };

  const shortenURL = async () => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const response = await axios.post(
          `http://localhost:5172/user/${userId}/url/short`,
          { longURL },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setShortURL(response.data.shortURL);
      } catch (error) {
        console.error('Error shortening URL:', error.message);
      }
    } else {
      // Redirect to login page if not logged in
      navigate('/login');
    }
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to={`/${userId}`}>Home</Link></li>
          <li><Link to={`/${userId}/contact`}>Contact</Link></li>
          <li><Link to={`/${userId}/aboutus`}>About Us</Link></li>
          <li><Link to={`/${userId}/dashboard`}>Dashboard</Link></li>
          {isLoggedIn ? (
            <>
              <li>Hello {username}</li>
              <li><button onClick={logout}>Logout</button></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
      <h1>URL Shortener</h1>
      <input
        type="text"
        value={longURL}
        onChange={(e) => setLongURL(e.target.value)}
        placeholder="Enter long URL"
      />
      <button onClick={shortenURL}>Shorten URL</button>
      {shortURL && <p>Shortened URL: {shortURL}</p>}
    </div>
  );
};

export default Home2;
