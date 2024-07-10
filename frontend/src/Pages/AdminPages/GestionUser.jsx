import React, { useState, useEffect } from 'react';
import './GestionUser.css';

const GestionUser = () => {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    const deleteUser = (index) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            const updatedUsers = users.filter((_, i) => i !== index);
            setUsers(updatedUsers);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
        }
    };

    const addUser = (e) => {
        e.preventDefault();
        if (newUser.username && newUser.email && newUser.password) {
            const updatedUsers = [...users, newUser];
            setUsers(updatedUsers);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            setNewUser({ username: '', email: '', password: '' });
            setShowForm(false);
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

                           id='mail'
                            type="email"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            className="black-placeholder"
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
                    <li className="table-row" key={index}>
                        <div className="col col-1" data-label="ID">{index + 1}</div>
                        <div className="col col-2" data-label="Nom Utilisateur">{user.username}</div>
                        <div className="col col-3" data-label="Adresse Mail">{user.email}</div>
                        <div className="col col-4" data-label="Actions">
                            <button onClick={() => deleteUser(index)} className="delete-btn">Supprimer</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GestionUser;
