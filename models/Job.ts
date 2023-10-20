import { BaseModel } from './BaseModel';
import { Company } from './Company';
import { Recruiter } from './Recruiter';
import { Skill } from './Skill';
import { WorkType } from './WorkType';

export interface Job extends BaseModel {
	title: string;
	description: string;
	minExp: number;
	minSalary: number;
	maxSalary: number;
	address: string;
	skils: Skill[];
	company: Company;
	recruiter: Recruiter;
	workType: WorkType;
}

export interface AddJobDTO {
	title: string;
	description: string;
	minExp: number;
	minSalary: number;
	maxSalary: number;
	address: string;
	companyId: number;
	workTypeId: number;
}

export interface AddJobForm {
	title?: string;
	description?: string;
	minExp?: number;
	minSalary?: number;
	maxSalary?: number;
	address?: string;
	companyId?: number;
	workTypeId?: number;
}
