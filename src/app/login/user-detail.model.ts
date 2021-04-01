export class UserDetailModel {

    public accessToken: String;
    public error: String;
    public errorMessage: String;

    constructor( error: String, errorMessage: String, accessToken: String ) {
        this.accessToken = accessToken;
        this.error = error;
        this.errorMessage = errorMessage;
    }
}
