import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../../styles/css/product_page.css";
import { ProductModel } from "../../models/products/product_model";
import productsData from "../../data/products.json";
import HeaderComponent from "../../core/components/header_component";
import FooterComponent from "../../core/components/footer_component";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const loadProduct = () => {
      try {
        const productModels = productsData.map((product) =>
          ProductModel.fromJson(product)
        );
        const foundProduct = productModels.find((p) => p.id === parseInt(id));

        if (foundProduct) {
          // Pré-carrega as imagens
          const preloadImages = (urls) => {
            urls.forEach((url) => {
              const img = new Image();
              img.src = url;
            });
          };

          if (foundProduct.images && foundProduct.images.length > 0) {
            preloadImages(foundProduct.images);
          }
        }

        setProduct(foundProduct || null);
      } catch (error) {
        console.error("Erro ao carregar o produto:", error);
      }
    };

    loadProduct();
  }, [id]);

  const handleQuantityChange = (increment) => {
    setQuantity((prev) => {
      const newValue = prev + increment;
      return newValue >= 1 ? newValue : 1;
    });
  };

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (!product) {
    return <div className="container my-5">Produto não encontrado.</div>;
  }

  const renderTechnicalDetails = () => {
    if (
      !product.technical_details ||
      typeof product.technical_details !== "object"
    ) {
      return <p>Detalhes técnicos não disponíveis.</p>;
    }

    return (
      <ul>
        {Object.entries(product.technical_details).map(([key, value]) => (
          <li key={key}>
            <strong>{capitalizeFirstLetter(key.replace(/_/g, " "))}:</strong>{" "}
            {value}
          </li>
        ))}
      </ul>
    );
  };

  const calculateDiscountPrice = (price, discountPercentage) => {
    const numericPrice = parseFloat(
      price.replace("R$", "").replace(".", "").replace(",", ".")
    );
    const discountPrice =
      numericPrice - numericPrice * (discountPercentage / 100);
    return `R$ ${discountPrice.toFixed(2).replace(".", ",")}`;
  };

  // Garante que sempre temos uma imagem para exibir
  const defaultImage = `https://placehold.co/800x600/003321/DCFFD7/png?text=${encodeURIComponent(
    product.name
  )}`;
  const mainImage =
    product.images && product.images.length > 0
      ? product.images[selectedImage]
      : defaultImage;

  // Para as miniaturas, vamos usar um tamanho menor
  const getThumbnailUrl = (url) => {
    if (!url) return defaultImage;
    if (typeof url === "string" && url.includes("placehold.co")) {
      return url.replace("800x600", "150x150");
    }
    return url;
  };

  const thumbnails =
    product.images && product.images.length > 0
      ? product.images.map((img) => getThumbnailUrl(img))
      : [getThumbnailUrl(defaultImage)];

  return (
    <>
      <HeaderComponent />
      <div className="container my-5">
        <div className="row">
          {/* Seção de Imagens */}
          <div className="col-md-5">
            <div className="image-container">
              <img
                src={mainImage}
                alt={product.name}
                className="product-image mb-3"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultImage;
                }}
              />
            </div>
            <div className="thumbnail-container">
              {thumbnails.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} - Imagem ${index + 1}`}
                  className={`thumbnail-image ${
                    selectedImage === index ? "active" : ""
                  }`}
                  onClick={() => handleImageClick(index)}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = getThumbnailUrl(defaultImage);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Informações do Produto */}
          <div className="col-md-7">
            <span className="badge bg-custom-secondary text-custom-primary font-family-secondary mb-2">
              {product.category}
            </span>
            <span
              className={`badge ${
                product.is_available ? "bg-success" : "bg-danger"
              }`}
            >
              {product.is_available
                ? `Em Estoque (${product.available_units} unidades)`
                : "Esgotado"}
            </span>

            <h2 className="product-title text-custom-primary font-family-primary fw-bold fs-font-headings-product-page">
              {product.name}
            </h2>
            <p>
              <span className="text-warning">★ ★ ★ ★ ☆</span> ({product.rating})
            </p>

            {product.has_discount ? (
              <>
                <p className="text-muted text-decoration-line-through mb-0">
                  {product.price}
                </p>
                <p className="price text-custom-primary font-family-primary fw-bold fs-font-headings">
                  {calculateDiscountPrice(
                    product.price,
                    product.discount_percentage
                  )}
                </p>
              </>
            ) : (
              <p className="price text-custom-primary font-family-primary fw-bold fs-font-headings">
                {product.price}
              </p>
            )}

            <p>
              Produto revisado e aprovado pelo <b>Zé Aluga</b>
            </p>

            {/* Opções */}
            <div className="mb-3">
              <label>Cor</label>
              <br />
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

            <h3 className="text-custom-primary font-family-primary fw-bold">
              Selecione o Período
            </h3>
            <Flatpickr
              options={{
                mode: "range",
                dateFormat: "Y-m-d",
                minDate: "today",
              }}
              value={selectedDates}
              onChange={(dates) => setSelectedDates(dates)}
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
              <img
                src={`https://placehold.co/80x80/003321/DCFFD7/png?text=ZA`}
                alt="Logo do Vendedor"
                className="rounded-circle me-2"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/80x80/003321/DCFFD7/png?text=ZA`;
                }}
              />
              <div>
                <h6 className="mb-1 text-custom-primary">
                  Tudo para sua fazenda
                </h6>
                <p className="text-muted mb-2">
                  <i className="bi bi-patch-check-fill text-custom-primary"></i>{" "}
                  Verificado
                </p>
                <button className="btn btn-outline-custom-primary btn-sm">
                  Seguir
                </button>
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
      <FooterComponent />
    </>
  );
};

export default ProductPage;
