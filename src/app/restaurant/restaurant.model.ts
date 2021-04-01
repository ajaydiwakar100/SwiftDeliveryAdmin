
export class Restaurant {

  public error: String;
  public errorMessage: String;
  public totalPage: any;

  constructor(error: String, errorMessage: String, totalPage: any) {

    this.error = error;
    this.errorMessage = errorMessage;
    this.totalPage = totalPage;

  }

}
