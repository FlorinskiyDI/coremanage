import { IBaseEntity } from '../../../index.models';

export class UserProfileEntity implements IBaseEntity<string> {
    id: string; // IBaseEntity

    firstName: string;
	middleName: string;
    lastName: string;
	email: string;
}
