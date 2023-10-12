class TokenService {
	private _accessTokenKey = 'accessToken';
	private _accessToken = '';

	constructor() {
		this._accessToken = localStorage.getItem(this._accessTokenKey) || '';
	}

	get accessToken() {
		return this._accessToken;
	}

	set accessToken(value: string) {
		this._accessToken = value;
		localStorage.setItem(this._accessTokenKey, value);
	}
}

export default new TokenService() as TokenService;
