const express = require ('express');
const dotenv = require ('dotenv');
const cors = require ('cors');
const cookieParser = require ('cookie-parser'); 
const errorMiddleWare = require ('./middlware/error-middlware');

const catalog_units_router       = require( './routes/catalogs/units' );
const catalog_ingredients_router = require( './routes/catalogs/ingredients') 
const catalog_equipment_router   = require( './routes/catalogs/equipment') 
const authentication_router      = require( './routes/auth/authentication') 
const recipe_router              = require( './routes/recipe/recipe') 
const task_router                = require( './routes/task/task') 
const warehouse_router           = require( './routes/warehouse/warehouse')

const app = express ();
dotenv.config ();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.use( '/api/catalog/units',         catalog_units_router.router );
app.use( '/api/catalog/ingredients',   catalog_ingredients_router.router)
app.use( '/api/catalog/equipment',     catalog_equipment_router.router)
app.use( '/api/auth',                  authentication_router.router)
app.use( '/api/recipe',                recipe_router.router)
app.use( '/api/task',                  task_router.router)
app.use( '/api/warehouse',             warehouse_router.router)

app.use(errorMiddleWare);

const start = async () => {
	const startPort = process.env.PORT || 3001;
	app.listen (startPort, () =>
	console.log(`Server run on port ${startPort}`));

}

start ();


