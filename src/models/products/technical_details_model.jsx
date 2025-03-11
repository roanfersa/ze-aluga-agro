export class TechnicalDetailsModel {
  constructor(power, capacity, dimensions, weight) {
    this.power = power;
    this.capacity = capacity;
    this.dimensions = dimensions;
    this.weight = weight;
  }

  static fromJson(json) {
    if (!json) return null;
    
    return new TechnicalDetailsModel(
      json.power || json.power_requirement || json.engine_power,
      json.capacity || json.flow_rate,
      json.dimensions,
      json.weight
    );
  }
} 