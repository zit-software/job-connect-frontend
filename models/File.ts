import { UserState } from '@/store/userSlice';
import { BaseModel } from './BaseModel';

export type FileModel = BaseModel & {
	id: string;
	name: string;
	type: 'IMAGE' | 'PDF';
	user: UserState;
};
