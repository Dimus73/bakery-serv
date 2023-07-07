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
	_updateDocument
} =require ('../../controllers/warehouse/warehouse')

router.post ('/',     RoleMiddleWare([RIGHTS.ADMIN]), _addDocument);
router.get  ('/',     RoleMiddleWare([RIGHTS.ADMIN]), _allDocuments);
router.get  ('/:id',  RoleMiddleWare([RIGHTS.ADMIN]), _getDocumentDetail);
router.put  ('/',  RoleMiddleWare([RIGHTS.ADMIN]), _updateDocument);

module.exports = {
	router
}

