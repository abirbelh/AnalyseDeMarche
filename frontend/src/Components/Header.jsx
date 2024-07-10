import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from './logo-talan.png'

const Header = () => {
    return (
        <div id="header-wrapper">
            <div id="header" class="container">
               
                    <a href="#"><img src={logo} alt="Logo"  id='logo'/></a>
              

                <div id="menu">
                    <ul>

                        <li><Link to="/">Acceuil</Link></li>
                        <li><Link to="/visualisation" >Dashbord</Link></li>
                        <li class="active"><Link to="/login">Connexion</Link></li>
                    </ul>
                </div>
            </div>

            <div id="banner-wrapper">
                <div id="banner" class="container">
                    <div class="title">
                        <h2> Votre Guide Pour Les Entreprises Françaises et L'analyse du Marché</h2>
                        <span class="byline"> Façonnez demain en comprenant aujourd'hui </span>
                    </div>
                    <ul class="actions">
                        <li><Link to="/model" class="button">Explorez Notre Modèle IA</Link></li>
                    </ul>
                </div>
            </div>
           
        </div>
    );
}

export default Header;
