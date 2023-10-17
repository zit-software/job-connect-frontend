import authService from '@/services/auth.service';
import tokenService from '@/services/token.service';
import axios from 'axios';

const createHttpClient = (baseUrl: string = '') => {
	const client = axios.create({
		baseURL: `${process.env.NEXT_PUBLIC_API_URL}/${baseUrl}`,
	});

	client.interceptors.request.use(async (config) => {
		const now = new Date();
		const tokenExpiratedAt = tokenService.expiratedAt;

		if (
			tokenExpiratedAt < now &&
			!config.url?.endsWith('refresh-token') &&
			tokenService.refreshToken
		) {
			console.log('refresh token');

			const { accessToken, expirationTime } =
				await authService.refreshToken({
					refreshToken: tokenService.refreshToken,
				});

			tokenService.accessToken = accessToken;
			tokenService.expiratedAt = expirationTime;
		}

		if (tokenService.accessToken)
			config.headers.Authorization = `Bearer ${tokenService.accessToken}`;

		return config;
	});

	client.interceptors.response.use(
		(res) => res.data,
		async (error) => {
			throw error.response?.data || error;
		},
	);

	return client;
};

export default createHttpClient;
