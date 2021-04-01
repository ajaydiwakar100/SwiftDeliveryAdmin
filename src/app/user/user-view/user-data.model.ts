import { UserAddress } from './user-address.model';
import { UserDetail } from '../user-detail.model';

export class UserData {
  public users: UserDetail;
  public address: UserAddress[];
}
