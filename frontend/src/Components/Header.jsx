import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './logo-talan.png';

const Header = () => {
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
                } catch (error) {
                    console.error('Error fetching user info:', error);
                    if (error.response && error.response.status === 401) {
                        navigate('/login');
                    }
                }
            }
        };

        fetchUserInfo();
    }, [navigate]);

    return (
        <div id="header-wrapper">
            <div id="header" className="container">
                <a href="/"><img src={logo} alt="Logo" id='logo' /></a>
                <div id="menu">
                    <ul>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/visualisation">Dashboard</Link></li>
                        {user ? (
                            <>
                                <li>Bienvenue, {user.nomUtilisateur}</li>
                                {user.role === 'admin' && (
                                    <li><Link to="/admin">Admin Panel</Link></li>
                                )}
                            </>
                        ) : (
                            <li className="active"><Link to="/login">Connexion</Link></li>
                        )}
                    </ul>
                </div>
            </div>
            <div id="banner-wrapper">
                <div id="banner" className="container">
                    <div className="title">
                        <h2>Votre Guide Pour Les Entreprises Françaises et L'analyse du Marché</h2>
                        <span className="byline">Façonnez demain en comprenant aujourd'hui</span>
                    </div>
                    <ul className="actions">
                        <li><Link to="/model" className="button">Explorez Notre Modèle IA</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
