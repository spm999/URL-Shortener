import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Assuming you have a logout function similar to what's used in the Dashboard
  const logout = () => {
    // Clear token from localStorage
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUsername('');
    // Redirect to home page or login page
    // navigate('/');
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
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
      <div>
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget felis at purus finibus 
          convallis. Vivamus vel nisi vitae libero consectetur varius. Integer vel arcu risus. 
          Fusce interdum, tortor eu consectetur accumsan, purus ex blandit magna, at consequat mi 
          justo nec nulla. Sed non lorem quis libero blandit mattis. Nam in libero sed orci 
          fringilla scelerisque. Cras vestibulum lectus ac quam euismod, quis rutrum odio cursus. 
          Morbi a neque vitae metus pharetra scelerisque. Sed aliquet justo vel orci lobortis, 
          non egestas felis hendrerit. Nulla nec eros id sapien convallis suscipit in eu mauris. 
          Donec varius ultricies ante, sit amet elementum quam efficitur at. Quisque in eros nec 
          nisl fringilla fermentum nec quis justo. Cras ut volutpat leo, a elementum justo. 
          Integer pretium risus vitae libero consequat, at auctor enim scelerisque. Ut nec 
          sapien a purus luctus lobortis.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
