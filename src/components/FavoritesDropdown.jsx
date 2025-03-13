import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const FavoritesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const loadFavorites = () => {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(storedFavorites);
    };

    loadFavorites();
    window.addEventListener('storage', loadFavorites);

    return () => {
      window.removeEventListener('storage', loadFavorites);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const removeFavorite = (productId) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== productId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div className="favorites-dropdown" ref={dropdownRef}>
      <button 
        className="btn btn-link" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Favoritos"
      >
        <i className="bi bi-heart"></i>
        {favorites.length > 0 && (
          <span className="badge bg-danger">{favorites.length}</span>
        )}
      </button>

      {isOpen && (
        <div className="favorites-menu">
          <div className="favorites-header">
            <h6 className="mb-0">Meus Favoritos</h6>
            <span className="text-muted">{favorites.length} item(s)</span>
          </div>
          
          {favorites.length > 0 ? (
            <div className="favorites-list">
              {favorites.map((product) => (
                <div key={product.id} className="favorite-item">
                  <Link to={`/produto/${product.id}`} className="favorite-link">
                    <h6>{product.name}</h6>
                  </Link>
                  <button
                    className="btn btn-link"
                    onClick={() => removeFavorite(product.id)}
                    aria-label="Remover dos favoritos"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-favorites">
              <i className="bi bi-heart"></i>
              <p>Nenhum item favorito ainda</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesDropdown; 