const express = require( 'express' );
const router = express.Router();

const {
	_getAllUnits
} = require( '../../controllers/catalogs/units')

router.get( '/', _getAllUnits)

module.exports = {
	router
}
