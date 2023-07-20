const bcrypt = require('bcryptjs');
const {generateAccessToken} = require( '../../utils/generateAccessToken');
const {validationResult} = require ( 'express-validator' );
const UserService = require ('../../service/user-service');
const ApiError = require ('../../exeptions/api-error');


const {
	getAllUsers,
	addUser,
	addUserRole,
	getUserByUserName,
	getUserRoles,
} = require ('../../modules/auth/authentication')

const {secret_key} = require ('../../config/secret');
const userService = require('../../service/user-service');

const _getAllUsers = (req, res) => {
	getAllUsers()
	.then (data => res.json(data.rows))
	.catch ( err => {
		console.log(err);
		res.status( 404 ).json( {msg:err.message} )
	})
}
 
const _addUser = async (req, res, next) => { 
	try {
		const validationError = validationResult (req);
		if (!validationError.isEmpty()) {
			return next(ApiError.BadRequest("The username or password does not match the conditions.", validationError.array()))
		}
		const {username, password} = req.body
		const userData = await UserService.registration (username, password);
		res.cookie ('refreshToken', userData.refreshToken, { maxAge:1*24*60*60*1000, httpOnly:true });
		res.json(userData);
	} catch (error) { 
		console.log('Error From _addUser=>', error);
		next(error);
	}
}

const _logIn = async (req, res, next) => {
	try {

		const {username, password} = req.body
		const userData = await UserService.login (username, password);
		res.cookie ('refreshToken', userData.refreshToken, { maxAge:1*24*60*60*1000, httpOnly:true });
		res.json(userData);
	
	} catch (error) {
	
		console.log('Error From _logIn=>', error);
		next(error);

	}
}

const _logOut = async (req, res, next) => {
	try {
		
		const {refreshToken} = req.cookies;
		const token = await userService.logout(refreshToken);
		res.clearCookie('refreshToken');
		res.json(token);

	} catch (error) {

		console.log('Error From _logIn=>', error);
		next(error);

	}
} 

const _refreshToken = async (res, req, next) {
	try {

		const {refreshToken} = req.cookies;
		const userData = await UserService.refresh (refreshToken);
		res.cookie ('refreshToken', userData.refreshToken, { maxAge:1*24*60*60*1000, httpOnly:true });
		res.json(userData);

	} catch (error) {

		console.log('Error From _logIn=>', error);
		next(error);
		
	}
}

module.exports = {
	_getAllUsers,
	_addUser,
	_logIn,
	_logOut,
}