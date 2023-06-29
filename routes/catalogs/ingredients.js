const express = require( 'express' );
const router = express.Router();
const authMiddelware = require ('../../middlware/AuthMiddlware')
const {
	RoleMiddleWare,
	RIGHTS,
} = require ('../../middlware/RoleMiddleWare')


const {
	_getAllIngredients,
	_addIngredient,
	_updateIngredients,
} = require ('../../controllers/catalogs/ingredients');

router.get ( '/', RoleMiddleWare ([RIGHTS.USER]), _getAllIngredients );
router.post ( '/', RoleMiddleWare ([RIGHTS.USER]), _addIngredient );
router.put ( '/', RoleMiddleWare ([RIGHTS.USER]), _updateIngredients );

module.exports = {
	router
}