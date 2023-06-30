const express = require( 'express' );
const router = express.Router();
const authMiddelware = require ('../../middlware/AuthMiddlware')
const {
	RoleMiddleWare,
	RIGHTS,
} = require ('../../middlware/RoleMiddleWare')

const {
	_addRecipe,
} = require( '../../controllers/recipe/recipe')


router.post( '/', _addRecipe);

module.exports = {
	router
}
