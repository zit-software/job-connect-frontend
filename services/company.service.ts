import { AddCompanyDTO, Company } from '@/models/Company';
import createHttpClient from '@/utils/createHttpClient';
import { AxiosInstance } from 'axios';

class CompanyService {
	private client: AxiosInstance;

	constructor() {
		this.client = createHttpClient('');
	}

	async getCompanyById(id: number) {
		return (await this.client.get(`/company/${id}`)) as Company;
	}
	async createCompany(addCompanyDTO: AddCompanyDTO) {
		return (await this.client.post(`/user/company`, addCompanyDTO)) as Company;
	}
	async updateCompany(id: string) {
		return await this.client.put(`/company/${id}`);
	}
	async getSelfCompany() {
		return (await this.client.get(`/company/self`)) as Company[];
	}
}

export default new CompanyService() as CompanyService;
