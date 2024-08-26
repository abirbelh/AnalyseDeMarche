import React, { useEffect, useState } from 'react';
import './DashboardHeader.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo-talan.png';
import axios from 'axios';

const DashboardHeader = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:3001/api/utilisateurs/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user info:', error);
          if (error.response && error.response.status === 401) {
            navigate('/login');
          }
        }
      }
      setLoading(false);
    };

    fetchUserInfo();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const renderAuthButton = () => {
    if (loading) return null; // Don't render anything while loading

    return user ? (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button id='deconnexion' onClick={handleLogout}><span>Déconnexion</span></button> 
        <button id='deconnexion' title='gestion du profile'  onClick={() => navigate('/profile')} >Profil</button>      
      </div>
      
    ) : (
      <Link to="/login">Connexion</Link>
    );
  };

  return (
    <div id="headerWrapper">
      <div id="header" className="container">
        <a href="/"><img src={logo} alt="Logo" id='logo' /></a>
        <div id="menuu">
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/visualisation">Dashboard</Link></li>
            <li><Link to="/ListeEntreprises">Entreprises</Link></li>
            {user && user.role === 'admin' && (
              <li><Link to="/admin">Admin Panel</Link></li>
            )}
            <li className="active">
              {renderAuthButton()}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;