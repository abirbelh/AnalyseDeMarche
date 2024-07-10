import React, { useState, useEffect } from 'react';
import AjouterActualite from '../../Components/Admin/AjouterActualité';
import ListeActualite from '../../Components/Admin/ListeActualité';
import './GestionAdmin.css';

const GestionAdmin = () => {
  const [actualites, setActualites] = useState([]);

  useEffect(() => {
    const storedActualites = JSON.parse(localStorage.getItem('actualites')) || [];
    setActualites(storedActualites);
  }, []);

  const ajouterActualite = (title, paragraph, image, style) => {
    if (window.confirm("Êtes-vous sûr de vouloir ajouter cette nouvelle actualité ?")) {
      const nouvellesList = [...actualites, { title, paragraph, image, style, date: new Date() }];
      setActualites(nouvellesList);
      localStorage.setItem('actualites', JSON.stringify(nouvellesList));
    }
  };

  const supprimerActualite = (index) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette actualité ?")) {
      const nouvellesList = actualites.filter((_, i) => i !== index);
      setActualites(nouvellesList);
      localStorage.setItem('actualites', JSON.stringify(nouvellesList));
    }
  };

  return (
    <div className='card2'>
      <div className='card3'>
        <h1>Gérer les Actualités</h1>
        <p>Ajouter ou supprimer des actualités dans la page d'accueil</p>
        <fieldset>
          <AjouterActualite ajouterActualite={ajouterActualite} />
        </fieldset>
        <fieldset className='liste'>
          <ListeActualite
            actualites={actualites}
            supprimerActualite={supprimerActualite}
            showDeleteButton={true}
            isHomePage={false}
          />
        </fieldset>
      </div>
    </div>
  );
};

export default GestionAdmin;