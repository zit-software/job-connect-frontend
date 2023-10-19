import { AddCompanyDTO, Company, updateCompanyDTO, updateCompanyImageDTO } from '@/models/Company';
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
	async updateCompany(id: number, updateCompanyDTO: updateCompanyDTO) {
		return await this.client.put(`/user/company/${id}`, updateCompanyDTO);
	}
	async getSelfCompany() {
		return (await this.client.get(`/company/self`)) as Company[];
	}
	async updateCompanyLogo(updateCompanyImageDTO: updateCompanyImageDTO) {
		const form = new FormData();
		form.append('image', updateCompanyImageDTO.image);
		return await this.client.put(`user/company/image/${updateCompanyImageDTO.companyId}`, form, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}
	async updateCompanyBanner(updateCompanyImageDTO: updateCompanyImageDTO) {
		const form = new FormData();
		form.append('image', updateCompanyImageDTO.image);
		return await this.client.put(`user/company/banner/${updateCompanyImageDTO.companyId}`, form, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}
}

export default new CompanyService() as CompanyService;
