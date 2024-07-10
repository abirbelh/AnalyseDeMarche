import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Intro from '../Components/Intro';
import RESSL from '../Components/RESSL';
import RESSR from '../Components/RESSR';
import ListeActualite from '../Components/Admin/ListeActualité';
import ScrollReveal from '../Components/ScrollReveal';
import './Home.css';

function Home() {
    const [actualites, setActualites] = useState([]);

    useEffect(() => {
        const storedActualites = JSON.parse(localStorage.getItem('actualites')) || [];
        setActualites(storedActualites);
    }, []);

    return (
        <div className="home-container">
            <ScrollReveal>
                <div className='header-container'>
                    <Header/>
                </div>
            </ScrollReveal>

            <ScrollReveal>
                <div className='intro-container'>
                    <Intro/>
                </div>
            </ScrollReveal>
            
            <ScrollReveal>
                <div className="actualites-container">
                    <h2>Actualités Récentes</h2>
                    <ListeActualite 
                        actualites={actualites} 
                        showDeleteButton={false} 
                        isHomePage={true}
                    />
                </div>
            </ScrollReveal>

            <div className="Line"></div>

            <ScrollReveal>
                <div className="ressourcel-container">
                    <RESSL/>
                </div>
            </ScrollReveal>

            <ScrollReveal>
                <div className="ressource2-container">
                    <RESSR/>
                </div>
            </ScrollReveal>
        </div>
    );
}

export default Home;