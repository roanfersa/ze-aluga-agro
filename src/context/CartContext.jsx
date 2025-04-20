import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useUser } from "./user_context";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const { currentUser } = useUser();

  useEffect(() => {
    const loadCart = () => {
      let cartKey = "cartItems";

      if (currentUser && currentUser.id) {
        cartKey = `cartItems_${currentUser.id}`;
      }

      const storedCart = localStorage.getItem(cartKey);
      if (storedCart) {
        try {
          setCartItems(JSON.parse(storedCart));
        } catch (error) {
          console.error("Erro ao analisar o carrinho armazenado:", error);
          localStorage.removeItem(cartKey);
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    };

    loadCart();
  }, [currentUser]);

  useEffect(() => {
    let cartKey = "cartItems";
    if (currentUser && currentUser.id) {
      cartKey = `cartItems_${currentUser.id}`;
    }

    localStorage.setItem(cartKey, JSON.stringify(cartItems));

    let itemCount = 0;
    let amount = 0;

    cartItems.forEach((item) => {
      itemCount += item.quantity;

      const price = parseFloat(
        item.price.replace("R$", "").replace(".", "").replace(",", ".").trim()
      );

      if (item.has_discount && item.discount_percentage) {
        const discountedPrice = price * (1 - item.discount_percentage / 100);
        amount += discountedPrice * item.quantity;
      } else {
        amount += price * item.quantity;
      }
    });

    setTotalItems(itemCount);
    setTotalAmount(amount);
  }, [cartItems, currentUser]);

  const calculateDiscountPrice = (price, discountPercentage) => {
    const numericPrice = parseFloat(
      price.replace("R$", "").replace(".", "").replace(",", ".").trim()
    );
    return numericPrice * (1 - discountPercentage / 100);
  };

  const addToCart = (product, quantity = 1, rentalDates = null) => {
    if (!product.is_available) {
      toast.error("Este produto não está disponível para aluguel no momento.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!rentalDates || !rentalDates.startDate || !rentalDates.endDate) {
      toast.warning("Por favor, selecione o período de aluguel.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        const newQuantity = updatedItems[existingItemIndex].quantity + quantity;

        if (newQuantity > product.available_units) {
          toast.warning(
            `Quantidade máxima disponível: ${product.available_units}`,
            {
              position: "top-right",
              autoClose: 3000,
            }
          );

          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: product.available_units,
            rentalDates:
              rentalDates || updatedItems[existingItemIndex].rentalDates,
          };
        } else {
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: newQuantity,
            rentalDates:
              rentalDates || updatedItems[existingItemIndex].rentalDates,
          };
        }

        toast.success("Produto atualizado no carrinho!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });

        return updatedItems;
      } else {
        toast.success("Produto adicionado ao carrinho!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });

        return [
          ...prevItems,
          {
            ...product,
            quantity: Math.min(quantity, product.available_units),
            rentalDates,
          },
        ];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== productId);

      toast.info("Produto removido do carrinho", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });

      return updatedItems;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;

    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === productId) {
          const newQuantity = Math.min(quantity, item.available_units);

          if (newQuantity < quantity) {
            toast.warning(
              `Quantidade máxima disponível: ${item.available_units}`,
              {
                position: "top-right",
                autoClose: 3000,
              }
            );
          }

          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    let cartKey = "cartItems";
    if (currentUser && currentUser.id) {
      cartKey = `cartItems_${currentUser.id}`;
    }

    setCartItems([]);
    localStorage.removeItem(cartKey);

    toast.info("Carrinho esvaziado", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
    });
  };

  const formatPrice = (price) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const value = {
    cartItems,
    totalAmount,
    totalItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    formatPrice,
    calculateDiscountPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
