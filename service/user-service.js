
const {
	getUserByUserName,
	getUserRoles,
	addUser,
	addUserRole,
} = require ('../modules/auth/authentication')
const TokenService = require ('./token-service')
const UserDto = require ('../dtos/user-dto');
const bcrypt = require('bcryptjs');
const ApiError = require ('../exeptions/api-error');

class UserService {

	async registration (userName, password) {
		const candidate = await getUserByUserName (userName);
		console.log('getUserByUserName =>', candidate);
		if ( candidate.length !== 0 ) {
			console.log("From UserService (registration): User name not unique!");
			throw ApiError.BadRequest(`User with username ${userName} is already exist in data base`);
		}

		const hashPassword = bcrypt.hashSync(password, 10);
		const user = await addUser (userName, hashPassword);

		const userRole = await addUserRole (user[0].id, 1);

		const userDto = new UserDto ( 
			{
				id:user[0].id,
				userName,
				roleList:[1]
			}
		);
		
		const tokens = TokenService.generateTokens( { ...userDto} );
		await TokenService.saveRefreshToken (userDto.id, tokens.refreshToken);
		
		return ({...tokens , user: userDto})	
	}

	async login (userName, password) {
		const candidate = await getUserByUserName (userName);
		if ( candidate.length === 0 ) {
			console.log("From UserService (login): Username not found!");
			throw ApiError.BadRequest('Username not found');	
		}

		const isValidPassword = bcrypt.compareSync (password, candidate[0].password);
		if (!isValidPassword) {
			console.log("From UserService (login): Password not valid");
			throw ApiError.BadRequest('Password not valid');	
		}

		const rolesFromBase = await getUserRoles (candidate[0].id);
		const roleList = rolesFromBase.map ((value) => value.role_id);

		const userDto = new UserDto ( 
			{
				id:candidate[0].id,
				userName,
				roleList
			}
		);
		
		const tokens = TokenService.generateTokens( { ...userDto} );
		await TokenService.saveRefreshToken (userDto.id, tokens.refreshToken);
		
		return ({...tokens , user: userDto})	
	}

}

module.exports = new UserService();