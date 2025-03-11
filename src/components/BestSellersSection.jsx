import React, { useEffect, useState } from 'react';
import { UserSellerModel } from '../models/users/user_seller_model';
import usersData from '../data/users.json';
import '../styles/css/home.css';
import '../styles/css/custom_styles.css';

const SellerCard = ({ seller }) => {
  return (
    <div className="card seller-card">
      <img src={seller.banner || 'https://via.placeholder.com/500x200'} alt="Banner" className="banner" />
      <img src={seller.profile_picture || 'https://via.placeholder.com/80'} alt="Foto de Perfil" className="profile-pic" />
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
            <span>{seller.followers_count || 0}</span>
            Seguidores
          </div>
        </div>
        <button className="follow-button">Seguir</button>
      </div>
    </div>
  );
};

const BestSellersSection = () => {
  const [sellers, setSellers] = useState([]);
  const itemsPerSlide = 4;

  useEffect(() => {
    const sellerUsers = usersData
      .filter(user => user.is_seller)
      .map(user => ({
        ...user,
        banner: 'https://via.placeholder.com/500x200',
        profile_picture: 'https://via.placeholder.com/80',
        deals_count: Math.floor(Math.random() * 100)
      }));

    setSellers(sellerUsers);
  }, []);

  const groupedSellers = sellers.reduce((acc, seller, index) => {
    const slideIndex = Math.floor(index / itemsPerSlide);
    if (!acc[slideIndex]) {
      acc[slideIndex] = [];
    }
    acc[slideIndex].push(seller);
    return acc;
  }, []);

  useEffect(() => {
    const carousel = document.getElementById('best-sellers-carousel');
    if (carousel) {
      new window.bootstrap.Carousel(carousel, {
        interval: 5000,
        wrap: true,
        touch: true
      });
    }
  }, []);

  return (
    <div id="best-sellers-section" className="container my-5">
      <h2 className="mb-4">Melhores Vendedores</h2>
      
      <div id="best-sellers-carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {groupedSellers.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#best-sellers-carousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {groupedSellers.map((sellerGroup, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div className="d-flex justify-content-between">
                {sellerGroup.map(seller => (
                  <SellerCard key={seller.id} seller={seller} />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <button className="carousel-control-prev" type="button" data-bs-target="#best-sellers-carousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#best-sellers-carousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Próximo</span>
        </button>
      </div>
    </div>
  );
};

export default BestSellersSection; 