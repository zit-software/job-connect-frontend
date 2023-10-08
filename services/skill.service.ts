import { Paginationable } from '@/types/paginationable';
import createHttpClient from '@/utils/createHttpClient';
import { AxiosInstance } from 'axios';

export interface Skill {
	id: number;
	name: string;
	createdAt: Date | string;
	updatedAt: Date | string;
}

export interface GetAllSkillOptions {
	name?: string;
	pageNo?: number;
	pageSize?: number;
}

const defaultGetAllSkillOptions: GetAllSkillOptions = {
	name: '',
	pageNo: 0,
	pageSize: 10,
};

class SkillService {
	private client: AxiosInstance;

	constructor() {
		this.client = createHttpClient('skill');
	}

	async getAllSkills(
		options: GetAllSkillOptions = defaultGetAllSkillOptions,
	) {
		return (await this.client.get('', {
			params: options,
		})) as Paginationable<Skill>;
	}
}

export default new SkillService() as SkillService;
