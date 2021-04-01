export class UserAddress {
    public addressType: string;
    public flatNumber: string;
    public address: string;
    public landmark: string;

    constructor(addressType: string, flatNumber: string, address: string, landmark: string) {

        this.addressType = addressType;
        this.address = address;
        this.flatNumber = flatNumber;
        this.landmark = landmark;

    }
}