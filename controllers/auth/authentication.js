const bcrypt = require('bcryptjs');

const {generateAccessToken} = require( '../../utils/generateAccessToken');

const {validationResult} = require ( 'express-validator' );

const {
	getAllUsers,
	addUser,
	addUserRole,
	getUserByUserName,
	getUserRoles,
} = require ('../../modules/auth/authentication')

const {secret_key} = require ('../../config/secret')

const _getAllUsers = (req, res) => {
	getAllUsers()
	.then (data => res.json(data.rows))
	.catch ( err => {
		console.log(err);
		res.status( 404 ).json( {msg:err.message} )
	})
}

const _addUser =(req, res) => { 
	const v_error = validationResult (req);
	if (!v_error.isEmpty()){
		return res.status(400).json({msj:'Error during registration. (login cannot be empty, password must be from 4 to 12 characters)' ,v_error})
	}
	const {username, password} = req.body
	getAllUsers ()
	.then (data => {
		// console.log(data);
		const candidate = data.rows.filter ((value) => value.username === username)
		if (candidate.length !== 0) {
			console.log("User name not unique!");
			res.status( 404 ).json( {msg:'User name not unique!'} )
		} 
		else{
			const hashPassword = bcrypt.hashSync(password, 10);
			addUser (username, hashPassword)
			.then (data => {
				console.log('New user data=>', data);
				addUserRole (data[0].id, 1)
				.then (data_role => res.status(200).json({ msg:'User added successful.' })) 
				.catch ( err => {
					console.log(err);
					res.status(404).json( { msg:err.message })
				} )
			})
			.catch ( err => {
				console.log(err);
				res.status(404).json( { msg:err.message })
			} )
		}
	})
	.catch ( err => {
		console.log(err);
		res.status( 404 ).json( {msg:err.message} )
	})

}

const _logIn = async (req, res) => {
	try {
		const {username, password} = req.body
		const user = await getUserByUserName (username);

		if (user.length === 0) {
			console.log(`User with name --${username}-- is not found`);
			return res.status( 400 ).json ( {msg:`User with name --${username}-- is not found`} );
		}
		
		const isValidPassword = bcrypt.compareSync (password, user[0].password);
		if (!isValidPassword) {
			console.log(`Invalid user password`);
			return res.status( 400 ).json ( {msg:`Invalid user password`} );
		}
		const rolesFromBase = await getUserRoles (user[0].id);
		const rolesList = rolesFromBase.map ((value) => value.role_id);

		const token = generateAccessToken (user[0].id, rolesList);
		return res.json({
			token,
			userId: user[0].id,
			rolesList,
			username
		})

	} catch (error) {
		console.log(error);
		return res.status( 400 ).json({msg:"Login error"}) 
	}
}

module.exports = {
	_getAllUsers,
	_addUser,
	_logIn,
}