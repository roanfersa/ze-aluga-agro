import React, { useEffect, useState } from 'react';
import ProductRepository from '../repositories/ProductRepository';
import { ProductCard } from '../components/ProductCard';

export default function HomePage() {
    const [products, setProducts] = useState();
    const productRepository = new ProductRepository();

    useEffect(() => {
        productRepository.getProducts().then(data => setProducts(data));
    },);

    return (
        <main>
            {/* Seção de produtos */}
            <section className="container">
                <div className="row">
                    {products.map(product => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}