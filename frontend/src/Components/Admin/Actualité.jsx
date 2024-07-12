import React from 'react';
import './Actualité.css';

const Actualité = ({ title, paragraph, image, file, onDelete, showDeleteButton, isHomePage }) => {
  return (
    <div className="actualite">
      {image && <img src={image} alt={title} className="actualite-image" />}
      <h2 className="actualite-title">{title}</h2>
      <p className="actualite-paragraph">{paragraph}</p>
      {file && (
        <a href={file.url} download={file.name} className="download-button">
          Télécharger le fichier
        </a>
      )}
      {showDeleteButton && (
        <button onClick={onDelete} className="delete-button">
          Supprimer ce poste
        </button>
      )}
    </div>
  );
};

export default Actualité;