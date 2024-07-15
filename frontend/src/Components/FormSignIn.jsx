import React, { useState } from 'react';
import './FormSignIn.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios: npm install axios

function FormSignIn() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/api/utilisateurs/signup', {
        username,
        email,
        password
      });

      if (response.data.success) {
        alert('Compte créé avec succès!');
        navigate('/login');
      } else {
        setError('Une erreur est survenue lors de la création du compte.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Une erreur est survenue.');
      } else {
        setError('Une erreur de connexion est survenue.');
      }
    }

    // Clear form
    setUsername('');
    setEmail('');
    setPassword('');
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
        {error && <p className="error-message" style={{color: 'red'}}>{error}</p>}
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