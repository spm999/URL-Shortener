import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');

  const shortenURL = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5172/url/shorten',
        { longURL }
      );
      setShortURL(response.data.shortURL);
    } catch (error) {
      console.error('Error shortening URL:', error.message);
    }
  };

  return (
    <div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/aboutus">About Us</a></li>
          <li><a href="/login">Login</a></li>
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

export default Home;
