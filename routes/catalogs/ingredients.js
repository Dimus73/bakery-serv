const express = require( 'express' );
const router = express.Router();

const {
	_getAllIngredients,
	_addIngredient
} = require ('../../controllers/catalogs/ingredients');

router.get ( '/', _getAllIngredients );
router.post ( '/', _addIngredient );

module.exports = {
	router
}