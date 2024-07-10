import React from 'react';
import './Form.css';
import { Link } from 'react-router-dom';

function Form() {
    return (
        <div className="background">

            <form>
                <h3>Connexion</h3>
                <label htmlFor="username" id='user1'>Nom Utilisateur</label>
                <input type="text" placeholder="nom utilisateur" id="username" />
                <label htmlFor="password">Mot de passe</label>
                <input type="password" placeholder="mot de passe" id="password" />
                <button>se connecter</button>
                <div className="VousNAvezPasDeCompteInscrivezVous">
                    <span>Vous n'avez pas de compte ?</span>
                    <span>&nbsp;</span>
                    <span><Link to='/signin'> Inscrivez-vous</Link></span>
                </div>

                <div className="social">
                    <div className="go">Google</div>
                    <div className="fb">Facebook</div>
                </div>
            </form>
        </div>
    );
}

export default Form;

