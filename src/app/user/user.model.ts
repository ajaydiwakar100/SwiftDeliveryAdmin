export class  UserModel {
  public id;
  public userName;
  public email;

  constructor(id: String, userName: String, email: String) {

    this.id = id;
    this.userName = userName;
    this.email = email;

  }
}
