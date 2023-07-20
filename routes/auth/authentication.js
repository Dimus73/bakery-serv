const express = require('express');
const router = express.Router();
const {check, body} = require ('express-validator')
const authMiddelware = require ('../../middlware/AuthMiddlware')
const {
	RoleMiddleWare,
	RIGHTS,
} = require ('../../middlware/RoleMiddleWare')


const {
	_getAllUsers,
	_addUser,
	_logIn,
	_logOut,
} = require ('../../controllers/auth/authentication');

router.get ( '/', _getAllUsers );
router.post ( '/registration',
body('username').trim().isLength( {min:4, max:12}),
body('password').trim().isLength( {min:4, max:12}),
 _addUser) ;
// router.post ( '/registration',[
// 	RoleMiddleWare([RIGHTS.ADMIN]),
// 	check ( 'username', 'Username cannot be empty').notEmpty(),
// 	check ( 'password', 'Password must not be less than 4 characters and not more than 12').isLength({min:4, max:12})
// ], _addUser) ;
router.post ('/login', _logIn);
router.post ('/logout', _logOut);
router.get  ('/refresh',)

module.exports = {
	router
} 