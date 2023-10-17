import { BaseModel } from './BaseModel';

export interface Banner extends BaseModel {
	id: number;
	href: string;
	image: string;
}
