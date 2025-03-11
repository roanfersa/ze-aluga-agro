import { TechnicalDetailsModel } from "../technical_details/technical_details_model";

export class ProductModel {
  constructor(
    id,
    category,
    name,
    price,
    color,
    has_discount,
    discount_percentage,
    is_available,
    available_units,
    rating,
    location,
    description,
    technical_details,
    image
  ) {
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
    this.image = image;
  }

  static fromJson(json) {
    return new ProductModel(
      json.id,
      json.category,
      json.name,
      json.price,
      json.color,
      json.has_discount,
      json.discount_percentage,
      json.is_available,
      json.available_units,
      json.rating,
      json.location,
      json.description,
      json.technical_details instanceof TechnicalDetailsModel
        ? json.technical_details
        : TechnicalDetailsModel.fromJson(json.technical_details),
      json.image
    );
  }
}
