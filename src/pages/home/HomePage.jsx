import FooterComponent from "../../core/components/footer_component";
import HeaderComponent from "../../core/components/header_component";
import HeroSection from "../../components/HeroSection";
import CategorySection from "../../components/CategorySection";
import ProductListSection from "../../components/ProductListSection";
import "../../styles/css/home.css";

const HomePage = () => {
  return (
    <>
      <HeaderComponent />
      <main>
        <HeroSection />
        <CategorySection />
        <ProductListSection />
      </main>
      <FooterComponent />
    </>
  );
};

export default HomePage;