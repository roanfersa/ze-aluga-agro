import React, { useState, useEffect } from 'react';
import { ProductModel } from '../models/products/product_model';
import { BiStar, BiGeoAlt } from 'react-icons/bi';

const ProductCard = ({ product }) => {
  return (
    <div className="col">
      <a href={`/product/${product.id}`} className="text-decoration-none">
        <div className="card product-card shadow-sm rounded-3 h-100">
          <img 
            src={product.image || 'https://via.placeholder.com/150'} 
            className="card-img-top" 
            alt={product.name}
          />
          <div className="card-body">
            <div className="text-start">
              <span className="badge bg-custom-secondary text-custom-primary fs-custom-category mb-2">
                {product.category}
              </span>
            </div>
            <h5 className="card-title text-dark fw-bold fs-product-card-title">
              {product.name}
            </h5>
            <div className="d-flex align-items-center justify-content-between">
              <p className="card-text text-dark fs-5 fw-bold fs-product-card-price">
                {product.price}
              </p>
              <div className="d-flex align-items-center">
                <span className="badge bg-light text-warning">
                  <BiStar /> {product.rating}
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-between text-muted small">
              <div className="d-flex">
                <BiGeoAlt className="color-custom-primary fs-product-card-location-icon" />
                <span className="fs-product-card-location">{product.location}</span>
              </div>
              <span className="fs-product-card-units">
                {product.is_available ? `${product.available_units} Disponíveis` : 'Indisponível'}
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

const ProductListSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/data/products.json');
        const data = await response.json();
        const productModels = data.map(product => ProductModel.fromJson(product));
        setProducts(productModels);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div id="product-list" className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="text-start font-family-primary">Produtos para o seu negócio</h2>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2 mt-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListSection; 