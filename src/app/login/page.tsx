"use client"
import React, { useState } from 'react';
import './logIn.css';

const LogIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nid, setNid] = useState('');  // New NID state

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Basic validation (you can expand this as needed)
    if (!email || !password || !nid) {
      console.error('Please fill out all fields.');
      return;
    }
  
    // Create the login payload
    const loginData = {email,password,nid};
  
    try {
      // Make the POST request to the backend
      const response = await fetch('/api/userReg', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData), // Send the data as a JSON string
      });
  
      // Check if the login was successful
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
  
        // Optionally, redirect or do something with the response data
        window.location.href = "/home"; // Example redirection to a dashboard
  
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
        alert('Login failed: ' + errorData.message); // Show the error to the user
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login');
    }
  };
  

  return (
    <div className="login-container">
      <h1 className="login-title">Log In</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-input-group">
          <label htmlFor="email" className="login-label">Email:</label>
          <input
            type="email"
            id="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-input-group">
          <label htmlFor="nid" className="login-label">National ID (NID):</label>
          <input
            type="text"
            id="nid"
            className="login-input"
            value={nid}
            onChange={(e) => setNid(e.target.value)}
            required
          />
        </div>
        <div className="login-input-group">
          <label htmlFor="password" className="login-label">Password:</label>
          <input
            type="password"
            id="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="login-button">Log In</button>
      </form>
    </div>
  );
};

export default LogIn;
