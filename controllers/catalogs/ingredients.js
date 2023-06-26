// const { default: Ingredients } = require('../../../Front/bakery/src/Components/Catalog/Ingredients');
const {
	getAllIngredients,
	addIngredient,
} = require ('../../modules/catalogs/ingredients');

const {
	getAllUnits,
} = require ('../../modules/catalogs/units')

const _getAllIngredients = (req, res) => {
	getAllIngredients()
	.then( data => {
		// getAllUnits()
		// // .then( units => {ingredients:data, units})
		// .then( units => {
		// 	console.log('Units:', units.rows);
		// 	return {ingredients:data.rows, units:units.rows}})
		// .then( dataCombine => {
		// 	console.log('Data combine', dataCombine);
		// 	res.json(dataCombine)})
		res.json( data.rows )
	})
	.catch ( err => {
		console.log(err);
		res.status( 404 ).json( {msg:err.message} )
	})
}

const _addIngredient = (req, res) => {
	console.log('Request from addIngredient:', req.body);
	addIngredient( req.body )
	.then (data => {
		console.log('Data after update:', data )
		_getAllIngredients(req, res)
	})
}

module.exports = {
	_getAllIngredients,
	_addIngredient
} 