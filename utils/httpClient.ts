import axios from 'axios';
import { request } from 'http';
const baseURL = `${process.env.HOST || 'http://localhost:8080'}/api/v1`;
const HttpClient = axios.create({
	baseURL,
});

HttpClient.interceptors.request.use((request) => {
	const expiration = localStorage.getItem('expiration');
	console.log(new Date(expiration ? expiration : 0 - 1000000000));
	if (expiration && new Date(+expiration - 1000000000) < new Date()) {
		axios.post(`${baseURL}/auth/refresh-token`).then((res) => {
			localStorage.setItem('expiration', res.data.expiration);
		});
	}

	return request;
});
export default HttpClient;
