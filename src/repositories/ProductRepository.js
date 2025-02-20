import Product from '../models/Product';

export default class ProductRepository {
    constructor() {
        this.products = this.loadProducts();
    }

    loadProducts() {
        return fetch('/products.json')
            .then(response => response.json())
            .then(data => data.map(product => new Product(
                product.id,
                product.category,
                product.name,
                product.price,
                product.color,
                product.has_discount,
                product.discount_percentage,
                product.is_available,
                product.available_units,
                product.rating,
                product.location,
                product.description,
                product.technical_details
            )));
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.then(products => products.find(product => product.id === id));
    }
}