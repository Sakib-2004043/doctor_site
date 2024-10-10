"use client"
import React, { useState } from 'react';
import "./signup.css"
import connectDB from '../database/connect';

const Registration: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [nid, setNid] = useState('');
  const [address, setAddress] = useState('');
  const [profession, setProfession] = useState('');

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Simple validation for password match
    if (password !== confirmPassword) {
      console.error("Passwords don't match");
      return;
    }
  
    // Create an object with the registration data
    const registrationData = {name,email,password,phone,nid,address,profession};
  
    try {
      // Send data to the API route
      const response = await fetch('/api/userReg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });
  
      // Handle the response from the server
      const data = await response.json();
      if (response.ok) {
        console.log("Registration successful:", data);
        // You can redirect or show a success message here
      } else {
        console.error("Registration failed:", data.message);
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
    }
  };
  

  return (
    <div className="registration-container">
      <h1 className="registration-title">Registration Form</h1>
      <form className="registration-form" onSubmit={handleRegistration}>
        <div className="registration-input-group">
          <label htmlFor="name" className="registration-label">Full Name:</label>
          <input
            type="text"
            id="name"
            className="registration-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="registration-input-group">
          <label htmlFor="email" className="registration-label">Email:</label>
          <input
            type="email"
            id="email"
            className="registration-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="registration-input-group">
          <label htmlFor="phone" className="registration-label">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            className="registration-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="registration-input-group">
          <label htmlFor="nid" className="registration-label">National ID (NID):</label>
          <input
            type="text"
            id="nid"
            className="registration-input"
            value={nid}
            onChange={(e) => setNid(e.target.value)}
          />
        </div>
        <div className="registration-input-group">
          <label htmlFor="address" className="registration-label">Address:</label>
          <input
            type="text"
            id="address"
            className="registration-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="registration-input-group">
          <label htmlFor="profession" className="registration-label">Profession:</label>
          <input
            type="text"
            id="profession"
            className="registration-input"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            required
          />
        </div>
        <div className="registration-input-group">
          <label htmlFor="password" className="registration-label">Password:</label>
          <input
            type="password"
            id="password"
            className="registration-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="registration-input-group">
          <label htmlFor="confirmPassword" className="registration-label">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            className="registration-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="registration-button">Register</button>
      </form>
    </div>
  );
};

export default Registration;
