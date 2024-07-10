import React, { useState } from 'react';
import './AjouterActualité.css';

const AjouterActualite = ({ ajouterActualite }) => {
  const [title, setTitle] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [image, setImage] = useState(null);
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState('16');
  const [isBold, setIsBold] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (title.trim() === '' || paragraph.trim() === '') {
      alert('Veuillez entrer un titre et un paragraphe !');
      return;
    }
    
    const style = {
      color: textColor,
      fontSize: `${fontSize}px`,
      fontWeight: isBold ? 'bold' : 'normal'
    };

    ajouterActualite(title.trim(), paragraph.trim(), image, style);
    setTitle('');
    setParagraph('');
    setImage(null);
    setTextColor('#000000');
    setFontSize('16');
    setIsBold(false);
  };

  return (
    <div className="ajouter-actualite">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Entrer le titre de l'actualité"
        className="actualite-input"
      />
      <textarea
        value={paragraph}
        onChange={(e) => setParagraph(e.target.value)}
        placeholder="Entrer le contenu de l'actualité"
        rows="5"
        className="actualite-input"
      />
      <div className="formatting-options">
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          title="Choisir la couleur du texte"
        />
        <select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          title="Choisir la taille du texte"
        >
          {[12, 14, 16, 18, 20, 24].map(size => (
            <option key={size} value={size}>{size}px</option>
          ))}
        </select>
        <button
          onClick={() => setIsBold(!isBold)}
          className={isBold ? 'active' : ''}
          title="Mettre en gras"
        >
          B
        </button>
      </div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange}
        className="image-input"
      />
      {image && <img src={image} alt="Aperçu" className="image-preview" />}
      <button onClick={handleSubmit} className="submit-button">Ajouter Actualité</button>
    </div>
  );
};

export default AjouterActualite;