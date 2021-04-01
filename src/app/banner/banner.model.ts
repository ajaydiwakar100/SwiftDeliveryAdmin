export class Banner {
  public error: String;
  public errorMessage: String;
  public totalPage: any;

  constructor(error: String, errorMessage: String, totalPage: Number) {

    this.error = error;
    this.errorMessage = errorMessage;
    this.totalPage = totalPage;

  }
}
