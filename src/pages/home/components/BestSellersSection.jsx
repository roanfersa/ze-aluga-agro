import React, { useState } from "react";
import useSellers from "../../../core/hooks/use_sellers_hook";
import "../../../styles/css/home.css";
import "../../../styles/css/custom_styles.css";

const SellerCard = ({ seller }) => {
  const defaultBanner = `https://placehold.co/800x200/003321/DCFFD7/png?text=${encodeURIComponent(
    seller.store_name
  )}`;
  const defaultProfile = `https://placehold.co/150x150/003321/DCFFD7/png?text=${encodeURIComponent(
    seller.name.charAt(0)
  )}`;

  return (
    <div className="seller-card">
      <img
        src={seller.banner || defaultBanner}
        alt={`${seller.store_name} banner`}
        className="banner"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultBanner;
        }}
      />
      <img
        src={seller.profile_picture || defaultProfile}
        alt={`${seller.name} profile`}
        className="profile-pic"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultProfile;
        }}
      />
      <div className="card-body">
        <div className="store-name">{seller.store_name}</div>
        <div className="seller-name">por {seller.name}</div>
        <div className="stats">
          <div>
            <span>{seller.product_count || 0}</span>
            Produtos
          </div>
          <div>
            <span>{seller.deals_count || 0}</span>
            Negócios
          </div>
          <div>
            <span>{seller.follower_count || 0}</span>
            Seguidores
          </div>
        </div>
        <button className="follow-button">Seguir</button>
      </div>
    </div>
  );
};

const BestSellersSection = ({ limit = 12 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 4;


  const { sellers, loading, error } = useSellers({
    topSellers: true,
    limit: limit,
  });


  const sellerGroups = sellers.reduce((acc, seller, index) => {
    const slideIndex = Math.floor(index / itemsPerSlide);
    if (!acc[slideIndex]) {
      acc[slideIndex] = [];
    }
    acc[slideIndex].push(seller);
    return acc;
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? sellerGroups.length - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) =>
      prev === sellerGroups.length - 1 ? 0 : prev + 1
    );
  };

  const handleIndicatorClick = (index) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <div id="best-sellers-section" className="container my-5">
        <h2 className="mb-4">Melhores Vendedores</h2>
        <div className="text-center">
          <div className="spinner-border text-custom-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="best-sellers-section" className="container my-5">
        <h2 className="mb-4">Melhores Vendedores</h2>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (sellers.length === 0) {
    return (
      <div id="best-sellers-section" className="container my-5">
        <h2 className="mb-4">Melhores Vendedores</h2>
        <div className="alert alert-info" role="alert">
          Nenhum vendedor encontrado.
        </div>
      </div>
    );
  }

  return (
    <div id="best-sellers-section" className="container my-5">
      <h2 className="mb-4">Melhores Vendedores</h2>

      <div id="best-sellers-carousel" className="carousel slide">
        <div className="carousel-indicators custom-indicators">
          {sellerGroups.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleIndicatorClick(index)}
              className={index === currentSlide ? "active" : ""}
              aria-current={index === currentSlide ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {sellerGroups.map((group, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === currentSlide ? "active" : ""
              }`}
              style={{ display: index === currentSlide ? "block" : "none" }}
            >
              <div className="d-flex justify-content-center gap-4">
                {group.map((seller) => (
                  <SellerCard key={seller.id} seller={seller} />
                ))}

                {/* Add empty spaces if there are fewer sellers than itemsPerSlide */}
                {Array.from({
                  length: Math.max(0, itemsPerSlide - group.length),
                }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    style={{ width: "calc(25% - 10px)" }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {sellerGroups.length > 1 && (
          <>
            <button
              className="carousel-control-prev custom-control"
              type="button"
              onClick={handlePrevSlide}
            >
              <span className="carousel-control-prev-icon"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button
              className="carousel-control-next custom-control"
              type="button"
              onClick={handleNextSlide}
            >
              <span className="carousel-control-next-icon"></span>
              <span className="visually-hidden">Próximo</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BestSellersSection;
