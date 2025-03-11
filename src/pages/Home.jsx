import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import ProductListSection from '../components/ProductListSection';
import ProductInfoSection from '../components/ProductInfoSection';
import BlackFridaySection from '../components/BlackFridaySection';
import BestSellersSection from '../components/BestSellersSection';
import '../styles/css/home.css';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <CategorySection />
      <ProductListSection />
      <BlackFridaySection />
      <ProductInfoSection />
      <BestSellersSection />
    </div>
  );
};

export default Home; 