const express = require( 'express' );
const router = express.Router();
const authMiddelware = require ('../../middlware/AuthMiddlware')
const {
	RoleMiddleWare,
	RIGHTS,
} = require ('../../middlware/RoleMiddleWare')

const {
	_addRecipe,
	_allRecipe,
	_recipeDetail
} = require( '../../controllers/recipe/recipe')


router.post( '/',    RoleMiddleWare([RIGHTS.ADMIN]), _addRecipe);
router.get ( '/',    RoleMiddleWare([RIGHTS.ADMIN]), _allRecipe);
// router.get ( '/:id',  _recipeDetail);
router.get ( '/:id', RoleMiddleWare([RIGHTS.ADMIN]), _recipeDetail);

module.exports = {
	router
}
