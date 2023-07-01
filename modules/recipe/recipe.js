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

const allRecipes = () => {
	return db( 'recipes' )
	.select ('*');
}

const recipeDetail = (id) => {
	return db( 'recipes' )
	.select ('*')
	.where ({id})

}

const recipeIngredients = (id) => {
	return db( 'recipe_ingred' )
	.select ('*')
	.where ({recipe_id:id})
}

const recipeEquipments = (id) => {
	return db( 'recipe_equip' )
	.select ('*')
	.where ({recipe_id:id})
}

module.exports = {
	addRecipe,
	addRecipeIngredient,
	addRecipeEquipment,
	allRecipes,
	recipeDetail,
	recipeIngredients,
	recipeEquipments

}