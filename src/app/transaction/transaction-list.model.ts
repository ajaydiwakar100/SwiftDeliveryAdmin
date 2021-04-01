export class Restaurant {

    public error: String;
    public errorMessage: String;
    public total: any;
  
    constructor(error: String, errorMessage: String, total: any) {
  
      this.error = error;
      this.errorMessage = errorMessage;
      this.total = total;
  
    }
  
  }