const express = require( 'express' );
const router = express.Router();
const authMiddelware = require ('../../middlware/AuthMiddlware')
const {
	RoleMiddleWare,
	RIGHTS,
} = require ('../../middlware/RoleMiddleWare')

const {
	_addTask,
} = require( '../../controllers/task/task')


router.post( '/',    RoleMiddleWare([RIGHTS.ADMIN]), _addTask);
// router.get ( '/',    RoleMiddleWare([RIGHTS.ADMIN]), _allRecipe);
// // router.get ( '/:id',  _recipeDetail);
// router.get ( '/:id', RoleMiddleWare([RIGHTS.ADMIN]), _recipeDetail);
// router.put ( '/',  _recipeUpdate);

module.exports = {
	router
}
