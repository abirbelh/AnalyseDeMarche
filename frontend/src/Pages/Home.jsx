import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/Header';
import Intro from '../Components/Intro';
import RESSL from '../Components/RESSL';
import RESSR from '../Components/RESSR';
import ScrollReveal from '../Components/ScrollReveal';
import './Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from '../Components/Footer';

function Home() {
    const [actualites, setActualites] = useState([]);
    const location = useLocation();

    useEffect(() => {
        fetchActualites();

        // Scroll to the section if there's a hash in the URL
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    const fetchActualites = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/actualites');
            setActualites(response.data);
        } catch (error) {
            console.error('Error fetching actualites:', error);
        }
    };

    return (
        <div className="home-container">
            <ScrollReveal>
                <div className='header-container'>
                    <Header />
                </div>
            </ScrollReveal>
            <ScrollReveal>
                <div className='intro-container' id="intro">
                    <Intro />
                </div>
            </ScrollReveal>

            <ScrollReveal>
                <div className="actualites-container" id="actualites">
                    <h2>ACTUALITÉS ET ARTICLES</h2>
                    <h4>Toujours à jour avec nos dernières actualités et articles</h4>
                    <div className="actualites-list">
                        {actualites.map((actualite, index) => (
                            <div key={index} className="actualite-card">
                                <div className="actualite-date">{new Date(actualite.createdAt).toLocaleDateString()}</div>
                                <h3>{actualite.title}</h3>
                                <p>{actualite.content}</p>
                                {actualite.file && actualite.file.filename && (
                                    <a
                                        href={`http://localhost:3001/api/actualites/${actualite._id}/download`}
                                        download
                                        className="download-button"
                                    >
                                        <i className="fas fa-download"></i> {actualite.file.filename}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>
            <div className="Line"></div>
            <div className='ressources' id="ressources">
                <ScrollReveal>
                    <div className="ressourcel-container">
                        <RESSL />
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <div className="ressource2-container">
                        <RESSR />
                    </div>
                </ScrollReveal>
            </div>
            <Footer />
        </div>
    );
}

export default Home;