import { IBaseEntity } from '../../../index.models';

export class UserProfileEntity implements IBaseEntity<string> {
    id: string;
	firstName: string;
	middleName: string;
	lastName: string;
	email: string;
    lastAccess: Date;
}
