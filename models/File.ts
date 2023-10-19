import { UserState } from '@/store/user';
import { BaseModel } from './BaseModel';

export type FileModel = BaseModel & {
	id: string;
	name: string;
	type: 'IMAGE' | 'PDF';
	user: UserState;
};
