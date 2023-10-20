import { BaseModel } from './BaseModel';
import { User } from './User';

export interface Recruiter extends BaseModel {
	user: User;
}
