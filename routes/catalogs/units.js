const express = require( 'express' );
const router = express.Router();

const {
	_getAllUnits
} = require( '../../controllers/catalogs/units')

router.get( '/units', _getAllUnits)

module.exports = {
	router
}
