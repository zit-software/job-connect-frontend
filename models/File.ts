import { User } from '@firebase/auth';
import { BaseModel } from './BaseModel';

export type FileModel = BaseModel & {
	id: string;
	name: string;
	type: string;
	user: User;
};
