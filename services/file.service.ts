import { FileModel } from '@/models/File';
import createHttpClient from '@/utils/createHttpClient';
import { AxiosInstance } from 'axios';

export interface UploadFileRequestDto {
	name: string;
	file: File;
}

class FileService {
	private userClient: AxiosInstance;

	constructor() {
		this.userClient = createHttpClient('user/file');
	}

	getFileUrl(id: string) {
		return `${process.env.NEXT_PUBLIC_API_URL}/file/${id}`;
	}

	async uploadFile(body: UploadFileRequestDto) {
		const form = new FormData();

		form.append('file', body.file);
		form.append('fileName', body.name);

		return await this.userClient.post('', form, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}

	async getAllFiles() {
		return (await this.userClient.get('')) as FileModel[];
	}
}

export default new FileService() as FileService;
