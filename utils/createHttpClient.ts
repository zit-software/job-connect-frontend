import tokenService from '@/services/token.service';
import axios from 'axios';

const createHttpClient = (baseUrl: string = '') => {
	const client = axios.create({
		baseURL: `${process.env.NEXT_PUBLIC_API_URL}/${baseUrl}`,
	});

	client.interceptors.request.use((config) => {
		config.headers.Authorization = `Bearer ${tokenService.accessToken}`;

		return config;
	});

	client.interceptors.response.use(
		(res) => res.data,
		(error) => {
			throw error.response?.data || error;
		},
	);

	return client;
};

export default createHttpClient;
