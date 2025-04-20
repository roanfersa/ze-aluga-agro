import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import "../../../styles/css/cart_icon.css";

const CartIcon = () => {
  const { totalItems } = useCart();

  return (
    <Link
      to="/carrinho"
      className="btn outline-custom-secondary cart-icon-btn"
    >
      <i className="bi bi-cart"></i>
      {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
    </Link>
  );
};

export default CartIcon;
