import { AddJobDTO, Job } from '@/models/Job';
import { JobApply } from '@/models/JobApply';
import { Paginationable } from '@/types/paginationable';
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

/**
 * @description Find job by name, skill, worktype...
 */
export interface FindJobDto {
	keyword?: string;
	pageNo?: number;
	pageSize?: number;
	skillId?: number[];
	workTypeId?: number;
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

	async getAllJobs(options?: FindJobDto) {
		return (await this.client.get('', { params: options })) as Paginationable<Job>;
	}

	async getAppliedByJobId(jobId: number) {
		return (await this.userClient.get(`/${jobId}/applicants`)) as JobApply[];
	}
}

export default new JobService() as JobService;
