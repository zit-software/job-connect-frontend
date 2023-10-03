import HttpClient from "../utils/httpClient";

export interface LoginDTO {
  email: string;
  password: string;
}
export interface RegisterDTO {
  email: string;
  password: string;
}
export interface SocialLoginDTO {
  accessToken: string;
}

class AuthService {
  ROUTE = "/auth";
  async login(body: LoginDTO) {
    return HttpClient.post(`${this.ROUTE}/login`, body);
  }
  async register(body: RegisterDTO) {
    return HttpClient.post(`${this.ROUTE}/register`, body);
  }
  async socialLogin(body: SocialLoginDTO) {
    return HttpClient.post(`${this.ROUTE}/social-login`, body);
  }
}

export default new AuthService();
