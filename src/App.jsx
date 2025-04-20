import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/home/HomePage";
import SignInPage from "./pages/signin/SignInPage";
import SignUpPage from "./pages/singup/sign_up_page";
import SupportPage from "./pages/support/SupportPage";
import ProductPage from "./pages/product_page/ProductPage";
import Favorites from "./pages/favorite_page/Favorites";
import AdvancedSearchPage from "./pages/advanced_search/advance_search_page";
import CartPage from "./pages/cart_page/CartPage";
import CheckoutPage from "./pages/checkout_page/CheckoutPage";
import OrderSuccessPage from "./pages/order_success_page/OrderSuccessPage";
import { UserProvider } from "./context/user_context";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/produto/:id" element={<ProductPage />} />
          <Route
            path="/product/:id"
            element={
              <Navigate
                to={(location) =>
                  `/produto/${location.pathname.split("/").pop()}`
                }
              />
            }
          />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/busca-avancada" element={<AdvancedSearchPage />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
        </Routes>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
