import { JobApply } from '@/models/JobApply';
import createHttpClient from '@/utils/createHttpClient';

export interface ApplyJobDto {
	jobId: number;
	resumeId: number;
	coverLetter: string;
}

class ApplyService {
	constructor(
		private readonly client = createHttpClient('apply'),
		private readonly userClient = createHttpClient('user/apply'),
	) {}

	async createApplyJob(body: ApplyJobDto) {
		return (await this.userClient.post('', body)) as JobApply;
	}

	async getAppliedJobs() {
		return (await this.userClient.get('')) as JobApply[];
	}

	async deleteAppliedJob(applyId: number) {
		return await this.userClient.delete(`/${applyId}`);
	}
}

export default new ApplyService() as ApplyService;
