import { Job } from '@/models/Job';
import createHttpClient from '@/utils/createHttpClient';
import { AxiosInstance } from 'axios';

class JobService {
	private client: AxiosInstance;
	constructor() {
		this.client = createHttpClient('');
	}
	async getJobById(id: number) {
		return (await this.client.get(`/jobs/${id}`)) as Job;
	}
}

export default new JobService() as JobService;
