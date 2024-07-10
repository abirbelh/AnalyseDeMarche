import React from 'react';
import './RESSL.css'
import insee from './insee 1.png'



function RESSL() {
    return (
        <div>

            <div className="NosRessources">Nos Ressouces</div>
            <div className="Rectangle5">

                <div className="div1">
                    
                    <div className="InstitutNationalDeLaStatistiqueEtDesTudesConomiquesInsee"> Institut national de la statistique et des études économiques - INSEE </div>
                   <div className="LInseeDescription">  L'INSEE est la source officielle des statistiques sur l'économie française. L'INSEE fournit une vaste gamme de données sur les entreprises françaises, la démographie des entreprises, le marché du travail et les indices de production. En accédant à ces précieuses informations, notre plateforme offre une vue détaillée et précise des différents secteurs économiques en France. </div>
                </div>



                <div className="div2">

                     <img className="Insee1" src={insee} alt="INSEE Logo" />

                </div>


            </div>



        </div>
    );
}
export default RESSL;