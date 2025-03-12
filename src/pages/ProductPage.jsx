import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';
import '../styles/css/product_page.css';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/json/products.json');
        const products = await response.json();
        const foundProduct = products.find(p => p.id === parseInt(id));
        setProduct(foundProduct);
      } catch (error) {
        console.error('Erro ao carregar o produto:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (increment) => {
    setQuantity(prev => {
      const newValue = prev + increment;
      return newValue >= 1 ? newValue : 1;
    });
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (!product) {
    return <div className="container my-5">Produto não encontrado.</div>;
  }

  const renderTechnicalDetails = () => {
    if (!product.technical_details || typeof product.technical_details !== 'object') {
      return <p>Detalhes técnicos não disponíveis.</p>;
    }

    return (
      <ul>
        {Object.entries(product.technical_details).map(([key, value]) => (
          <li key={key}>
            <strong>{capitalizeFirstLetter(key.replace(/_/g, ' '))}:</strong> {value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Seção de Imagens */}
        <div className="col-md-5">
          <img src="https://via.placeholder.com/400" alt="Produto Principal" className="product-image mb-3" />
          <div>
            <img src="https://via.placeholder.com/60" alt="Thumbnail 1" className="thumbnail-image" />
            <img src="https://via.placeholder.com/60" alt="Thumbnail 2" className="thumbnail-image" />
            <img src="https://via.placeholder.com/60" alt="Thumbnail 3" className="thumbnail-image" />
          </div>
        </div>

        {/* Informações do Produto */}
        <div className="col-md-7">
          <span className="badge bg-custom-secondary text-custom-primary font-family-secondary mb-2">
            {product.category}
          </span>
          <span className={`badge ${product.is_available ? 'bg-success' : 'bg-danger'}`}>
            {product.is_available ? `Em Estoque (${product.available_units} unidades)` : 'Esgotado'}
          </span>
          
          <h2 className="product-title text-custom-primary font-family-primary fw-bold fs-font-headings-product-page">
            {product.name}
          </h2>
          <p><span className="text-warning">★ ★ ★ ★ ☆</span> (4.7)</p>
          <p className="price text-custom-primary font-family-primary fw-bold fs-font-headings">
            {product.price}
          </p>
          <p>Produto revisado e aprovado pelo <b>Zé Aluga</b></p>

          {/* Opções */}
          <div className="mb-3">
            <label>Cor</label><br />
            <button className="options-button">{product.color}</button>
          </div>

          {/* Quantidade e Botões */}
          <div className="mb-3">
            <label>Quantidade</label>
            <div className="input-group w-50">
              <button 
                className="btn outline-custom-primary bg-custom-primary color-custom-secondary"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <input 
                type="text" 
                className="form-control text-center outline-custom-primary" 
                value={quantity}
                readOnly
              />
              <button 
                className="btn outline-custom-primary bg-custom-primary color-custom-secondary"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>

          <h3 className="text-custom-primary font-family-primary fw-bold">Selecione o Período</h3>
          <Flatpickr
            options={{
              mode: "range",
              dateFormat: "Y-m-d",
              minDate: "today",
            }}
            value={selectedDates}
            onChange={dates => setSelectedDates(dates)}
            className="form-control flatpickr-input mb-2"
            placeholder="Selecione uma data de início e fim"
          />

          <button className="btn btn-buy" disabled={!product.is_available}>
            Alugar Agora
          </button>
          <button className="btn btn-cart" disabled={!product.is_available}>
            Adicionar ao Carrinho
          </button>

          {/* Informações do Vendedor */}
          <div className="seller-info">
            <img src="https://via.placeholder.com/50" alt="Seller Logo" className="rounded-circle me-2" />
            <div>
              <h6>Tudo para sua fazenda</h6>
              <p className="text-muted">Verificado ✓</p>
              <button className="btn btn-outline-primary btn-sm">Seguir</button>
            </div>
          </div>
        </div>
      </div>

      {/* Descrição do Produto e Especificações */}
      <div className="row mt-5">
        <div className="col-md-12">
          <h4>Descrição</h4>
          <p>{product.description}</p>

          <div className="row mt-5">
            <div className="col-md-12">
              <h4>Detalhes Técnicos</h4>
              {renderTechnicalDetails()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage; 