const jwt = require('jsonwebtoken')
const {secret_key} = require('../config/secret')
const RIGHTS = {
	USER:1,
	ADMIN:2
}


const RoleMiddleWare = (rolesAllow) => {
	return function (req, res, next) {
		try {
			// console.log('From MeddleWare =>', req.headers, rolesAllow);
			const token = req.headers.authorization.split(' ')[1]
			if (!token){
				console.log('User not authorized (from catch)');
				return res.status ( 400 ).json( {msg:'User not authorized (no token in request)'} )				
			}
			const decodedData = jwt.verify (token, secret_key.secret);
			const userRoles = decodedData.roles;
			let isAllow = false;
			userRoles.forEach(element => {
				if (rolesAllow.includes(element)){
					isAllow = true;
				}
			});
			if (!isAllow){
				console.log('User not authorized (from catch)');
				return res.status ( 400 ).json( {msg:'Insufficient rights to access'} )				
			}

			next();

		} catch (error) {
			console.log('User not authorized (from catch)');
			return res.status ( 400 ).json( {msg:'User not authorized (from catch)'} )			
		}
	}
}

module.exports = {
	RoleMiddleWare,
	RIGHTS,
}