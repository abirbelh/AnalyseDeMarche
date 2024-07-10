// ListeActualité.jsx
import React from 'react';
import Actualite from './Actualité';

const ListeActualité = ({ actualites, supprimerActualite, showDeleteButton, isHomePage }) => {
  return (
    <ul>
      {actualites.map((actualite, index) => (
        <Actualite
          key={index}
          title={actualite.title}
          paragraph={actualite.paragraph}
          image={actualite.image}
          style={actualite.style}
          onDelete={() => supprimerActualite(index)}
          showDeleteButton={showDeleteButton}
          isHomePage={isHomePage}
        />
      ))}
    </ul>
  );
};

export default ListeActualité;