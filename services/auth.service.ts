import { UserState } from '@/store/user';
import createHttpClient from '@/utils/createHttpClient';
import { AxiosInstance } from 'axios';

export interface LoginDto {
	email: string;
	password: string;
}
export interface RegisterRequestDto {
	userRole: 'APPLICANT' | 'RECRUITER';
	fullName: string;
	phoneNumber: string;
	accessToken: string;
}

export interface RegisterResponseDto {
	accessToken: string;
}

export interface SocialLoginDto {
	accessToken: string;
}

export interface CheckUserRequestDto {
	accessToken: string;
}

export interface CheckUserResponseDto {
	isUser: boolean;
}

class AuthService {
	private client: AxiosInstance;

	constructor() {
		this.client = createHttpClient('auth');
	}

	async login(body: LoginDto) {
		return this.client.post('/login', body);
	}

	async register(body: RegisterRequestDto) {
		return (await this.client.post(
			'/register',
			body,
		)) as RegisterResponseDto;
	}

	async socialLogin(body: SocialLoginDto) {
		return this.client.post('/social-login', body);
	}

	async checkUser(body: CheckUserRequestDto) {
		return (await this.client.post(
			'/check-user',
			body,
		)) as CheckUserResponseDto;
	}

	async identify() {
		return (await this.client.get('/identity')) as UserState;
	}
}

export default new AuthService() as AuthService;
