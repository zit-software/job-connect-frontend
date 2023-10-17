import { Skill } from '@/services/skill.service';
import { BaseModel } from './BaseModel';

export interface Resume extends BaseModel {
	id: number;
	jobTitle: string;
	skills: Skill[];
}
