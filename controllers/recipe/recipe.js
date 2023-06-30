const {
	addRecipe,
	addRecipeIngredient,
	addRecipeEquipment
} = require ('../../modules/recipe/recipe')

 const _addRecipe = (req, res) => {
	const data= req.body
	const timeStamp = new Date()
	const recipe =  {
		name : data.name,
		description : data.description,
		img : data.imgURL,
		creator : 1,
		time_st : timeStamp 
	}

	addRecipe (recipe)
	.then ( 
		(dRecipe) => {
			console.log('Data=>', data)
			console.log('Recipe=>', dRecipe)
			const ingredients = data.ingredients.map(value => ({
				ingredient_id : value.id,
				quantity : value.quantity,
				recipe_id : dRecipe[0].id,
				creator : 1,
				time_st : timeStamp 		
			}))

			const equipments = data.equipments.map ((value) =>({
				equipment_id : value.id,
				quantity : value.quantity,
				recipe_id : dRecipe[0].id,
				creator : 1,
				time_st : timeStamp 					
			}))

			// console.log('Ingedients =>', ingredients);
			addRecipeIngredient(ingredients)
			.then (ingData => console.log('Ingedients =>', ingData));
			addRecipeEquipment(equipments)
			.then (ingEquip => console.log('Equipment =>', ingEquip));
		}
	)
	.catch (err => {
		console.log(err);
		res.status (400).json({msg:err.message})
	})
	console.log(data);
	res.json({data})
 }

 module.exports = {
	_addRecipe,
 }