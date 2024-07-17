import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GestionUser.css';

const GestionUser = () => {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get('/api/utilisateurs');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`/api/utilisateurs/${id}`);
                setUsers(users.filter(user => user._id !== id));
                console.log('User deleted successfully!');
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const addUser = async (e) => {
        e.preventDefault();
        if (newUser.username && newUser.email && newUser.password) {
            try {
                const response = await axios.post('/api/utilisateurs/signup', newUser);
                setUsers([...users, response.data.user]);
                setNewUser({ username: '', email: '', password: '' });
                setShowForm(false);
                console.log('User added successfully!');
            } catch (error) {
                console.error('Error adding user:', error);
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
                            value={newUser.username}
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
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
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
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
