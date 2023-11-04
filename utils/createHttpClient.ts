import { RefreshTokenResponseDto } from '@/services/auth.service';
import tokenService from '@/services/token.service';
import axios from 'axios';
import qs from 'qs';

const createHttpClient = (baseUrl: string = '') => {
	const client = axios.create({
		baseURL: `${process.env.NEXT_PUBLIC_API_URL}/${baseUrl}`,
		paramsSerializer: (p) => {
			return qs.stringify(p, { arrayFormat: 'repeat' });
		},
	});

	client.interceptors.request.use(async (config) => {
		const now = new Date().getTime();
		const tokenExpiratedAt = tokenService.expiratedAt;

		const isRefreshToken = config.url?.endsWith('refresh-token');

		if (tokenExpiratedAt < now && !isRefreshToken && tokenService.refreshToken) {
			try {
				const { accessToken, expirationTime } = (
					await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
						refreshToken: tokenService.refreshToken,
					})
				).data as RefreshTokenResponseDto;

				tokenService.accessToken = accessToken;
				tokenService.expiratedAt = expirationTime;
			} catch (error) {
				tokenService.clear();
			}
		}

		if (tokenService.accessToken && !isRefreshToken)
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
