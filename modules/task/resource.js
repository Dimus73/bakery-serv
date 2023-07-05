const { pool } = require ('../../config/db') 
const { db } = require ('../../config/db') 


const getResourceIngredient = (id) => {
	return pool.query (`\
		SELECT \
		tasks."id", \
		tasks."date", \ 
		ingredients."name"  as resource, \
		sum (recipe_ingred.quantity * task_detail.quantity) AS quantity, \
		units.unit_name \
	FROM \
		tasks \ 
		LEFT JOIN \
		task_detail \
		ON \
			tasks."id" = task_detail.task_id \
		LEFT JOIN \
		recipes \
		ON \
			task_detail.recipe_id = recipes."id" \
		LEFT JOIN \
		recipe_ingred \
		ON \
			recipes."id" = recipe_ingred.recipe_id \
		LEFT JOIN \
		ingredients \
		ON \
			recipe_ingred.ingredient_id = ingredients."id" \
		LEFT JOIN \
			units \
		ON \
			ingredients.unit_id = units."id" \
	WHERE \
		tasks."id" = ${id} \
	GROUP BY \
		tasks."id", \
		tasks."date", \  
		ingredients."name", \
		units.unit_name \
	ORDER BY \
		tasks."id" ASC	\
	`)
}

const getResourceEquipment = (id) => {
	return pool.query (`\
			SELECT \
			tasks."id", \
			tasks."date", \
			equipment.equipment  as resource, \
			sum (recipe_equip.quantity * task_detail.quantity/60) AS quantity, \
			'hr' as unit_name  \
			FROM \
				tasks \
				LEFT JOIN \
				task_detail \
				ON \
					tasks."id" = task_detail.task_id \
				LEFT JOIN \
				recipes \
				ON \
					task_detail.recipe_id = recipes."id" \
				LEFT JOIN \
				recipe_equip \
				ON \
					recipes."id" = recipe_equip.recipe_id \
				LEFT JOIN \
				equipment \
				ON \
					recipe_equip.equipment_id = equipment."id" \
			WHERE \
				tasks."id" = ${id} \
			GROUP BY \
				tasks."id", \
				tasks."date", \
				equipment.equipment \
			ORDER BY \
				tasks."id" ASC \
	`)
}


module.exports = {
	getResourceIngredient,
	getResourceEquipment,
}

// SELECT
// 	tasks."id", 
// 	tasks."date", 
// 	ingredients."name", 
// 	sum (recipe_ingred.quantity * task_detail.quantity) AS quantity 
// FROM
// 	tasks
// 	LEFT JOIN
// 	task_detail
// 	ON 
// 		tasks."id" = task_detail.task_id
// 	LEFT JOIN
// 	recipes
// 	ON 
// 		task_detail.recipe_id = recipes."id"
// 	LEFT JOIN
// 	recipe_ingred
// 	ON 
// 		recipes."id" = recipe_ingred.recipe_id
// 	LEFT JOIN
// 	ingredients
// 	ON 
// 		recipe_ingred.ingredient_id = ingredients."id"
// WHERE
// 	tasks."id" = 92
// GROUP BY
// 	tasks."id", 
// 	tasks."date",  
// 	ingredients."name"
// ORDER BY
// 	tasks."id" ASC


// SELECT
// 	tasks."id", 
// 	tasks."date", 
// 	equipment.equipment, 
// 	sum (recipe_equip.quantity * task_detail.quantity) AS quantity
// FROM
// 	tasks
// 	LEFT JOIN
// 	task_detail
// 	ON 
// 		tasks."id" = task_detail.task_id
// 	LEFT JOIN
// 	recipes
// 	ON 
// 		task_detail.recipe_id = recipes."id"
// 	LEFT JOIN
// 	recipe_equip
// 	ON 
// 		recipes."id" = recipe_equip.recipe_id
// 	LEFT JOIN
// 	equipment
// 	ON 
// 		recipe_equip.equipment_id = equipment."id"
// WHERE
// 	tasks."id" = 92
// GROUP BY
// 	tasks."id", 
// 	tasks."date", 
// 	equipment.equipment
// ORDER BY
// 	tasks."id" ASC