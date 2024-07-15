import React from 'react';
import './Connexion.css';
import { Link } from 'react-router-dom';
import logo from './logo-talan.png';
import Form from '../Components/Form';

const Connexion = () => {
    return (
        <div id="header-wrapper1">
            <div id="header1" className="container1">
                <a href="/"><img src={logo} alt="Logo" id='logo1'/></a>
                <div id="menu1">
                    <ul>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/visualisation">Dashboard</Link></li>
                    </ul>
                </div>
            </div>

            <div id="banner-wrapper1">
                <div id="banner1" className="container1">
                    <div className="title1">
                        <h2>Connectez-vous Sur votre Compte !</h2>
                        <span className="byline1">Connectez-vous à votre compte sur notre site web pour accéder à notre modèle IA exclusif.</span>
                    </div>

                    <div className='form-connexion'>
                        <Form />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Connexion;
