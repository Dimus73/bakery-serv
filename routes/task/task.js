const express = require( 'express' );
const router = express.Router();
const authMiddelware = require ('../../middlware/AuthMiddlware')
const {
	RoleMiddleWare,
	RIGHTS,
} = require ('../../middlware/RoleMiddleWare')

const {
	_addTask,
	_updateTask,
	_getTask,
} = require( '../../controllers/task/task')


router.post ( '/',    RoleMiddleWare([RIGHTS.ADMIN]), _addTask);
router.put  ( '/',    RoleMiddleWare([RIGHTS.ADMIN]), _updateTask);
router.get  ( '/:id', RoleMiddleWare([RIGHTS.ADMIN]), _getTask);
// router.get ( '/',    RoleMiddleWare([RIGHTS.ADMIN]), _allRecipe);
// // router.get ( '/:id',  _recipeDetail);
// router.get ( '/:id', RoleMiddleWare([RIGHTS.ADMIN]), _recipeDetail);
// router.put ( '/',  _recipeUpdate);

module.exports = {
	router
}
