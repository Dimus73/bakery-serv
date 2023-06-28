 const {secret_key} = require('../config/secret');
 const jwt = require('jsonwebtoken');

 const generateAccessToken = (id, roles) =>{
	const payload = {
		id,
		roles
	}

	return jwt.sign ( payload, secret_key.secret, {expiresIn:'24h'} )

 }

 module.exports = {
	generateAccessToken,
 }