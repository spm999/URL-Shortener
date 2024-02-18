import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const AboutUs = () => {

  const { userId } = useParams();
  const navigate = useNavigate(); // Using useNavigate to get the navigation function

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

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
        })
        .catch(error => {
          console.error('Error fetching user data:', error.message);
        });
    }
  }, [userId]); // Include userId in dependency array

  // Assuming you have a logout function similar to what's used in the Dashboard
  const logout = () => {
    // Clear token from localStorage
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUsername('');
    // Redirect to home page or login page
    navigate('/');
  };

  return (
    <div className="home-container">
      <nav className="nav-container">

        {isLoggedIn ? (<li><Link to={`/${userId}`}>Home</Link></li>
        ) : (<li><Link to="/">Home</Link></li>
        )}

        {isLoggedIn ? (<li><Link to={`/${userId}/contact`}>Contact</Link></li>
        ) : (<li><Link to="/contact">Contact</Link></li>
        )}
        {isLoggedIn ? (<li><Link to={`/${userId}/aboutus`}>About</Link></li>
        ) : (<li><Link to="/aboutus">About</Link></li>
        )}
        {isLoggedIn && <li><Link to={`/${userId}/dashboard`}>Dashboard</Link></li>}
        {isLoggedIn ? (
          <>
            <li>Hello {username}</li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </nav>
      <div className="about-container">
        <h2 className="about-title">About Us</h2>
        <p className="about-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget felis at purus finibus
          convallis. Vivamus vel nisi vitae libero consectetur varius. Integer vel arcu risus.
          Fusce interdum, tortor eu consectetur accumo consequat, at auctor enim scelerisque. Ut nec
          sapien a purus luctus lobortis.
        </p>
      </div>

    </div>
  );
};

export default AboutUs;
