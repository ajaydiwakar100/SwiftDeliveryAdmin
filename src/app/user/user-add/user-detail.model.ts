import { UserAddress } from '../user-add/user-address.model';

export class UserDetail {
    public userName: string;
    public email: string;
    public countryCode: number;
    public mobileNumber: number;
    public password: string;
    public confirmPassword: string;
    public address: UserAddress;

    constructor(userName: string, email: string, countryCode: number, mobile: number, password: string, address: any) {

        this.userName = userName;
        this.email = email;
        this.countryCode = countryCode;
        this.mobileNumber = mobile;
        this.password = password;
        this.address = address;

    }
}

