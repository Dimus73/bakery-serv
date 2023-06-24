const express = require( 'express' );
const router = express.Router();

const {
	_getAllIngredients
} = require ('../../controllers/catalogs/ingredients')

router.get ('/', _getAllIngredients)

module.exports = {
	router
}