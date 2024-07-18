import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GestionUser.css';
import { useNavigate } from 'react-router-dom';

const GestionUser = () => {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newUser, setNewUser] = useState({ nomUtilisateur: '', email: '', motDePasse: '' });
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/utilisateurs/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`/api/utilisateurs/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(users.filter(user => user._id !== id));
                console.log('User deleted successfully!');
            } catch (error) {
                console.error('Error deleting user:', error);
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            }
        }
    };

    const addUser = async (e) => {
        e.preventDefault();
        if (newUser.nomUtilisateur && newUser.email && newUser.motDePasse) {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/utilisateurs/addUser', newUser, {
              headers: { Authorization: `Bearer ${token}` }
            });
      
            // Assuming response.data directly contains the new user object
            const newUserResponse = response.data.user; // Adjust according to your backend response structure
      
            // Update users state with the new user
            setUsers([...users, newUserResponse]);
      
            // Clear the newUser state
            setNewUser({ nomUtilisateur: '', email: '', motDePasse: '' });
      
            // Hide the form
            setShowForm(false);
      
            console.log('User added successfully!');
          } catch (error) {
            console.error('Error adding user:', error);
            if (error.response) {
              if (error.response.status === 409) {
                alert('User with this nomUtilisateur or email already exists.');
              } else if (error.response.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
              } else if (error.response.status === 500 && error.response.data.error.includes('duplicate key error')) {
                alert('User with this email already exists.'); // Specific message for duplicate email
              } else {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
              }
            }
          }
        }
      };
      
      
      
    const goBack = () => {
        setShowForm(false);
    };

    return (
        <div className="container">
            <h2>Gestion des Utilisateurs</h2>
            <button onClick={() => setShowForm(!showForm)} className="add-btn">
                {showForm ? 'Annuler' : 'Ajouter un utilisateur'}
            </button>
            {showForm && (
                <div className="add-user-box">
                    <h3>Ajouter un utilisateur</h3>
                    <form onSubmit={addUser} className="add-user-form">
                        <input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            value={newUser.nomUtilisateur}
                            onChange={(e) => setNewUser({ ...newUser, nomUtilisateur: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, motDePasse: e.target.value })}
                        />
                        <div className="form-buttons">
                            <button type="submit" className="submit-btn">Ajouter</button>
                            <button type="button" onClick={goBack} className="cancel-btn">Retour</button>
                        </div>
                    </form>
                </div>
            )}
            <ul className="responsive-table">
                <li className="table-header">
                    <div className="col col-1">ID</div>
                    <div className="col col-2">Nom Utilisateur</div>
                    <div className="col col-3">Adresse Mail</div>
                    <div className="col col-4">Actions</div>
                </li>
                {users.map((user, index) => (
                    <li className="table-row" key={user._id}>
                        <div className="col col-1" data-label="ID">{index + 1}</div>
                        <div className="col col-2" data-label="Nom Utilisateur">{user.nomUtilisateur}</div>
                        <div className="col col-3" data-label="Adresse Mail">{user.email}</div>
                        <div className="col col-4" data-label="Actions">
                            <button onClick={() => deleteUser(user._id)} className="delete-btn">Supprimer</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GestionUser;
