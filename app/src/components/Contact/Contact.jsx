import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Contact = () => {
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
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>
        <div className="contact-info">
          <p className="contact-description">
            Please feel free to contact us with any questions or inquiries you may have.
          </p>
          <p className="contact-details">
            Email: <span className="contact-email">mbrrkn@gmail.com</span> <br />
            Phone: <span className="contact-phone">123-456-7890</span>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Contact;
