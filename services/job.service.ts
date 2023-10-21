import { AddJobDTO, Job } from '@/models/Job';
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
	async createJob(job: AddJobDTO) {
		return (await this.client.post('/user/jobs', job)) as Job;
	}
	async getJobsByCompanyId(id: number) {
		return (await this.client.get(`/jobs/company/${id}`)) as Job[];
	}
}

export default new JobService() as JobService;
