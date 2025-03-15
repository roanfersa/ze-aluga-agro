import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SignInPage from "./pages/signin/SignInPage";
import SignUpPage from "./pages/singup/sign_up_page"
import SupportPage from "./pages/support/SupportPage";
import ProductPage from "./pages/product_page/ProductPage";
import Favorites from "./pages/favorite_page/Favorites";

function App() {
  return (
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
            to={(location) => `/produto/${location.pathname.split("/").pop()}`}
          />
        }
      />
      <Route path="/favoritos" element={<Favorites />} />
    </Routes>
  );
}

export default App;
