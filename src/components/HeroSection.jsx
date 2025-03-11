import React, { useEffect } from 'react';
import bannerBlack from '../assets/images/banner_2 1.png';
import bannerHero from '../assets/images/banner_hero_01 1.png';
import '../styles/css/home.css';

const HeroSection = () => {
  useEffect(() => {
    // Inicializa o carrossel usando o Bootstrap
    const carousel = document.getElementById('mainCarousel');
    if (carousel) {
      new window.bootstrap.Carousel(carousel, {
        interval: 5000, // Tempo entre slides em milissegundos
        wrap: true // Permite que o carrossel volte ao início
      });
    }
  }, []);

  const slides = [
    {
      id: 1,
      blackBanner: bannerBlack,
      heroBanner: bannerHero
    },
    {
      id: 2,
      blackBanner: bannerBlack,
      heroBanner: bannerHero
    },
    {
      id: 3,
      blackBanner: bannerBlack,
      heroBanner: bannerHero
    },
    {
      id: 4,
      blackBanner: bannerBlack,
      heroBanner: bannerHero
    }
  ];

  return (
    <div id="mainCarousel" className="container-fluid carousel slide mt-4" data-bs-ride="carousel">
      <div className="carousel-indicators custom-indicators">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            data-bs-target="#mainCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? "active rounded" : "rounded"}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner custom-carousel-inner">
        {slides.map((slide, index) => (
          <div key={slide.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <div className="d-flex justify-content-center align-items-center">
              <img className="banner_black img-fluid me-2" src={slide.blackBanner} alt="Banner Black Friday" />
              <img className="banner_hero img-fluid me-2" src={slide.heroBanner} alt="Banner Hero" />
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev custom-control" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next custom-control" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Próximo</span>
      </button>
    </div>
  );
};

export default HeroSection; 