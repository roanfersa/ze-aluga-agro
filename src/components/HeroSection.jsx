import React from 'react';
import bannerBlack from '../assets/images/banner_2 1.png';
import bannerHero from '../assets/images/banner_hero_01 1.png';

const HeroSection = () => {
  return (
    <div id="mainCarousel" className="container-fluid carousel slide mt-4" data-bs-ride="carousel">
      <div className="carousel-indicators custom-indicators">
        <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="0" className="active rounded" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
      </div>

      <div className="carousel-inner custom-carousel-inner">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className={`carousel-item ${index === 1 ? 'active' : ''}`}>
            <div className="d-flex justify-content-center align-items-center">
              <img className="banner_black img-fluid me-2" src={bannerBlack} alt="Banner Black Friday" />
              <img className="banner_hero img-fluid me-2" src={bannerHero} alt="Banner Hero" />
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev custom-control" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button className="carousel-control-next custom-control" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
};

export default HeroSection; 