import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderComponent from "../../core/components/header_component";
import FooterComponent from "../../core/components/footer_component";
import { useCart } from "../../context/CartContext";
import "../../styles/css/cart_page.css";

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    totalAmount,
    removeFromCart,
    updateQuantity,
    clearCart,
    formatPrice,
  } = useCart();

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate("/checkout");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  const calculateRentalDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <>
      <HeaderComponent />
      <div className="cart-page-container">
        <div className="container py-5">
          <h1 className="cart-title font-family-primary text-custom-primary mb-4">
            Meu Carrinho
          </h1>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <i className="bi bi-cart-x"></i>
              <h2>Seu carrinho está vazio</h2>
              <p>
                Explore nossos produtos e adicione itens ao seu carrinho para
                alugar.
              </p>
              <Link
                to="/"
                className="btn bg-custom-primary text-custom-secondary"
              >
                Explorar Produtos
                <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
          ) : (
            <div className="row">
              <div className="col-lg-8">
                <div className="cart-items-container">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-image">
                        <img
                          src={
                            item.image ||
                            `https://placehold.co/300x200/003321/DCFFD7/png?text=${encodeURIComponent(
                              item.name.charAt(0)
                            )}`
                          }
                          alt={item.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/300x200/003321/DCFFD7/png?text=${encodeURIComponent(
                              item.name.charAt(0)
                            )}`;
                          }}
                        />
                      </div>
                      <div className="cart-item-details">
                        <span className="badge bg-custom-secondary text-custom-primary mb-2">
                          {item.category}
                        </span>
                        <h3 className="item-name font-family-primary text-custom-primary">
                          {item.name}
                        </h3>
                        <p className="item-rental-period">
                          <i className="bi bi-calendar me-2"></i>
                          Período: {formatDate(
                            item.rentalDates.startDate
                          )} até {formatDate(item.rentalDates.endDate)}
                          <span className="ms-2 badge bg-light text-dark">
                            {calculateRentalDays(
                              item.rentalDates.startDate,
                              item.rentalDates.endDate
                            )}{" "}
                            dias
                          </span>
                        </p>
                        <div className="item-price">
                          {item.has_discount ? (
                            <>
                              <span className="original-price text-muted text-decoration-line-through">
                                {item.price}
                              </span>
                              <span className="discount-price">
                                {formatPrice(
                                  item.has_discount
                                    ? parseFloat(
                                        item.price
                                          .replace("R$", "")
                                          .replace(".", "")
                                          .replace(",", ".")
                                          .trim()
                                      ) *
                                        (1 - item.discount_percentage / 100)
                                    : parseFloat(
                                        item.price
                                          .replace("R$", "")
                                          .replace(".", "")
                                          .replace(",", ".")
                                          .trim()
                                      )
                                )}
                              </span>
                              <span className="discount-badge ms-2">
                                -{item.discount_percentage}%
                              </span>
                            </>
                          ) : (
                            <span className="regular-price">{item.price}</span>
                          )}
                        </div>
                      </div>
                      <div className="cart-item-quantity">
                        <div className="quantity-controls">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="btn quantity-btn"
                          >
                            <i className="bi bi-dash"></i>
                          </button>
                          <span className="quantity-display">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.available_units}
                            className="btn quantity-btn"
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="btn remove-btn"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-actions mt-4">
                  <Link
                    to="/"
                    className="btn outline-custom-primary text-custom-primary"
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Continuar Comprando
                  </Link>
                  <button
                    onClick={clearCart}
                    className="btn btn-outline-danger ms-2"
                  >
                    <i className="bi bi-trash me-2"></i>
                    Limpar Carrinho
                  </button>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="cart-summary">
                  <h2 className="summary-title font-family-primary">
                    Resumo do Pedido
                  </h2>
                  <div className="summary-items">
                    <div className="summary-item">
                      <span>Subtotal</span>
                      <span>{formatPrice(totalAmount)}</span>
                    </div>
                    <div className="summary-item">
                      <span>Frete</span>
                      <span>A calcular</span>
                    </div>
                  </div>
                  <div className="summary-total">
                    <span>Total</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="btn checkout-btn bg-custom-primary text-custom-secondary"
                  >
                    Finalizar Pedido
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                  <div className="payment-methods mt-3">
                    <p className="text-muted mb-2">
                      Formas de pagamento aceitas:
                    </p>
                    <div className="payment-icons">
                      <i className="bi bi-credit-card me-2"></i>
                      <i className="bi bi-cash me-2"></i>
                      <i className="bi bi-bank me-2"></i>
                      <i className="bi bi-paypal me-2"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default CartPage;
