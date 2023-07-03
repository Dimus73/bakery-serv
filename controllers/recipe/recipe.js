const {
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
} = require ('../../modules/recipe/recipe')


	// *********************** Crate new recipe

const _addRecipe = (req, res) => {
	const data= req.body
	const timeStamp = new Date()

	// console.log('Data=>', data)


	const recipe =  {
		name : data.name,
		finish_quantity : data.finish_quantity,
		unit_id : data.unit_id,
		semifinished : data.semifinished,
		description : data.description,
		// img : data.imgURL,
		img : data.img,
		creator : data.creator,
		time_st : timeStamp 
	}

	addRecipe (recipe)
	.then ( 
		(dRecipe) => {
			// console.log('Recipe=>', dRecipe)
			if (data.ingredients.length >0 ){
				const ingredients = data.ingredients.map(value => ({
					ingredient_id : value.ingredient_id,
					quantity : value.quantity,
					recipe_id : dRecipe[0].id,
					creator : data.creator,
					time_st : timeStamp
				}))
				addRecipeIngredient(ingredients)
				.then (ingData => console.log('Ingedients =>', ingData));
			}

			if (data.equipments.length > 0){
				const equipments = data.equipments.map ((value) =>({
					equipment_id : value.equipment_id,
					quantity : value.quantity,
					recipe_id : dRecipe[0].id,
					creator : data.creator,
					time_st : timeStamp 					
				}))
				// console.log('Ingedients =>', ingredients);
				addRecipeEquipment(equipments)
				.then (ingEquip => console.log('Equipment =>', ingEquip));
			}
		}
	)
	.catch (err => {
		console.log(err);
		res.status (400).json({msg:err.message})
	})
	// console.log(data);
	// res.json({data})
 }

const _allRecipe = (req, res) => {
	allRecipes()
	.then (data => res.json(data))
	.catch (err => {
		console.log(err);
		res.status (400).json({msg:err.message})
	})
}

const _recipeDetail = async (req, res) => {
	const id = req.params.id;

	try {
		const recipeRows = await recipeDetail (id);
		const recipe = recipeRows.rows
		console.log('Recipe detail =>', recipe);

		const ingredients = await recipeIngredients (id);
		// console.log('Ingredient detail =>', ingredients.rows);
		
		const equipments = await recipeEquipments (id);
		// console.log('Equipment detail =>', equipments);
		
		// const fullRecipe = [...recipe]
		// fullRecipe[0].ingredients = [...ingredients];
		// fullRecipe[0].equipments = [...equipments];
		// console.log('Recipe FULL detail =>', fullRecipe);

		recipe[0].ingredients = [...ingredients.rows];
		recipe[0].equipments = [...equipments.rows];
		// console.log('Recipe FULL detail =>', recipe);

		
		res.json(recipe[0]);

	} catch (error) {
		console.log(error);
		res.status( 400 ).json ({msg:error.message})
	}
}

// *********************** Updating recipe
const _recipeUpdate = async (req, res) => {
	const data= req.body
	const timeStamp = new Date()

	// console.log('Data=>', data)

	const recipe =  {
		name : data.name,
		finish_quantity : data.finish_quantity,
		unit_id : data.unit_id,
		semifinished : data.semifinished,
		description : data.description,
		// img : data.imgURL,
		img : data.img,
		creator : data.creator,
		time_st : timeStamp 
	}

	console.log('Data=>', data)
 
	try {
		const update = await updateRecipe (data.id, recipe);
		const deleteIngred = await deleteIngredient (data.id);
		const deleteEquip = await deleteEquipment (data.id);

		if (data.ingredients.length >0 ){
			const ingredients = data.ingredients.map(value => ({
				ingredient_id : value.ingredient_id,
				quantity : value.quantity,
				recipe_id : data.id,
				creator : data.creator,
				time_st : timeStamp
			}))
			const addIngred = await addRecipeIngredient(ingredients)
		}

		if (data.equipments.length > 0){
			const equipments = data.equipments.map ((value) =>({
				equipment_id : value.equipment_id,
				quantity : value.quantity,
				recipe_id : data.id,
				creator : data.creator,
				time_st : timeStamp 					
			}))
			// console.log('Ingedients =>', ingredients);
			const addEquip = await addRecipeEquipment(equipments)
		}
		res.json(data)
	} catch (error) {
		console.log(err);
		res.status (400).json({msg:err.message})
	}


}

 module.exports = {
	_addRecipe,
	_allRecipe,
	_recipeDetail,
	_recipeUpdate,
 }

