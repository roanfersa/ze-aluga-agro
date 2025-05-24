import FooterComponent from "../../core/components/footer_component";
import HeaderComponent from "../../core/components/header_component";
import HeroSection from "./components/HeroSection";
import CategorySection from "./components/CategorySection";
import VideoSection from "./components/VideoSection";
import EasierChoiceSection from "./components/EasierChoiceSection";
import ProductInfoSection from "./components/ProductInfoSection";
import ProductListSection from "./components/ProductListSection";
import BestSellersSection from "./components/BestSellersSection";
import BlackFridaySection from "./components/BlackFridaySection";
import "../../styles/css/home.css";

const HomePage = () => {
  return (
    <>
      <HeaderComponent />
      <main>
        <HeroSection />
        <VideoSection />
        <CategorySection />
        <BlackFridaySection limit={6} />
        <EasierChoiceSection />
        <ProductInfoSection />
        <ProductListSection limit={20} />
        <BestSellersSection limit={12} />
      </main>
      <FooterComponent />
    </>
  );
};

export default HomePage;
