const {db, pool} = require( '../../config/db');

// const getAllUnits = () => {
// 	console.log('In module');
// 	return db( 'units' )
// 	.select ('id', 'unit_name')
// 	.orderBy ('unit_name')
// }

const getAllUnits = () => {
	return pool.query (
		'SELECT id, unit_name, unit_short_name \
		 FROM units \
		 ORDER BY unit_name'
		)
}

module.exports = {
	getAllUnits
}