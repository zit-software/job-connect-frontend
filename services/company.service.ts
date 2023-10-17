import createHttpClient from '@/utils/createHttpClient';
import { AxiosInstance } from 'axios';

class CompanyService {
	private client: AxiosInstance;

	constructor() {
		this.client = createHttpClient('');
	}

	async getCompanyById(id: string) {
		return await this.client.get(`/company/${id}`);
	}
	async createCompany() {
		return await this.client.post(`/user/company`);
	}
	async updateCompany(id: string) {
		return await this.client.put(`/company/${id}`);
	}
}

export default new CompanyService() as CompanyService;
