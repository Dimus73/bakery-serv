const {
	addTask,
	addTaskDetail,
	getTask,
	getTaskDetail,
	deleteTaskDetail,
	updateTask,
	listTasks,

} = require ('../../modules/task/task');

const _addTask = async (req, res) => {
	const data = req.body;
	console.log('Request for add task:',data);
	const timeStamp = new Date();

	const task = {
		date : new Date(data.date),
		creator : data.user_id,
		time_st : timeStamp,
	}
	const taskDetail=[]

	try {
		const result = await addTask ( task );
		// console.log('Adding data to task', result);
		
		data.taskList.forEach ((value) => {
			const detail = {
				task_id : result[0].id,
				recipe_id : value.recipeId,
				quantity : value.quantity,
				creator : data.user_id,
				time_st : timeStamp,
				}
			taskDetail.push( detail )
		})
		const result_detail = await addTaskDetail (taskDetail);
		// console.log('***************************');
		const taskFromBase = await _getTask ({params:{id:result[0].id}}, res)

	} catch (error) {
		console.log(error);
		res.status( 400 ).json ({msg:error.message})
	}
}

const _updateTask = async (req, res) => {
	const data = req.body;
	const id = data.id;
	// console.log('Request for add task:', data, id);
	const timeStamp = new Date();

	const task = {
		date : new Date(data.date),
		creator : data.user_id,
		time_st : timeStamp,
	}
	const taskDetail=[]

	try {
		const result = await updateTask ( id, task );
		// console.log('Adding data to task', result);

		const resultDelete = await deleteTaskDetail ( id );
		
		data.taskList.forEach (( value ) => {
			const detail = {
				task_id : id,
				recipe_id : value.recipeId,
				quantity : value.quantity,
				creator : data.user_id,
				time_st : timeStamp,
				}
			taskDetail.push( detail )
		})
		result_detail = await addTaskDetail (taskDetail);
		// console.log('After adding Task Detail', result_detail);
		const taskFromBase = await _getTask ({params:{id}}, res)

	} catch (error) {
		console.log(error);
		res.status( 400 ).json ({msg:error.message})
	}
}


const _getTask = async (req, res) => {
	const id = req.params.id;

	// console.log('Params:', req.params);
	// res.json({asd:5,jfd:8})

	try {
		const taskDataResp = await getTask (id);
		const taskData = {
			id : taskDataResp.rows[0].id,
			date : taskDataResp.rows[0].date,
			inWork : taskDataResp.rows[0].in_work,
			isReady : taskDataResp.rows[0].is_ready, 
		}
		const taskDetail = await getTaskDetail (id);
		taskData.taskList = taskDetail.rows.map((value) =>{
			return {
			id                : value.id,
			taskId            : value.task_id,
			recipeId          : value.recipe_id,
			recipeName        : value.name,
			quantityInRecipe  : value.finish_quantity,
			unit_name         : value.unit_name,
			quantity          : value.quantity, 
			totalQuantity     : value.quantity * value.finish_quantity,
			inWork            : value.is_work,
			isReady           : value.is_ready,
			}
		});
		// console.log('Get data after saving:', taskData);
		res.json(taskData); 
	} catch (error) {
		console.log(error);
		res.status( 400 ).json ({msg:error.message})		
	}
} 

const _listTasks = async (req, res) => {
	try {
		const data = await listTasks ();
		// console.log('Task list:', data);
		res.json(data);
	} catch (error) {
		console.log(error);
		res.status( 400 ).json ({msg:error.message});				
	}
}

module.exports = {
	_addTask,
	_updateTask,
	_getTask,
	_listTasks,
}