import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


const Analytics = () => {
  const { urlId, userId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      axios.get(`https://url-shortener-tatk.onrender.com/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          setUsername(response.data.username);
          // Fetch analytics data after user data is fetched
          fetchAnalyticsData(token);
        })
        .catch(error => {
          console.error('Error fetching user data:', error.message);
          navigate('/404'); // Redirect to 404 page if user data is not found or other errors occur
        });
    } else {
      navigate('/login');
    }
  }, [userId, navigate]);

  const fetchAnalyticsData = (token) => {
    axios.get(`https://url-shortener-tatk.onrender.com/user/${userId}/${urlId}/analytics`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setAnalyticsData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching analytics data:', error.message);
        navigate('/404'); // Redirect to 404 page if analytics data is not found or other errors occur
      });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

 



  return (
    <div className="home-container">
      <nav className="nav-container">
        <li><Link to={`/${userId}`}>Home</Link></li>
        <li><Link to={`/${userId}/contact`}>Contact</Link></li>
        <li><Link to={`/${userId}/aboutus`}>About Us</Link></li>
        <li><Link to={`/${userId}/dashboard`}>Dashboard</Link></li>
        {isLoggedIn ? (
          <>
            <li className='Hello-user'>Hello {username}</li>
            <li><button className='logout' onClick={logout}>Logout</button></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </nav>
      <h1>Analytics</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Visit Count: {analyticsData.visitCount}</p>
          <h3>Visits:</h3>
          <ul>
            {analyticsData.visits.map((visit, index) => (
              <li key={index}>{visit.timestamp}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Analytics;
