const {pool} = require ('../../config/db')

const getAllEquipment = () => {
	return pool.query ('\
		SELECT id, equipment, quantity, active\
		FROM equipment \
		ORDER BY equipment \
	')
}

const addEquipment = (item) => {
	return pool.query(`\
	INSERT INTO equipment (equipment, quantity)\
	VALUES ('${item.equipment}', ${item.quantity})\ 
	`)
}

const updateEquipment = (item) => {

	return pool.query (`\
	UPDATE equipment\
	SET equipment='${item.equipment}', quantity=${item.quantity}, active=${item.active} \
	WHERE id=${item.id}\
	`)
}


module.exports = {
	getAllEquipment,
	addEquipment,
	updateEquipment,
}