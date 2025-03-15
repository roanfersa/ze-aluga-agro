import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import { ProductModel } from "../../../models/products/product_model";
import "../../../styles/css/home.css";
import "../../../styles/css/custom_styles.css";
import "../../../styles/css/product_card.css";
const ProductCard = ({ product }) => {
  const productModel =
    product instanceof ProductModel ? product : ProductModel.fromJson(product);
  const calculateDiscountPrice = (price, discountPercentage) => {
    const numericPrice = parseFloat(
      price.replace("R$", "").replace(".", "").replace(",", ".")
    );
    const discountPrice =
      numericPrice - numericPrice * (discountPercentage / 100);
    return `R$ ${discountPrice.toFixed(2).replace(".", ",")}`;
  };
  const defaultImage = `https:
    productModel.name
  )}`;
  const mainImage = productModel.image || defaultImage;
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <>
      <div className="col">
        <div className="card product-card shadow-sm rounded-3 h-100">
          <div className="favorite-button-wrapper">
            <FavoriteButton
              productId={productModel.id}
              productName={productModel.name}
              onClick={handleFavoriteClick}
            />
          </div>
          <Link
            to={`/produto/${productModel.id}`}
            className="text-decoration-none"
          >
            <div className="product-card-image-container">
              <img
                src={mainImage}
                className="card-img-top product-card-image"
                alt={productModel.name}
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
                  {productModel.category}
                </span>
              </div>
              <h5 className="card-title text-dark fw-bold fs-product-card-title">
                {productModel.name}
              </h5>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  {productModel.has_discount ? (
                    <>
                      <p className="text-muted text-decoration-line-through mb-0">
                        {productModel.price}
                      </p>
                      <p className="text-dark fs-6 fw-bold fs-product-card-price">
                        {calculateDiscountPrice(
                          productModel.price,
                          productModel.discount_percentage
                        )}
                      </p>
                    </>
                  ) : (
                    <p className="text-dark fs-6 fw-bold fs-product-card-price">
                      {productModel.price}
                    </p>
                  )}
                </div>
                <div className="d-flex align-items-center">
                  {productModel.has_discount && (
                    <span className="badge bg-danger me-2">
                      -{productModel.discount_percentage}%
                    </span>
                  )}
                  <span className="badge bg-light text-warning">
                    <i className="bi bi-star-fill"></i> {productModel.rating}
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-between text-muted small">
                <div className="d-flex">
                  <i className="bi bi-geo-alt color-custom-primary fs-product-card-location-icon"></i>
                  <span className="fs-product-card-location">
                    {productModel.location}
                  </span>
                </div>
                <span className="fs-product-card-units">
                  {productModel.is_available
                    ? `${productModel.available_units} Disponíveis`
                    : "Indisponível"}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
ProductCard.propTypes = {
  product: PropTypes.oneOfType([
    PropTypes.instanceOf(ProductModel),
    PropTypes.shape({
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
      image: PropTypes.string,
    }),
  ]).isRequired,
};
export default ProductCard;