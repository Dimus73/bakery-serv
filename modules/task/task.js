const { pool } = require ('../../config/db') 
const { db } = require ('../../config/db') 

//******************* For creating new Task

const addTask = (task) => {
	return db('tasks')
	.insert (task)
	.returning ('*')
}

const addTaskDetail = (detail) => {
	return db ('task_detail')
	.insert (detail)
}


//******************* For reading the Task

const getTask = (id) => {
	return pool.query (`\
	SELECT id, date, in_work, is_ready, creator, time_st \
	FROM tasks \
	WHERE id=${id} \
	`)
}

const getTaskDetail = (id) => {
	return pool.query (`\
	SELECT task_detail.id as id, task_detail.task_id, task_detail.recipe_id, task_detail.quantity, task_detail.is_work, task_detail.is_ready, recipes."name", recipes.finish_quantity, units.unit_name \
  FROM task_detail \
  LEFT JOIN recipes ON task_detail.recipe_id = recipes.id \
  LEFT JOIN units ON recipes.unit_id = units.id \
	WHERE task_detail.task_id = ${id} \
	`)
}

module.exports = {
	addTask,
	addTaskDetail,
	getTask,
	getTaskDetail
}


