import { AddJobDTO, Job } from '@/models/Job';
import createHttpClient from '@/utils/createHttpClient';

export interface UpdateJobDto {
	title: string;
	minExp: number;
	minSalary: number;
	maxSalary: number;
	workTypeId: number;
	address: string;
	description: string;
	skillIds: number[];
}

class JobService {
	constructor(
		private readonly client = createHttpClient('jobs'),
		private readonly userClient = createHttpClient('user/jobs'),
	) {}

	async getJobById(id: number) {
		return (await this.client.get(`/${id}`)) as Job;
	}

	async createJob(job: AddJobDTO) {
		return (await this.userClient.post('', job)) as Job;
	}

	async getJobsByCompanyId(id: number) {
		return (await this.client.get(`/company/${id}`)) as Job[];
	}

	async updateById(id: number, body: UpdateJobDto) {
		return (await this.userClient.put(`/${id}`, body)) as Job;
	}

	async deleteById(id: number) {
		return await this.userClient.delete(`/${id}`);
	}
}

export default new JobService() as JobService;
