const jwt = require('jsonwebtoken')
const {secret_key} = require('../config/secret')

module.exports = function (req, res, next) {
	if (req.method === 'OPTIONS') {
		next();
	}
	try {
		const token = req.headers.authorization.split (' ')[1]
		if (!token) {
			return res.status(404).json({msg:"User not authorized"})
		}
		const decodedDate = jwt.verify ( token, secret_key.secret )
		req.user = decodedDate;
		next();


	} catch (error) {
		console.log(error);
		return res.status(404).json({msg:"User not authorized (from catch)"})
		
	}

}