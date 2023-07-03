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
// const recipeDetail = (id) => {
// 	return db( 'recipes' )
// 	.select ('*')
// 	.where ({id})
// }

const recipeDetail = (id) =>{
	return pool.query (`\
	SELECT recipes.id, name, unit_id, semifinished, description, img, finish_quantity, creator, unit_id, units.unit_short_name as unit_name \
	FROM recipes \
	LEFT JOIN units ON recipes.unit_id = units.id
	WHERE recipes.id = ${id} \
	`)
}

// const recipeIngredients = (id) => {
// 	return db( 'recipe_ingred' )
// 	.select ('*')
// 	.where ({recipe_id:id})
// }

const recipeIngredients = (id) => {
	return pool.query (`\
	SELECT recipe_ingred.id, ingredient_id, quantity, recipe_id, creator, time_st, units.unit_short_name as unit_name, ingredients.name as ingredients_name \
	FROM 	recipe_ingred \
	LEFT JOIN ingredients ON recipe_ingred.ingredient_id = ingredients.id \
	LEFT JOIN units ON ingredients.unit_id = units.id \
	WHERE recipe_id=${id} \
	`)
}

// const recipeEquipments = (id) => {
// 	return db( 'recipe_equip' )
// 	.select ('*')
// 	.where ({recipe_id:id})
// }

const recipeEquipments = (id) => {
	return pool.query( `\
	SELECT recipe_equip.id, equipment_id, recipe_equip.quantity, creator, time_st, recipe_id, equipment as equipment_name \
	FROM recipe_equip \
	LEFT JOIN equipment on equipment_id = equipment.id \
	WHERE recipe_id = ${id} \
	` )
	
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