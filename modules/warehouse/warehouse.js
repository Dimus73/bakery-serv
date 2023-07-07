const { pool } = require ('../../config/db') 
const { db } = require ('../../config/db') 

//************************** For create new document 

const addDocument = (document) => {
	return db ( 'warehouse' )
	.insert (document)
	.returning ('*');
}

const addDocumentDetail = (docDetail) => {
	return db ( 'warehouse_detail' )
	.insert (docDetail)
	.returning ('*');
}

//************************** For create documents list
const allDocuments = (onlyActive=true) => {
	return pool.query (`\
		SELECT * \
		FROM warehouse \
		${ onlyActive ? 
		'WHERE active '
		:
		' '  } \
	;`)
}

//************************** For get documents detail
const getDocumentDetail = (id) => {
	return db ('warehouse')
	.select ('*')
	.where ({id})
}

const getDocDataDetail = (id) => {
	return db ('warehouse_detail')
	.select ('*')
	.where ('warehouse_id', id)
}

//************************** For update documents detail
// const updateDocument = (document) => {
// 	return db ('warehouse')
// 	.where ({id})
// }

const deleteDocumentDetail = (id) => {
	return db ('warehouse_detail')
	.where ('warehouse_id', id)
	.del()

}


module.exports = {
	addDocument,
	addDocumentDetail,
	allDocuments,
	getDocumentDetail,
	getDocDataDetail,
	deleteDocumentDetail,

}