// const { default: Ingredients } = require('../../../Front/bakery/src/Components/Catalog/Ingredients');
const {
	getAllEquipment,
	addEquipment,
	updateEquipment,
} = require ('../../modules/catalogs/equipment');

const _getAllEquipment = (req, res) => {
	console.log('Request from addEquipment:', req.user);
	getAllEquipment()
	.then( data => {
		res.json( data.rows )
	})
	.catch ( err => {
		console.log(err);
		res.status( 404 ).json( {msg:err.message} )
	})
}

const _addEquipment = (req, res) => {
	addEquipment( req.body )
	.then (data => {
		_getAllEquipment(req, res)
	})
	.catch ( err => {
		console.log(err);
		res.status( 404 ).json( {msg:err.message} )
	})

}

const _updateEquipment = (req, res) => {
	// console.log('Request from updateIngredient:', req.body);
	updateEquipment( req.body )
	.then ( data => {
		// console.log('Data after update:', data )
		_getAllEquipment (req, res)
	})
	.catch ( err => {
		console.log(err);
		res.status( 404 ).json( {msg:err.message} )
	})

}

module.exports = {
	_getAllEquipment,
	_addEquipment,
	_updateEquipment
} 