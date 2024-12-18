import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const TopRightNav = () => {
  const location = useLocation();

  // Hide buttons on login and signup pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <div 
      style={{
        position: 'absolute', 
        top: '10px', 
        right: '10px', 
        display: 'flex', 
        gap: '10px'
      }}
    >
      <Link 
        to="/login" 
        style={{
          padding: '8px 16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          display: 'inline-block'
        }}
      >
        Login
      </Link>
      <Link 
        to="/signup" 
        style={{
          padding: '8px 16px',
          backgroundColor: '#2196F3',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          display: 'inline-block'
        }}
      >
        Signup
      </Link>
    </div>
  );
};

export default TopRightNav;
