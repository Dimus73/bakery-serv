const {pool} = require ('../../config/db')

const getAllIngredients = () => {
	return pool.query ('\
		SELECT name, unit_name, unit_short_name, active\
		FROM ingredients \
		LEFT JOIN units on unit_id = units.id \
		WHERE active\
		ORDER BY name \
	')
}

const addIngredient = (item) => {
	// console.log('In module:', `\
	// INSERT INTO ingredients (name, unit_id)\
	// VALUES ("${item.name}", ${item.unit_id})\ 
	// ` );
	return pool.query(`\
	INSERT INTO ingredients (name, unit_id)\
	VALUES ('${item.name}', ${item.unit_id})\ 
	`)
}

module.exports = {
	getAllIngredients,
	addIngredient,
}