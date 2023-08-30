import HttpClient from "../utils/httpClient";

export interface LoginDTO {
  email: string;
  password: string;
}

export const login = (body: LoginDTO) => {
  return HttpClient.post("/auth/login");
};
