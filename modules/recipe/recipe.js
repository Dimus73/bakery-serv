const {pool} = require ('../../config/db')
const {db} = require ('../../config/db')

// **********************  For create new Recipe
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


// **********************  Get list of All Recipe
const allRecipes = () => {
	return db( 'recipes' )
	.select ('*');
}

// **********************  FOR get Recipe detail 
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

// ********************** For UPDATING Recipe
const updateRecipe = (id, recipe) => {
	return db('recipes')
	.where ('id',id)
	.update (recipe)
}

const deleteIngredient = (id) => {
	return db('recipe_ingred')
	.where ('recipe_id', id)
	.del()
}

const deleteEquipment = (id) => {
	return db('recipe_equip')
	.where ('recipe_id', id)
	.del()
}


module.exports = {
	addRecipe,
	addRecipeIngredient,
	addRecipeEquipment,
	allRecipes,
	recipeDetail,
	recipeIngredients,
	recipeEquipments,
	updateRecipe,
	deleteIngredient,
	deleteEquipment,

}