import { BaseModel } from './BaseModel';
import { Recruiter } from './Recruiter';

export interface Company extends BaseModel {
	name: string;
	description: string;
	address: string;
	companySize: string;
	mapPosition: string;
	url: string;
	image: string;
	banner: string;
	owner: Recruiter;
}

export interface AddCompanyDTO {
	name: string;
	address: string;
	url: string;
	companySize: string;
	image: string;
	banner: string;
}

export interface updateCompanyDTO {
	name: string;
	banner: string;
	image: string;
	address: string;
	url: string;
	companySize: string;
	mapPosition: string;
	description: string;
}

export interface updateCompanyImageDTO {
	companyId: number;
	image: File;
}
