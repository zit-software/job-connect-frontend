import createHttpClient from '@/utils/createHttpClient';
import { AxiosInstance } from 'axios';

class CompanyService {
	private client: AxiosInstance;

	constructor() {
		this.client = createHttpClient('company');
	}

	async getCompanyById(id: string) {
		return await this.client.get(`/${id}`);
	}
}

export default new CompanyService() as CompanyService;
