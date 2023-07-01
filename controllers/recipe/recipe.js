const {
	addRecipe,
	addRecipeIngredient,
	addRecipeEquipment,
	allRecipes,	
	recipeDetail,
	recipeIngredients,
	recipeEquipments
} = require ('../../modules/recipe/recipe')

const _addRecipe = (req, res) => {
	const data= req.body
	const timeStamp = new Date()

	console.log('Data=>', data)


	const recipe =  {
		name : data.name,
		finish_quantity : data.finish_quantity,
		unit_id : data.unit_id,
		semifinished : data.semifinished,
		description : data.description,
		img : data.imgURL,
		creator : data.creator,
		time_st : timeStamp 
	}

	addRecipe (recipe)
	.then ( 
		(dRecipe) => {
			// console.log('Recipe=>', dRecipe)
			if (data.ingredients.length >0 ){
				const ingredients = data.ingredients.map(value => ({
					ingredient_id : value.id,
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
					equipment_id : value.id,
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
		const recipe = await recipeDetail (id);
		// console.log('Recipe detail =>', recipe);

		const ingredients = await recipeIngredients (id);
		// console.log('Ingredient detail =>', ingredients);
		
		const equipments = await recipeEquipments (id);
		// console.log('Equipment detail =>', equipments);
		
		// const fullRecipe = [...recipe]
		// fullRecipe[0].ingredients = [...ingredients];
		// fullRecipe[0].equipments = [...equipments];
		// console.log('Recipe FULL detail =>', fullRecipe);

		recipe[0].ingredients = [...ingredients];
		recipe[0].equipments = [...equipments];
		// console.log('Recipe FULL detail =>', recipe);

		
		res.json(recipe[0]);

	} catch (error) {
		console.log(error);
		res.status( 400 ).json ({msg:error.message})
	}
}

 module.exports = {
	_addRecipe,
	_allRecipe,
	_recipeDetail,
 }