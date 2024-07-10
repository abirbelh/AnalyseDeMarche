// File: src/Components/FormSignIn.jsx

import React, { useState } from 'react';
import './FormSignIn.css';
import { Link, useNavigate } from 'react-router-dom';

function FormSignIn() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newUser = {
      username,
      email,
      password, // Note: In a real application, never store passwords in plain text
    };

    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Add new user
    const updatedUsers = [...existingUsers, newUser];
    
    // Save back to localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Clear form
    setUsername('');
    setEmail('');
    setPassword('');

    // Optionally, redirect to login page or show a success message
    alert('Compte créé avec succès!');
    navigate('/login'); // Adjust this route as needed
  };

  return (
    <div className="background1">
      <form className="form1" onSubmit={handleSubmit}>
        <label htmlFor="username" className="label1" id='user1'>Nom Utilisateur</label>
        <input 
          type="text" 
          placeholder="nom utilisateur" 
          className="input1" 
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="mail" className="label1" id='mail1'>Adresse Mail</label>
        <input 
          type="email" 
          placeholder="adresse mail" 
          className="input1" 
          id="mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password" className="label1">Mot de passe</label>
        <input 
          type="password" 
          placeholder="mot de passe" 
          className="input1" 
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="button2">créer un compte</button>
        
        <div className="social1">
          <div className="go1">Google</div>
          <div className="fb1">Facebook</div>
        </div>
      </form>
    </div>
  );
}

export default FormSignIn;



