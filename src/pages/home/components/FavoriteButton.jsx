import React, { useState, useEffect } from 'react';

const FavoriteButton = ({ productId, productName }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Verifica se o produto já está nos favoritos ao carregar
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some(fav => fav.id === productId));
  }, [productId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      // Remove dos favoritos
      const newFavorites = favorites.filter(fav => fav.id !== productId);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      // Adiciona aos favoritos
      favorites.push({ id: productId, name: productName });
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    
    setIsFavorite(!isFavorite);
  };

  return (
    <button 
      className={`favorite-button ${isFavorite ? 'active' : ''}`}
      onClick={toggleFavorite}
      aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
    </button>
  );
};

export default FavoriteButton; 