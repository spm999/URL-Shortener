import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

import '../../assets/main.css'; // Import your CSS file

const Home = () => {
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');

  const shortenURL = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'https://url-shortener-tatk.onrender.com/shorten',
        { longURL }
      );
      setShortURL(response.data.shortURL);
    } catch (error) {
      console.error('Error shortening URL:', error.message);
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
      <h1>URL Shortener</h1>
      <form onSubmit={shortenURL}>
        <input
          type="text"
          value={longURL}
          onChange={(e) => setLongURL(e.target.value)}
          className="input-field"
          placeholder="Enter long URL"
          required  // This attribute enforces that the input field is filled
        />
        <div className='shorting-button'>
          <button type="submit" className="shorten-button">Shorten URL</button>
          {shortURL && <p className="shortened-url">Shortened URL: <a href={shortURL} target="_blank" rel="noopener noreferrer">{shortURL}</a></p>}
        </div>
      </form>
    </div>

  );
};

export default Home;
