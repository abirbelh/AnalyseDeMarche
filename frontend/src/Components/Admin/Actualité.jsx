// Actualité.jsx
import React from 'react';
import './Actualité.css';

const Actualité = ({ title, paragraph, image, style, onDelete, showDeleteButton, isHomePage }) => {
  const pageClass = isHomePage ? 'home-page' : 'admin-page';

  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce poste ?")) {
      onDelete();
    }
  };

  return (
    <li className={`actualite ${pageClass}`}>
      <div className='all'>
        <div className='textpic'>
          <div className="actualite-text">
            <h2 className="actualite-title">{title}</h2>
            <p className="actualite-paragraph" style={style}>{paragraph}</p>
          </div>
          <div>{image && <img src={image} alt="Actualité" className="actualite-image" />}</div>
          {showDeleteButton && <button onClick={handleDelete} className="delete-button">Supprimer ce poste</button>}
        </div>
       </div>
    </li>
  );
};

export default Actualité;