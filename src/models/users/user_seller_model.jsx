export class UserSellerModel {
  constructor(
    id,
    name,
    email,
    phone,
    is_seller,
    store_name,
    product_count,
    follower_count
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.is_seller = is_seller;
    this.store_name = store_name;
    this.product_count = product_count;
    this.follower_count = follower_count;
  }
}
