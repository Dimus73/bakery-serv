const express = require( 'express' );
const router = express.Router();

const {
	_getAllIngredients,
	_addIngredient,
	_updateIngredients,
} = require ('../../controllers/catalogs/ingredients');

router.get ( '/', _getAllIngredients );
router.post ( '/', _addIngredient );
router.put ( '/', _updateIngredients );

module.exports = {
	router
}