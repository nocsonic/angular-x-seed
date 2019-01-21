import { UserModel } from './user.model';

export interface SessionModel extends UserModel {
 token?: string;
 loading?: boolean;
 loaded?: boolean;
}
