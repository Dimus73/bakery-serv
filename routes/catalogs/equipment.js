const express = require( 'express' );
const router = express.Router();
const authMiddelware = require ('../../middlware/AuthMiddlware')
const {
	RoleMiddleWare,
	RIGHTS,
} = require ('../../middlware/RoleMiddleWare')

const {
	_getAllEquipment,
	_addEquipment,
	_updateEquipment
} = require ('../../controllers/catalogs/equipment');

router.get ( '/', RoleMiddleWare ([RIGHTS.USER]), _getAllEquipment );
//router.get ( '/', authMiddelware, _getAllEquipment );
router.post ( '/', RoleMiddleWare ([RIGHTS.USER]), _addEquipment );
router.put ( '/', RoleMiddleWare ([RIGHTS.USER]), _updateEquipment );

module.exports = {
	router
}

