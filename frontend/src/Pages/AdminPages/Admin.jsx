import React, { useState, useEffect } from 'react';
import './Admin.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
    const [user, setUser] = useState(null);
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
                    if (response.data.role !== 'admin') {
                        navigate('/');
                    }
                } catch (error) {
                    console.error('Error fetching user info:', error);
                    if (error.response && error.response.status === 401) {
                        localStorage.removeItem('token');
                        setUser(null);
                        navigate('/login');
                    }
                }
            } else {
                navigate('/login');
            }
        };

        fetchUserInfo();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <div id="header-wrapper1">
            <div id="header1" className="container1">
                
            </div>
            <div id="banner-wrapper1">
                <div id="banner1" className="container1">
                    <div className="title1">
                        <h2>Bienvenue dans le panneau d'administration!</h2>
                        <span className="byline1">Utilisez les pages de gestion pour superviser les activités et les utilisateurs</span>
                    </div>
                    <ul className="actions1">
                        <div className='b'>
                            <div>
                                <li><Link to="/admin/gestion/user" className="button1">Gestion des Utilisateurs</Link></li>
                                <li><Link to="/admin/gestion/actualité" className="button1">Gestion des Actualités</Link></li>
                            </div>
                            <div>
                                <button className='glowing-btn' onClick={handleLogout}>
                                    <span className='glowing-txt'>Déconnexion</span>
                                </button>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Admin;
