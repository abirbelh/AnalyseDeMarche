import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProfileManagement.css';

const ProfileManagement = () => {
  const [user, setUser] = useState({ nomUtilisateur: '', email: '' });
  const [newNomUtilisateur, setNewNomUtilisateur] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [motDePasseConfirme, setMotDePasseConfirme] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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
          setNewNomUtilisateur(response.data.nomUtilisateur); // Set existing nomUtilisateur
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (newPassword !== motDePasseConfirme) {
        setErrorMessage('Les mots de passe ne correspondent pas.');
        return;
    }
    
    const token = localStorage.getItem('token');
    try {
        // Create an object for the updated data
        const updatedData = {
            nomUtilisateur: newNomUtilisateur
        };

        // Only add motDePasse if it's not empty
        if (newPassword) {
            updatedData.motDePasse = newPassword;
        }

        const response = await axios.put('http://localhost:3001/api/utilisateurs/me', updatedData, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setUser(response.data);
        setSuccessMessage('Mise à jour réussie!');
        setErrorMessage(null);
        alert('Profil mis à jour avec succès !');
    } catch (error) {
        console.error('Error updating profile:', error);
        alert("Erreur lors de la mise à jour du profil !");
    }
};

  const handleBackToHome = () => {
    navigate('/');
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div  className="profile-background">
    <div className="profile-management-container">
      <h1>Gestion du Profil</h1>
      <form className='ProfilForm' onSubmit={handleUpdate}>
        <label htmlFor="nomUtilisateur">Nom d'utilisateur :</label>
        <input
          type="text"
          id="nomUtilisateur"
          value={newNomUtilisateur}
          onChange={(e) => setNewNomUtilisateur(e.target.value)}
        />

        <label htmlFor="email">Email :</label>
        <input type="email" id="email" value={user.email} readOnly />

        <label htmlFor="password">Nouveau mot de passe :</label>
        <input
          type="password"
          id="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Laisser vide pour ne pas changer"
        />
        <label htmlFor="password">Confirmez le mot de passe</label>
        <input
          type="password"
          value={motDePasseConfirme}
          onChange={(e) => setMotDePasseConfirme(e.target.value)}
          placeholder="Laisser vide pour ne pas changer"
        />
        <div>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
        </div>
        <div className="profile-buttons">
          <button type="submit" className="update-btn">Mettre à jour</button>
          <button type="button" className="home-btn" onClick={handleBackToHome}>
            Retour à l'accueil
          </button>
        </div>
      </form>
    </div>
</div>
  );
};

export default ProfileManagement;
