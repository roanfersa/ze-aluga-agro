import React from 'react';

export default function ProductCard({ product }) {
    return (
        <div className="card">
            <img src={product.imageUrl} className="card-img-top" alt={product.name} />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">R$ {product.price}</p>
                <a href="#" className="btn btn-primary">Alugar</a>
            </div>
        </div>
    );
}