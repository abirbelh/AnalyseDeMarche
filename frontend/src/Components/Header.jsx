import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './logo-talan.png';
import hello from './hello.png';

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

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login'); // Navigate to login page after logout
    };

    return (
        <div id="header-wrapper">
            <div id="header" className="container">
                <a href="/"><img src={logo} alt="Logo" id='logo' /></a>
                <div id="menu">
                    <ul>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/visualisation">Dashboard</Link></li>
                        {user && user.role === 'admin' && (
                            <li><Link to="/admin">Admin Panel</Link></li>
                        )}
                        <li className="active">
                            {user ? (
                                <button id='deconnexion' onClick={handleLogout}><span>Déconnexion</span></button>
                            ) : (
                                <Link to="/login">Connexion</Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            <div id="banner-wrapper">
                <div id="banner" className="container">
                    {user && (
                        <div className="welcome">
                            <img src={hello} alt="Icon" className="icon" />
                            Bienvenue, {user.nomUtilisateur}
                        </div>
                    )}
                    <div className="titles">
                        <h2>Votre Guide Pour Les Entreprises Françaises et L'analyse du Marché</h2>
                        <span className="byline">Façonnez demain en comprenant aujourd'hui</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
