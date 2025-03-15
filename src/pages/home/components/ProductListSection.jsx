import { useState, useEffect } from 'react';
import { ProductModel } from '../../../models/products/product_model';
import productsData from "../../../data/products.json";
import ProductCard from './ProductCard';
import "../../../styles/css/home.css";
import "../../../styles/css/custom_styles.css";

const ProductListSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Convertendo os dados do JSON para instâncias de ProductModel
    const productModels = productsData.map(product => ProductModel.fromJson(product));
    setProducts(productModels);
  }, []);

  return (
    <div id="product-list" className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="text-start font-family-primary">Produtos para o seu negócio</h2>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2 mt-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListSection;