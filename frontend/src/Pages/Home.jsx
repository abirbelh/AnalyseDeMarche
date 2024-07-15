import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Header from '../Components/Header';
import Intro from '../Components/Intro';
import RESSL from '../Components/RESSL';
import RESSR from '../Components/RESSR';
import ListeActualite from '../Components/Admin/ListeActualité';
import ScrollReveal from '../Components/ScrollReveal';
import './Home.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Home() {
    const [actualites, setActualites] = useState([]);

    useEffect(() => {
        const storedActualites = JSON.parse(localStorage.getItem('actualites')) || [];
        setActualites(storedActualites);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

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
                    <h2>ACTUALITÉS ET ARTICLES</h2>
                    <h4> Toujours à jour avec nos dernières actualités et articles</h4>
                    <Slider {...settings}>
                        {actualites.map((actualite, index) => (
                            <div key={index} className="actualite-slide">
                                <ListeActualite 
                                    actualites={[actualite]} 
                                    showDeleteButton={false} 
                                    isHomePage={true}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </ScrollReveal>

            <div className="Line"></div>
            <div className='ressources'>
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
        </div></div>
    );
}

export default Home;
