import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Liens rapides</h4>
          <ul>
            <li>
              {isHome ? (
                <a href="#intro">À propos</a>
              ) : (
                <Link to="/#intro">À propos</Link>
              )}
            </li>
            <li>
              {isHome ? (
                <a href="#actualites">Actualités</a>
              ) : (
                <Link to="/#actualites">Actualités</Link>
              )}
            </li>
            <li>
              {isHome ? (
                <a href="#ressources">Ressources</a>
              ) : (
                <Link to="/#ressources">Ressources</Link>
              )}
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Technologies Utilisées</h4>
          <ul>
            <li><a href="https://powerbi.microsoft.com/" target="_blank" rel="noopener noreferrer">
        <i className="fas fa-chart-line"></i> Power BI
      </a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} Talan. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;