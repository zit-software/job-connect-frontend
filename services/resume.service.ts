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
	private userClient: AxiosInstance;

	constructor() {
		this.client = createHttpClient('resume');
		this.userClient = createHttpClient('user/resume');
	}

	async create(body: CreateResumeRequestDto) {
		return (await this.userClient.post('', body)) as Resume;
	}

	async getAllMyResumes() {
		return (await this.userClient.get('')) as Resume[];
	}

	async getResumeById(id: number) {
		return (await this.client.get(`/${id}`)) as Resume;
	}

	async updateResumeById(id: number, body: Resume) {
		return (await this.userClient.put(`/${id}`, { ...body, skillIds: body.skills.map((e) => e.id) })) as Resume;
	}

	async deleteResumeById(id: number) {
		return await this.userClient.delete(`/${id}`);
	}
}

export default new ResumeService() as ResumeService;
