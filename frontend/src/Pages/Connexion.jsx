import React from 'react';
import './Connexion.css';
import { Link } from 'react-router-dom';
import logo from './logo-talan.png';
import Form from '../Components/Form';

const Connexion = () => {
    return (
        <div id="header-wrapper2">
            <div id="header2" className="container2">
                <a href="/"><img src={logo} alt="Logo" id='logo2'/></a>
                <div id="menu2">
                    <ul>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/visualisation">Dashboard</Link></li>
                    </ul>
                </div>
            </div>

            <div id="banner-wrapper2">
                <div id="banner2" className="container2">
                    <div className="title2">
                        <h2>Connectez-vous Sur votre Compte !</h2>
                        <span className="byline2">Connectez-vous à votre compte sur notre site web pour accéder à notre modèle IA exclusif.</span>
                    </div>

                    <div className='form-connexion2'>
                        <Form />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Connexion;
