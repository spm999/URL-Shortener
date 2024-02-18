import React, { useState } from 'react';
import axios from 'axios';

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
        <li><a href="/">Home</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/aboutus">About Us</a></li>
        <li><a href="/login">Login</a></li>

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
