import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/css/home.css';
import '../styles/css/custom_styles.css';
import '../styles/css/product_card.css';

const ProductCard = ({ product }) => {
  const calculateDiscountPrice = (price, discountPercentage) => {
    const numericPrice = parseFloat(price.replace('R$', '').replace('.', '').replace(',', '.'));
    const discountPrice = numericPrice - (numericPrice * (discountPercentage / 100));
    return `R$ ${discountPrice.toFixed(2).replace('.', ',')}`;
  };

  // Garante que sempre temos uma imagem para exibir
  const defaultImage = `https://placehold.co/800x600/003321/DCFFD7/png?text=${encodeURIComponent(product.name)}`;
  const mainImage = product.image || defaultImage;

  return (
    <div className="col">
      <Link to={`/produto/${product.id}`} className="text-decoration-none">
        <div className="card product-card shadow-sm rounded-3 h-100">
          <div className="product-card-image-container">
            <img 
              src={mainImage} 
              className="card-img-top product-card-image" 
              alt={product.name}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultImage;
              }}
            />
          </div>
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
              <div>
                {product.has_discount ? (
                  <>
                    <p className="text-muted text-decoration-line-through mb-0">
                      {product.price}
                    </p>
                    <p className="text-dark fs-5 fw-bold fs-product-card-price">
                      {calculateDiscountPrice(product.price, product.discount_percentage)}
                    </p>
                  </>
                ) : (
                  <p className="text-dark fs-5 fw-bold fs-product-card-price">
                    {product.price}
                  </p>
                )}
              </div>
              <div className="d-flex align-items-center">
                {product.has_discount && (
                  <span className="badge bg-danger me-2">
                    -{product.discount_percentage}%
                  </span>
                )}
                <span className="badge bg-light text-warning">
                  <i className="bi bi-star-fill"></i> {product.rating}
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-between text-muted small">
              <div className="d-flex">
                <i className="bi bi-geo-alt color-custom-primary fs-product-card-location-icon"></i>
                <span className="fs-product-card-location">{product.location}</span>
              </div>
              <span className="fs-product-card-units">
                {product.is_available ? `${product.available_units} Disponíveis` : 'Indisponível'}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    color: PropTypes.string,
    has_discount: PropTypes.bool.isRequired,
    discount_percentage: PropTypes.number,
    is_available: PropTypes.bool.isRequired,
    available_units: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string,
    technical_details: PropTypes.object,
    image: PropTypes.string
  }).isRequired
};

export default ProductCard; 