import { Skill } from '@/services/skill.service';
import { BaseModel } from './BaseModel';
import { User } from './User';

export interface Resume extends BaseModel {
	id: number;
	jobTitle: string;
	content: string;
	skills: Skill[];
	applicant: {
		id: number;
		user: User;
	};
}
