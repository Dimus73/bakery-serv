const {pool} = require ('../../config/db')
const {db} = require ('../../config/db')

const getAllUsers = () => {
	return pool.query ( '\
	SELECT * \
	FROM users\
	' )
}

// const addUser = (username, password) => {
// 	return pool.query (`\
// 	INSERT INTO users (username, password)\
// 	VALUES ('${username}', '${password}')\
// 	`)
// }

const addUser = (username, password) => {
	return db('users')
	.insert({username, password})
	.returning ('*')
}

const getUserByUserName = (username) => {
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

const getUserRoles = (user_id) =>{
	return db('user_role')
	.select('role_id')
	.where({user_id})
}


module.exports = {
	getAllUsers,
	addUser,
	addUserRole,
	getUserByUserName,
	getUserRoles,
}