const express = require ('express');
const router = express.Router();
const authMiddelware = require ('../../middlware/AuthMiddlware')
const {
	RoleMiddleWare,
 	RIGHTS,
} = require ('../../middlware/RoleMiddleWare')

const {
	_addDocument,
	_allDocuments,
	_getDocumentDetail,
	_updateDocument,
	_getAllIngredientsWithQuantityAndCost,

} =require ('../../controllers/warehouse/warehouse')

router.post ('/',           RoleMiddleWare([RIGHTS.ADMIN]), _addDocument);
router.get  ('/',           RoleMiddleWare([RIGHTS.ADMIN]), _allDocuments);
router.get  ('/document/:id',        RoleMiddleWare([RIGHTS.ADMIN]), _getDocumentDetail);
router.put  ('/',           RoleMiddleWare([RIGHTS.ADMIN]), _updateDocument);
router.get  ('/ingrdetail', RoleMiddleWare([RIGHTS.ADMIN]), _getAllIngredientsWithQuantityAndCost);

module.exports = {
	router
}

