const express = require( 'express' );
const router = express.Router();
const authMiddelware = require ('../../middlware/AuthMiddlware')
const {
	RoleMiddleWare,
	RIGHTS,
} = require ('../../middlware/RoleMiddleWare')

const {
	_addTask,
	_updateTask,
	_getTask,
	_listTasks,
} = require ( '../../controllers/task/task')

const {
	_getTaskResource
} = require ( '../../controllers/task/resource' )


router.post ( '/',                RoleMiddleWare([RIGHTS.ADMIN]), _addTask);
router.put  ( '/',                RoleMiddleWare([RIGHTS.ADMIN]), _updateTask);
router.get  ( '/:id',             RoleMiddleWare([RIGHTS.ADMIN]), _getTask);
router.get  ( '/',                RoleMiddleWare([RIGHTS.ADMIN]), _listTasks);
router.get  ( '/resource/:id',    RoleMiddleWare([RIGHTS.ADMIN]), _getTaskResource);

module.exports = {
	router
}
