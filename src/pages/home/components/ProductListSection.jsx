import React from "react";
import ProductCard from "./ProductCard";
import useProducts from "../../../core/hooks/use_products_hook";
import "../../../styles/css/home.css";
import "../../../styles/css/custom_styles.css";

const ProductListSection = ({ category, limit }) => {
  const { products, loading, error } = useProducts({
    category: category,
    limit: limit || undefined,
  });

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 text-center">
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
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <div className="alert alert-info" role="alert">
              Nenhum produto encontrado.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="product-list" className="container my-5">
      <div className="row">
        <div className="col-12">
          <h2 className="text-start font-family-primary">
            {category
              ? `Produtos na categoria ${category}`
              : "Produtos para o seu negócio"}
          </h2>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3 mt-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListSection;
