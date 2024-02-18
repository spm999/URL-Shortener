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

  const handleAnalytics = (urlId) => {
    navigate(`/${userId}/${urlId}/analytics`);
  };
  

  const handleDelete = (urlId) => {
    const token = localStorage.getItem('authToken');
    axios.delete(`http://localhost:5172/shortURL/${urlId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        // Remove the deleted URL from the state
        setShortURLs(shortURLs.filter(url => url._id !== urlId));
      })
      .catch(error => {
        console.error('Error deleting URL:', error.message);
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
              <li className='Hellouser'>Hello {username}</li>
              <li><button className='logout' onClick={logout}>Logout</button></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
      </nav>
      <h1>Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        // <ul>
        //   {shortURLs.map(url => (
        //     <li key={url._id}>
        //       <a href={url.shortURL} target='_blank'>{url.shortURL}</a>, <a href={url.longURL} target='_blank'>{url.longURL}</a>
        //       <button onClick={() => handleAnalytics(url._id)}>Analytics</button>
        //       <button onClick={() => handleDelete(url._id)}>Delete</button>
        //     </li>
        //   ))}
        // </ul>
        <table className="url-table">
  <thead>
    <tr>
      <th>Short URL</th>
      <th>Long URL</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {shortURLs.map(url => (
      <tr key={url._id}>
        <td><a href={url.shortURL} target='_blank'>{url.shortURL}</a></td>
        <td><a href={url.longURL} target='_blank'>{url.longURL}</a></td>
        <td>
          <button onClick={() => handleAnalytics(url._id)}>Analytics</button>
          <button id='delete' onClick={() => handleDelete(url._id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      )}
    </div>
  );
};

export default Dashboard;
