const {
	getResourceIngredient,
	getResourceEquipment,

} = require ('../../modules/task/resource')

const _getTaskResource = async (req, res) => {
	const id = req.params.id;
	try {
		const ingredientsData = await getResourceIngredient (id);
		const equipmentData = await getResourceEquipment (id);
		res.json ({
			ingredients : ingredientsData.rows,
			equipments : equipmentData.rows
		});

	} catch (error) {
		console.log(error);
		res.status( 400 ).json ({msg:error.message})		
	}
} 

module.exports = {
	_getTaskResource
} 