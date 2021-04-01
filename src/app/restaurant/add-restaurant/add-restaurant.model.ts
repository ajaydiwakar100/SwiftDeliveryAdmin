export class AddRestaurant {
  public restaurantName: String;
  public restaurantImage: File;
  public email: String;
  public password: String;

  constructor(restaurantName: String, restaurantImage: File, email: String, password: String) {

    this.restaurantName = restaurantName;
    this.restaurantImage = restaurantImage;
    this.email = email;
    this.password = password;

  }
}
