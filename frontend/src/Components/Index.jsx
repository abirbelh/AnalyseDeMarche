import React from 'react';
import talan from './logo-talan.png'
import './Index.css'


function Index() {
    return (
        <div className="card">

           <img src={talan} alt="Logo" />
            <div className='card1'>
                 <h1>Site En Construction</h1>
            <p>Notre site est actuellement en cours de développement. Merci de votre patience !</p>
</div>


        </div>
    );
}
export default Index;