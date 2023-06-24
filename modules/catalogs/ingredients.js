const {pool} = require ('../../config/db')

const getAllIngredients = () => {
	return pool.query ('\
		SELECT name, unit_name, unit_short_name\
		FROM ingredients \
		LEFT JOIN units on unit_id = units.id \
		ORDER BY name \
	')
}

module.exports = {
	getAllIngredients,
}