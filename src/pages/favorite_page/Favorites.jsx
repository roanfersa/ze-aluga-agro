import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderComponent from "../../core/components/header_component";
import FooterComponent from "../../core/components/footer_component";
import "../../styles/css/favorites.css";
import "../../styles/css/custom_styles.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = () => {
      setLoading(true);
      try {
        const storedFavorites = JSON.parse(
          localStorage.getItem("favorites") || "[]"
        );
        setFavorites(storedFavorites);
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
    window.addEventListener("storage", loadFavorites);

    return () => {
      window.removeEventListener("storage", loadFavorites);
    };
  }, []);

  const removeFavorite = (productId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== productId);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <>
      <HeaderComponent />
      <div className="favorites-page">
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">
              <h1 className="mb-0 font-family-primary text-custom-primary">
                Meus Favoritos
              </h1>
              <span className="ms-3 badge bg-custom-secondary text-custom-primary">
                {favorites.length} {favorites.length === 1 ? "item" : "itens"}
              </span>
            </div>
            <Link
              to="/"
              className="btn outline-custom-primary text-custom-primary"
            >
              <i className="bi bi-arrow-left me-2"></i>
              Voltar para Home
            </Link>
          </div>

          {loading ? (
            <div className="d-flex justify-content-center py-5">
              <div className="spinner-border text-custom-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          ) : favorites.length > 0 ? (
            <div className="favorites-grid">
              {favorites.map((product) => (
                <div key={product.id} className="favorite-card">
                  <div className="favorite-card-image">
                    <img
                      src={
                        product.image ||
                        `https://placehold.co/300x200/003321/DCFFD7/png?text=${encodeURIComponent(
                          product.name.charAt(0)
                        )}`
                      }
                      alt={product.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/300x200/003321/DCFFD7/png?text=${encodeURIComponent(
                          product.name.charAt(0)
                        )}`;
                      }}
                    />
                    <button
                      className="remove-favorite"
                      onClick={() => removeFavorite(product.id)}
                      aria-label="Remover dos favoritos"
                    >
                      <i className="bi bi-heart"></i>
                    </button>
                  </div>
                  <div className="favorite-card-content">
                    <span className="badge bg-custom-secondary text-custom-primary fs-custom-category mb-2">
                      {product.category}
                    </span>
                    <h3 className="font-family-primary text-custom-primary fw-bold">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="description">{product.description}</p>
                    )}
                    <Link
                      to={`/produto/${product.id}`}
                      className="btn bg-custom-primary text-custom-secondary w-100 mt-2"
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
              <h2 className="font-family-primary text-custom-primary">
                Você ainda não tem favoritos
              </h2>
              <p className="text-muted">
                Explore nossos produtos e adicione itens aos seus favoritos!
              </p>
              <Link
                to="/"
                className="btn bg-custom-primary text-custom-secondary"
              >
                Explorar Produtos
                <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
          )}
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default Favorites;
