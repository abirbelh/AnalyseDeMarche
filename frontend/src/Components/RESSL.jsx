import React from 'react';
import './RESSL.css';
import yahoo from './YahooFinance.png';


function RESSL() {
    return (
        <div>
            <div className="NosRessources">Nos Ressources</div>
            <div className="Rectangle5">
                <div className="div1">
                    <div className="InstitutNationalDeLaStatistiqueEtDesTudesConomiquesInsee">
                    Yahoo Finance - Plateforme de Données Financières Globale
                    </div>
                    <div className="LInseeDescription">
                    Yahoo Finance offre des informations financières détaillées, des actualités économiques en temps réel, des analyses de marché et des outils de gestion de portefeuille. En tant que ressource de premier plan pour les investisseurs et les professionnels de la finance, Yahoo Finance fournit des données sur les actions, les obligations, les devises, les matières premières et les indices boursiers mondiaux. Explorez les tendances du marché et obtenez des insights précieux pour prendre des décisions d'investissement éclairées.
                    </div>
                </div>

                <div className="div2">
                    <img className="Insee1" src={yahoo} alt="Yahoo Finance Logo" />
                </div>
            </div>
        </div>
    );
}

export default RESSL;
