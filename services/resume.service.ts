import { Resume } from '@/models/Resume';
import createHttpClient from '@/utils/createHttpClient';
import { AxiosInstance } from 'axios';

export interface CreateResumeRequestDto {
	jobTitle: string;
	content: string;
	skillIds: number[];
}

class ResumeService {
	private client: AxiosInstance;

	constructor() {
		this.client = createHttpClient('user/resume');
	}

	async create(body: CreateResumeRequestDto) {
		return (await this.client.post('', body)) as Resume;
	}
}

export default new ResumeService() as ResumeService;
