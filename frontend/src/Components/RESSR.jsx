import React from 'react';
import './RESSR.css';
import alpha from './images.png';

function RESSR() {
    return (
        <div>
            <div className="Rectangle6">
                <div className="content">
                    <img className="Khir1" src={alpha} alt="Alpha Vantage" />
                    <div className="text-container">
                        <div className="SiteWebAlphaVintage">companies market cap</div>
                        <div className="AlphaVantageDescription">
                        Companies Market Cap est une plateforme dédiée à la fourniture d'informations complètes sur la capitalisation boursière des entreprises à l'échelle mondiale. Ce site permet aux investisseurs, analystes financiers et passionnés de finance de consulter et d'analyser les valeurs totales des entreprises cotées en bourse. En calculant la capitalisation boursière, qui est le produit du prix de l'action par le nombre total d'actions en circulation, le site offre une vue d'ensemble précise de la taille et de l'importance des entreprises sur le marché financier.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RESSR;
