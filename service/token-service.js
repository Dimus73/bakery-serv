const jwt = require ('jsonwebtoken');
const {updateOrCreateRefreshToken} = require ('../modules/auth/authentication');

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign (payload, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn:'15s'});
		const refreshToken = jwt.sign (payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn:'1d'});
		return ( { accessToken, refreshToken} );
	}

	async saveRefreshToken (id, token) {
		const data = updateOrCreateRefreshToken (id, token);
	} 
}

module.exports = new TokenService ();