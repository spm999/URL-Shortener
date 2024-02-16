import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [shortURLs, setShortURLs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      axios.get(`http://localhost:5172/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        setUsername(response.data.username);
        // Once user data is fetched, fetch short URLs
        fetchShortURLs(token);
      })
      .catch(error => {
        console.error('Error fetching user data:', error.message);
      });
    } else {
      navigate('/login');
    }
  }, [userId, navigate]);

  const fetchShortURLs = (token) => {
    axios.get(`http://localhost:5172/user/${userId}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      setShortURLs(response.data.shortURLs);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching short URLs:', error.message);
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to={`/${userId}`}>Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
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
      <h1>Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {shortURLs.map(url => (
            <li key={url._id}>{url.shortURL},{url.longURL}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
