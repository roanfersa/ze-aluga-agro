export default class Product {
    constructor(id, category, name, price, color, has_discount, discount_percentage, is_available, available_units, rating, location, description, technical_details) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.price = price;
        this.color = color;
        this.has_discount = has_discount;
        this.discount_percentage = discount_percentage;
        this.is_available = is_available;
        this.available_units = available_units;
        this.rating = rating;
        this.location = location;
        this.description = description;
        this.technical_details = technical_details;
    }
}