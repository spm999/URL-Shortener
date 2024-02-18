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
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          setIsLoggedIn(true);
          const response = await axios.get(`https://url-shortener-tatk.onrender.com/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          setUsername(response.data.username);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, [userId]);

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  const shortenURL = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const response = await axios.post(
          `https://url-shortener-tatk.onrender.com/${userId}/url/short`,
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
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      {loading ? ( // Render loading state
        <p>Loading...</p>
      ) : (
        <>
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
          <h1>URL Shortener</h1>

          <form onSubmit={shortenURL}>
            <input
              type="text"
              value={longURL}
              onChange={(e) => setLongURL(e.target.value)}
              className="input-field"
              placeholder="Enter long URL"
              required
            />
            <div className='shorting-button'>
              <button type="submit" className="shorten-button">Shorten URL</button>
              {shortURL && <p className="shortened-url">Shortened URL: <a href={shortURL} target="_blank" rel="noopener noreferrer">{shortURL}</a></p>}
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Home2;
