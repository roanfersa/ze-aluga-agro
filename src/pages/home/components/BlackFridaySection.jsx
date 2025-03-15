import React, { useState, useEffect } from "react";
import useProducts from "../../../core/hooks/use_products_hook";
import ProductCard from "./ProductCard";
import "../../../styles/css/home.css";

const BlackFridaySection = ({ limit = 6 }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 3;

  const { products, loading, error } = useProducts({
    discounted: true,
    limit: limit,
  });

  const productGroups = products.reduce((acc, product, index) => {
    const groupIndex = Math.floor(index / itemsPerSlide);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(product);
    return acc;
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {

      const now = new Date();
      const currentYear = now.getFullYear();
      const blackFridayDate = new Date(currentYear, 10, 1);


      blackFridayDate.setDate(
        blackFridayDate.getDate() +
          ((5 - blackFridayDate.getDay() + 7) % 7) +
          21
      );


      if (now > blackFridayDate) {
        blackFridayDate.setFullYear(currentYear + 1);
      }

      const difference = blackFridayDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: days.toString().padStart(2, "0"),
          hours: hours.toString().padStart(2, "0"),
          minutes: minutes.toString().padStart(2, "0"),
          seconds: seconds.toString().padStart(2, "0"),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? productGroups.length - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) =>
      prev === productGroups.length - 1 ? 0 : prev + 1
    );
  };

  const handleIndicatorClick = (index) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <div id="black-promotions" className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="font-family-primary">
            Promoções de Black <span className="text-warning">⚡</span>
          </h2>
          <div className="text-center">
            <div className="spinner-border text-custom-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="black-promotions" className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="font-family-primary">
            Promoções de Black <span className="text-warning">⚡</span>
          </h2>
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div id="black-promotions" className="container bg-custom-secondary py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="font-family-primary">
            Promoções de Black <span className="text-warning">⚡</span>
          </h2>
          <div className="alert alert-info" role="alert">
            Nenhuma promoção disponível no momento.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="black-promotions" className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="font-family-primary">
          Promoções de Black <span className="text-warning">⚡</span>
        </h2>
        <div className="d-flex align-items-center">
          <span className="me-2">Termina em</span>
          <div id="countdown" className="d-flex align-items-center">
            <div className="countdown-item text-center">
              <span className="bg-custom-primary text-white rounded px-2 py-1 mx-1">
                {timeLeft.days}
              </span>
              <div className="countdown-label">Dias</div>
            </div>
            <div className="countdown-item text-center">
              <span className="bg-custom-primary text-white rounded px-2 py-1 mx-1">
                {timeLeft.hours}
              </span>
              <div className="countdown-label">Horas</div>
            </div>
            <div className="countdown-item text-center">
              <span className="bg-custom-primary text-white rounded px-2 py-1 mx-1">
                {timeLeft.minutes}
              </span>
              <div className="countdown-label">Minutos</div>
            </div>
            <div className="countdown-item text-center">
              <span className="bg-custom-primary text-white rounded px-2 py-1 mx-1">
                {timeLeft.seconds}
              </span>
              <div className="countdown-label">Segundos</div>
            </div>
          </div>
        </div>
      </div>

      <div id="black-friday-carousel" className="carousel slide">
        <div className="carousel-indicators custom-indicators">
          {productGroups.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleIndicatorClick(index)}
              className={index === currentSlide ? "active rounded" : "rounded"}
              aria-current={index === currentSlide ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {productGroups.map((group, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === currentSlide ? "active" : ""
              }`}
              style={{ display: index === currentSlide ? "block" : "none" }}
            >
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {group.map((product) => (
                  <div key={product.id} className="col">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {productGroups.length > 1 && (
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

export default BlackFridaySection;
