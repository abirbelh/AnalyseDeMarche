import React from 'react';
import './SignIn.css'
import logo from './logo-talan.png'
import { Link } from 'react-router-dom';
import FormSignIn from '../Components/FormSignIn';

function SignIn() {
  return (
    <div id="header-wrapper2">
      <div id="header2" className="container2">
        <a href="/"><img src={logo} alt="Logo"  id='logo2'/></a>
        <div id="menu2">
          <ul>
            <li><Link to="/">Acceuil</Link></li>                                                          
            <li><Link to="/visualisation" >Dashbord</Link></li>
            <li className="active2"><Link to="/login">Connexion</Link></li>
          </ul>
        </div>
      </div>

      <div id="banner-wrapper2">
        <div id="banner2" className="container2">
          <div className="title2">
            <h2> Créer un compte </h2>
            <span className="byline2"> Explorez nos fonctionnalités exclusives dès maintenant en créant votre compte !</span>
          </div>
          <div className='form-container2'><FormSignIn/></div>                   
        </div>
      </div>
    </div>
  );
}

export default SignIn;