const { pool } = require ('../../config/db') 
const { db } = require ('../../config/db') 

//******************* For creating new Task

const addTask = (task) => {
	return db('tasks')
	.insert (task)
	.returning ('*');
}

const addTaskDetail = (detail) => {
	return db ('task_detail')
	.insert (detail)
	.returning ('*');
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
	ORDER BY recipes."name"
	`)
}

//************************** Update task (need for update)
const updateTask = (id, task) => {
	return db('tasks')
	.where ('id', id)
	.update (task) 
	.returning ('*');
}

//************************** Delete task detail (need for update)
const deleteTaskDetail = (id) => {
	return db('task_detail')
	.where ('task_id', id)
	.del() 
}

//************************* Task List
// const listTasks = () => {
// 	return pool.query (`\
// 	SELECT id, date AT TIME ZONE 'Israel', in_work, is_ready, active, creator, time_st \
// 	FROM tasks
// 	ORDER BY date DESC 
// 	`)
// }
const listTasks = () => {
	return db ('tasks')
	.select ('*')
	.orderBy ('date', 'desc');
}

module.exports = {
	addTask,
	addTaskDetail,
	getTask,
	getTaskDetail,
	deleteTaskDetail,
	updateTask,
	listTasks,
}


