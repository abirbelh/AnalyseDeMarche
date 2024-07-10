import React from 'react';
import './RESS3.css';
import pic from './datagouv.png';

function RESS3() {
    return (
        <div className='container'>

            <div className="infoCard">


                <div className="infoText">

                    <div className="instituteTitle">Institut national de la statistique et des études économiques - INSEE</div>
                    <div className="instituteDescription">
                        L'INSEE est la source officielle des statistiques sur l'économie française. L'INSEE fournit une vaste gamme de données sur les entreprises françaises, la démographie des entreprises, le marché du travail et les indices de production. En accédant à ces précieuses informations, notre plateforme offre une vue détaillée et précise des différents secteurs économiques en France.</div>
                </div>


                <div className="infoImage">
                    <img className="instituteImage" src={pic} alt="datagouv Logo" />
                </div>


            </div>
        </div>
    );
}

export default RESS3;
