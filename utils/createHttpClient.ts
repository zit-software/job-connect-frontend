import axios from 'axios';

const createHttpClient = (baseUrl: string = '') => {
	const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/${baseUrl}`;
	const client = axios.create({
		baseURL,
	});

	client.interceptors.request.use((request) => {
		const expiration = localStorage.getItem('expiration');
		console.log(new Date(expiration ? expiration : 0 - 1000000000));
		if (expiration && new Date(+expiration - 1000000000) < new Date()) {
			axios
				.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`)
				.then((res) => {
					localStorage.setItem('expiration', res.data.expiration);
				});
		}

		return request;
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
