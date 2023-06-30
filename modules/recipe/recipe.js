const {pool} = require ('../../config/db')
const {db} = require ('../../config/db')

const addRecipe = (recipe) => {
	return db('recipes')
	.insert (recipe)
	.returning ('*')
}

const addRecipeIngredient = (ingredient) => {
	return db( 'recipe_ingred' )
	.insert (ingredient)
	.returning ('*')
}

const addRecipeEquipment = (equipment) => {
	return db( 'recipe_equip' )
	.insert (equipment)
	.returning ('*')
}

module.exports = {
	addRecipe,
	addRecipeIngredient,
	addRecipeEquipment,

}