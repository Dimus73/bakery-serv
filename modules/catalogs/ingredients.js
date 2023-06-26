const {pool} = require ('../../config/db')

const getAllIngredients = () => {
	return pool.query ('\
		SELECT ingredients.id, name, unit_id, unit_name, unit_short_name, active\
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

const updateIngredients = (item) => {

	return pool.query (`\
	UPDATE ingredients\
	SET name='${item.name}', unit_id=${item.unit_id}, active=${item.active} \
	WHERE id=${item.id}\
	`)
}


module.exports = {
	getAllIngredients,
	addIngredient,
	updateIngredients,
}