import createHttpClient from '@/utils/createHttpClient';
import { AxiosInstance } from 'axios';

export interface WorkType {
	id: number;
	name: string;
}

class WorkTypeService {
	private client: AxiosInstance;

	constructor() {
		this.client = createHttpClient('work-types');
	}

	async getWorkTypes() {
		return (await this.client.get('')) as WorkType[];
	}
}

export default new WorkTypeService() as WorkTypeService;
