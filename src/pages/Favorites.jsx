import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/css/favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

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

  const removeFavorite = (productId) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== productId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div className="favorites-page">
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <h1 className="mb-0">Meus Favoritos</h1>
            <span className="ms-3 text-muted">({favorites.length} {favorites.length === 1 ? 'item' : 'itens'})</span>
          </div>
          <Link to="/" className="btn btn-outline-primary">
            <i className="bi bi-arrow-left me-2"></i>
            Voltar para Home
          </Link>
        </div>

        {favorites.length > 0 ? (
          <div className="favorites-grid">
            {favorites.map((product) => (
              <div key={product.id} className="favorite-card">
                <div className="favorite-card-image">
                  <img 
                    src={product.image || `https://placehold.co/300x200/003321/DCFFD7/png?text=${encodeURIComponent(product.name.charAt(0))}`}
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/300x200/003321/DCFFD7/png?text=${encodeURIComponent(product.name.charAt(0))}`;
                    }}
                  />
                  <button
                    className="remove-favorite"
                    onClick={() => removeFavorite(product.id)}
                    aria-label="Remover dos favoritos"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
                <div className="favorite-card-content">
                  <h3 className="text-truncate">{product.name}</h3>
                  <p className="category mb-2">{product.category}</p>
                  {product.description && (
                    <p className="description">{product.description}</p>
                  )}
                  <Link 
                    to={`/produto/${product.id}`} 
                    className="btn btn-primary w-100"
                  >
                    Ver Detalhes
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="favorites-empty">
            <i className="bi bi-heart"></i>
            <h2>Nenhum item favorito ainda</h2>
            <p className="text-muted">Explore nossos produtos e adicione itens aos seus favoritos!</p>
            <Link to="/" className="btn btn-primary">
              Explorar Produtos
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites; 