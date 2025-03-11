export class TechnicalDetailsModel {
  constructor(
    brand,
    model,
    year,
    specifications
  ) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.specifications = specifications;
  }

  static fromJson(json) {
    return new TechnicalDetailsModel(
      json.brand,
      json.model,
      json.year,
      json.specifications
    );
  }
} 