class FileService {
	getFileUrl(id: string) {
		return `${process.env.NEXT_PUBLIC_API_URL}/file/${id}`;
	}
}

export default new FileService() as FileService;
