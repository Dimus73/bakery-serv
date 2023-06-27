const express = require( 'express' );
const router = express.Router();

const {
	_getAllEquipment,
	_addEquipment,
	_updateEquipment
} = require ('../../controllers/catalogs/equipment');

router.get ( '/', _getAllEquipment );
router.post ( '/', _addEquipment );
router.put ( '/', _updateEquipment );

module.exports = {
	router
}

