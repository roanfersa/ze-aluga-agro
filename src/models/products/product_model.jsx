import { TechnicalDetailsModel } from "../technical_details/technical_details_model";

export class ProductModel {
  constructor(
    id,
    category,
    name,
    price,
    color,
    has_discount,
    discount_percentge,
    is_avalible,
    rating,
    location,
    description,
    technical_details
  ) {
    this.id = id;
    this.category = category;
    this.name = name;
    this.price = price;
    this.color = color;
    this.has_discount = has_discount;
    this.discount_percentge = discount_percentge;
    this.is_avalible = is_avalible;
    this.rating = rating;
    this.location = location;
    this.description = description;
    this.technical_details = technical_details;
  }

  static fromJson(json) {
    return new ProductModel(
      json.id,
      json.category,
      json.name,
      json.price,
      json.color,
      json.has_discount,
      json.discount_percentge,
      json.is_avalible,
      json.rating,
      json.location,
      json.description,
      json.technical_details instanceof TechnicalDetailsModel
        ? json.technical_details
        : TechnicalDetailsModel.fromJson(json.technical_details)
    );
  }
}
