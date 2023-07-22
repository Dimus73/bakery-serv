const {pool} = require ('../../config/db')
const {db} = require ('../../config/db')

const getAllUsers = () => {
	return pool.query ( '\
	SELECT * \
	FROM users\
	' )
}

const addUser = (username, password) => {
	return db('users')
	.insert({username, password})
	.returning ('*')
}

const getUserByUserName = async (username) => {
	return db('users')
	.select ('id', 'username', 'password')
	.where ({username})
}

const addUserRole = (user_id, role_id=1) => {
	return pool.query (`\
	INSERT INTO user_role (user_id, role_id)\
	VALUES (${user_id}, ${role_id})\
	`)
}

const getUserRoles = async (user_id) =>{
	return db('user_role')
	.select('role_id')
	.where({user_id})
}

const updateOrCreateRefreshToken = async (id, refreshToken) => {
	const data = await db ('token_scheme')
	.select( '*' )
	.where ( {user_id:id} )
	// console.log('updateOrCreateRefreshToken=>', data);
	
	if ( data.length === 0 ) {
		return await db ('token_scheme')
		.insert ( {user_id:id, refresh_token:refreshToken} ) 
	} 
	
	return await db ('token_scheme')
	.where ({user_id:id})
	.update ( {user_id:id, refresh_token:refreshToken} )
	
}

const deleteRefreshToken = async (id) => {
	return await db ('token_scheme')
	.where ({user_id:id})
	.del()
	.returning('*');
}

const foundRefreshToken = async (token) => {
	// console.log('------ foundRefreshToken', token);
	return await db ('token_scheme')
	.select ('*')
	.where ({refresh_token:token})
}

module.exports = {
	getAllUsers,
	addUser,
	addUserRole,
	getUserByUserName,
	getUserRoles,
	updateOrCreateRefreshToken,
	deleteRefreshToken,
	foundRefreshToken,
}