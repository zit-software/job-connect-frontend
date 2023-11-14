import { RankedJob } from '@/models/RankedJob';
import axios, { AxiosInstance } from 'axios';

interface MatchingJobResult {
	result: RankedJob[];
}

class MatchingService {
	private client: AxiosInstance;
	constructor() {
		this.client = axios.create({
			baseURL: `${process.env.NEXT_PUBLIC_MATCHING_API_URL}`,
		});
		this.client.interceptors.response.use(
			(res) => res.data,
			async (error) => {
				throw error.response?.data || error;
			},
		);
	}

	async suggestJobsForResume(resumeId: number) {
		return (await this.client.get(`/suggest/for-resume/${resumeId}`)) as MatchingJobResult;
	}

	async suggestResumesForJob(jobId: number) {
		return await this.client.get(`/suggest/for-job/${jobId}`);
	}
}

export default new MatchingService() as MatchingService;