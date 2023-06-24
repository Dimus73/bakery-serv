const {
	getAllIngredients,
} = require ('../../modules/catalogs/ingredients');

const _getAllIngredients = (req, res) => {
	getAllIngredients()
	.then( data => {
		res.json( data.rows )
	})
	.catch ( err => {
		console.log(err);
		res.status( 404 ).json( {msg:err.message} )
	})
}


module.exports = {
	_getAllIngredients
} 