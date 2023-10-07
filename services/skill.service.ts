import { Paginationable } from '@/types/paginationable';
import createHttpClient from '@/utils/createHttpClient';
import { AxiosInstance } from 'axios';

export interface Skill {
	id: number;
	name: string;
	createdAt: Date | string;
	updatedAt: Date | string;
}

export interface SearchSkillOption {
	name: string;
}

class SkillService {
	private client: AxiosInstance;

	constructor() {
		this.client = createHttpClient('skill');
	}

	async getAllSkills() {
		return (await this.client.get('')) as Paginationable<Skill>;
	}

	async searchSkills({ name }: SearchSkillOption) {
		return (await this.client.get('', {
			params: { name },
		})) as Paginationable<Skill>;
	}
}

export default new SkillService() as SkillService;
