// src/components/Dashboard.tsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {currentUser?.email}</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default Dashboard;