const express = require ('express');
const dotenv = require ('dotenv');
const cors = require ('cors');

const catalog_units_router       = require( './routes/catalogs/units' );
const catalog_ingredients_router = require( './routes/catalogs/ingredients') 
const catalog_equipment_router   = require( './routes/catalogs/equipment') 
const authentication_router      = require( './routes/auth/authentication') 

const app = express ();
dotenv.config ();

app.listen (process.env.PORT || 3001, () =>
	console.log(`Server run on port ${process.env.PORT || 3001}`));

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use( '/api/catalog/units', catalog_units_router.router );
app.use( '/api/catalog/ingredients', catalog_ingredients_router.router)
app.use( '/api/catalog/equipment', catalog_equipment_router.router)
app.use( '/api/auth', authentication_router.router)


