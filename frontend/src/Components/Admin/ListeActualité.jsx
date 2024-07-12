import React from 'react';
import Actualite from './Actualité';

const ListeActualité = ({ actualites, supprimerActualite, showDeleteButton, isHomePage }) => {
  return (
    <div className="actualites-list">
      {actualites.map((actualite, index) => (
        <Actualite
          key={index}
          title={actualite.title}
          paragraph={actualite.paragraph}
          image={actualite.image}
          file={actualite.file}
          onDelete={() => supprimerActualite(index)}
          showDeleteButton={showDeleteButton}
          isHomePage={isHomePage}
        />
      ))}
    </div>
  );
};

export default ListeActualité;