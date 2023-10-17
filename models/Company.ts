import { BaseModel } from './BaseModel';
import { Recruiter } from './Recruiter';

export interface Company extends BaseModel {
	name: string;
	description: string;
	address: string;
	image: string;
	banner: string;
	owner: Recruiter;
}

export interface AddCompanyDTO {
	name: string;
	description: string;
	address: string;
	url: string;
	companySize: string;
}
