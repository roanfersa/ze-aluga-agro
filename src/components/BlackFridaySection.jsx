import { useState, useEffect } from 'react';
import '../styles/sass/home.scss';
import { ProductModel } from '../models/products/product_model';
import productsData from '../data/products.json';
import ProductCard from './ProductCard';

const BlackFridaySection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Filtra apenas produtos com desconto e disponíveis
    const blackFridayProducts = productsData
      .filter(product => product.has_discount && product.is_available)
      .map(product => ProductModel.fromJson(product))
      .slice(0, 6); // Limita a 6 produtos para o carrossel

    setProducts(blackFridayProducts);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = new Date('2024-11-29T23:59:59').getTime();
      const now = new Date().getTime();
      const difference = endDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: days.toString().padStart(2, '0'),
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0')
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  const productGroups = products.reduce((acc, curr, i) => {
    if (i % 3 === 0) acc.push([]);
    acc[acc.length - 1].push(curr);
    return acc;
  }, []);

  return (
    <div id="black-promotions" className="container bg-custom-secondary py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="font-family-primary">Promoções de Black <span className="text-warning">⚡</span></h2>
        <div className="d-flex align-items-center">
          <span className="me-2">Termina em</span>
          <div id="countdown" className="d-flex align-items-center">
            <div className="countdown-item text-center">
              <span className="bg-custom-primary text-white rounded px-2 py-1 mx-1">{timeLeft.days}</span>
              <div className="countdown-label">Dias</div>
            </div>
            <div className="countdown-item text-center">
              <span className="bg-custom-primary text-white rounded px-2 py-1 mx-1">{timeLeft.hours}</span>
              <div className="countdown-label">Horas</div>
            </div>
            <div className="countdown-item text-center">
              <span className="bg-custom-primary text-white rounded px-2 py-1 mx-1">{timeLeft.minutes}</span>
              <div className="countdown-label">Minutos</div>
            </div>
            <div className="countdown-item text-center">
              <span className="bg-custom-primary text-white rounded px-2 py-1 mx-1">{timeLeft.seconds}</span>
              <div className="countdown-label">Segundos</div>
            </div>
          </div>
        </div>
      </div>

      <div id="black-friday-carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators custom-indicators">
          {productGroups.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#black-friday-carousel"
              data-bs-slide-to={index}
              className={index === 0 ? 'active rounded' : 'rounded'}
              aria-current={index === 0 ? 'true' : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {productGroups.map((group, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {group.map(product => (
                  <div key={product.id} className="col">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <button className="carousel-control-prev custom-control" type="button" data-bs-target="#black-friday-carousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next custom-control" type="button" data-bs-target="#black-friday-carousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Próximo</span>
        </button>
      </div>
    </div>
  );
};

export default BlackFridaySection; 