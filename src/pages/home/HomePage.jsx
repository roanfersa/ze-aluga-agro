import FooterComponent from "../../core/components/footer_component";
import HeaderComponent from "../../core/components/header_component";
import HeroSection from "./components/HeroSection";
import CategorySection from "./components/CategorySection";
import EasierChoiceSection from "./components/EasierChoiceSection";
import ProductInfoSection from "./components/ProductInfoSection";
import ProductListSection from "./components/ProductListSection";
import BestSellersSection from "./components/BestSellersSection";
import "../../styles/css/home.css";

const HomePage = () => {
  return (
    <>
      <HeaderComponent />
      <main>
        <HeroSection />
        <CategorySection />
        <EasierChoiceSection />
        <ProductInfoSection />
        <ProductListSection />
        <BestSellersSection />
      </main>
      <FooterComponent />
    </>
  );
};

export default HomePage;