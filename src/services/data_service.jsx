import productsData from "../data/products.json";
import usersData from "../data/users.json";
import { ProductModel } from "../models/products/product_model";
import { UserSellerModel } from "../models/users/user_seller_model";

class DataService {
  static getAllProducts() {
    try {
      return productsData.map((product) => ProductModel.fromJson(product));
    } catch (error) {
      console.error("Error getting all products:", error);
      return [];
    }
  }

  static getProductById(id) {
    try {
      const product = productsData.find((p) => p.id === parseInt(id));
      return product ? ProductModel.fromJson(product) : null;
    } catch (error) {
      console.error(`Error getting product with ID ${id}:`, error);
      return null;
    }
  }

  static getProductsByCategory(category) {
    try {
      const filteredProducts = productsData.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
      return filteredProducts.map((product) => ProductModel.fromJson(product));
    } catch (error) {
      console.error(`Error getting products in category ${category}:`, error);
      return [];
    }
  }

  static getAllSellers() {
    try {
      return usersData
        .filter((user) => user.is_seller)
        .map(
          (user) =>
            new UserSellerModel(
              user.id,
              user.name,
              user.email,
              user.phone,
              user.is_seller,
              user.store_name,
              user.product_count,
              user.followers_count
            )
        );
    } catch (error) {
      console.error("Error getting all sellers:", error);
      return [];
    }
  }

  static getSellerById(id) {
    try {
      const seller = usersData.find(
        (u) => u.id === parseInt(id) && u.is_seller
      );
      return seller
        ? new UserSellerModel(
            seller.id,
            seller.name,
            seller.email,
            seller.phone,
            seller.is_seller,
            seller.store_name,
            seller.product_count,
            seller.followers_count
          )
        : null;
    } catch (error) {
      console.error(`Error getting seller with ID ${id}:`, error);
      return null;
    }
  }

  static getTopSellers(limit = 10) {
    try {
      const sellers = this.getAllSellers();
      return sellers
        .sort((a, b) => b.follower_count - a.follower_count)
        .slice(0, limit);
    } catch (error) {
      console.error(`Error getting top ${limit} sellers:`, error);
      return [];
    }
  }

  static getDiscountedProducts(limit = 10) {
    try {
      const products = this.getAllProducts();
      return products
        .filter((product) => product.has_discount)
        .sort((a, b) => b.discount_percentage - a.discount_percentage)
        .slice(0, limit);
    } catch (error) {
      console.error(`Error getting top ${limit} discounted products:`, error);
      return [];
    }
  }
}

export default DataService;
