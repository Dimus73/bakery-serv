const {
	getAllUnits,
} = require( '../../modules/catalogs/units' );

const _getAllUnits = ( req, res) => {
	getAllUnits()
	.then( data => {
		res.json( data.rows );
	})
	.catch(err => {
		console.log ( err );
		res.status( 405 ).json( {msg:err.message} )
	})
}

module.exports = {
	_getAllUnits
}