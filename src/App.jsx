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
import { UserProvider } from "./context/user_context";

function App() {
  return (
    <UserProvider>
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
      </Routes>
    </UserProvider>
  );
}

export default App;
