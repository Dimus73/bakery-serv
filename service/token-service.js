const jwt = require ('jsonwebtoken');
const {
	updateOrCreateRefreshToken,
	deleteRefreshToken,
} = require ('../modules/auth/authentication');

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign (payload, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn:'15s'});
		const refreshToken = jwt.sign (payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn:'1d'});
		return ( { accessToken, refreshToken} );
	}

	async saveRefreshToken (id, token) {
		const data = updateOrCreateRefreshToken (id, token);
	} 

	async deleteToken (token) {

		const tokenData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
		// console.log('Token data =>', tokenData);
		const data = deleteRefreshToken (tokenData.id);
		return data;
		
	}


}

module.exports = new TokenService ();