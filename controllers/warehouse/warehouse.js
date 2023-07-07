const {
	addDocument,
	addDocumentDetail,
	allDocuments,
	getDocumentDetail,
	getDocDataDetail,
	updateDocument,
	deleteDocumentDetail,
	getAllIngredientsWithQuantityAndCost,

} = require('../../modules/warehouse/warehouse');

//************************** For create new document 
const _addDocument = async (req, res) => {
	const data = req.body;
	const timeStamp = new Date();

	const document = {
		date : data.date,
		type : data.type,
		status : data.status,
		creator : data.userId,
		time_st : timeStamp,
	}

	try {
		const newDocument = await addDocument (document);

		const docDetail = data.docDetail.map ( value => ({
				warehouse_id : newDocument[0].id,
				ingredient_id : value.ingredientId,
				cost : value.cost,
				quantity : value.quantity
			})		
		)

		const newDocDetail = await addDocumentDetail (docDetail);
		newDocument.docDetail = newDocDetail;

		res.json (newDocument);

	} catch (error) {

		console.log(error);
		res.status( 400 ).json ({msg:error.message})
	}

}

//************************** For get documents list
const _allDocuments = async (req, res) => {
	const active = req.params.active;

	try {
		const data = await allDocuments (active);
		
		res.json(data.rows);

	} catch (error) {
		console.log(error);
		res.status( 400 ).json ({msg:error.message})		
	}
}


//************************** For get documents detail
const _getDocumentDetail = async (req, res) => {
	const id = req.params.id;
	console.log('Request id:', id);
	
	try {
		const docData = await getDocumentDetail (id);
		console.log ('Doc Data', docData);
		console.log ('Data type', docData[0].date.toISOString().split('T')[0])
		
		docData[0].date = docData[0].date.toISOString().split('T')[0];
		
		const docDataDetail = await getDocDataDetail (id);
		console.log('Doc Data Detail', docDataDetail);
		docData[0].docDetail = docDataDetail.map((value) => ({
			id           : value.id,
			documentId   : value.warehouse_id,
			ingredientId : value.ingredient_id,
			cost         : value.cost,
			quantity     : value.quantity,
			stock        : value.stock,
			stockCost    : Number(value.costt.toFixed(2)),
			unit_name    : value.unit_name,
			totalCost    : (value.costt * value.quantity).toFixed(2)
		}));
		res.json(docData[0]);
	} catch (error) {
		console.log(error);
		res.status( 400 ).json ({msg:error.message})		
	}
}

//************************** For update documents detail
const _updateDocument = async (req, res) => {
	const data = req.body;
	const id = data.id;
	const timeStamp = new Date();

	const document = {
		date : data.date,
		type : data.type,
		status : data.status,
		creator : data.userId,
		time_st : timeStamp,
	}

	console.log('Data in update document', data);
	try {
		await updateDocument (id, document);
		await deleteDocumentDetail(id);
		const docDetail = data.docDetail.map ( value => ({
				warehouse_id : id,
				ingredient_id : value.ingredientId,
				cost : value.cost,
				quantity : value.quantity
			})		
		)

		const newDocDetail = await addDocumentDetail (docDetail);
		data.docDetail = newDocDetail;

		res.json (data);

	} catch (error) {

		console.log(error);
		res.status( 400 ).json ({msg:error.message})
	}

}

//************************** Get warehouse ingredient with quantity and cost
const _getAllIngredientsWithQuantityAndCost = async (req ,res) => {
	try {
		const data = await getAllIngredientsWithQuantityAndCost ();
		res.json (data);

	} catch (error) {

		console.log(error);
		res.status( 400 ).json ({msg:error.message})
	}

}


module.exports = {
	_addDocument,
	_allDocuments,
	_getDocumentDetail,
	_updateDocument,
	_getAllIngredientsWithQuantityAndCost
}