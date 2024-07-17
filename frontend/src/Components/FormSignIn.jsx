import React, { useState } from 'react';
import './FormSignIn.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import google from './google.png'
import fcb from './fcb.png'

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
        nomUtilisateur: username,
        email,
        motDePasse: password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Une erreur est survenue.');
      } else {
        setError('Une erreur de connexion est survenue.');
      }
    }
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
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="button2">créer un compte</button>

        <div className="social1-container">
         
          <div className="line"></div>
           <p className="social1-text">connectez avec vos réseaux sociaux</p>
          <div className="social1">
            <Link to="/index" className="go2">
              <img src={google} alt="Google" className="button-icon" />
            </Link>
            <Link to="/index" className="fb2">
              <img src={fcb} alt="Facebook" className="button-icon" />
            </Link>
          </div>
        </div>


      </form>
    </div>
  );
}

export default FormSignIn;
