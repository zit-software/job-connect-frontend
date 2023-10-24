class UrlService {
	getExternalUrl(url: string) {
		return `/url?to=${url}`;
	}
}

export default new UrlService() as UrlService;
