import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import '../styles/Header.css';

function Header({setIsAuthenticated}) {
  const navigate=useNavigate()
  const logoutHandler = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
   navigate('/login');
  };
  return (
    <header className="header">
      <h1>Blog App</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/create-blog">Create Blog</Link>
        <button onClick={logoutHandler}>Logout</button>
     
      </nav>
    </header>
  );
}

export default Header;
