const knex = require( 'knex' );
const dotenv = require( 'dotenv' );

const { Pool } = require('pg');

dotenv.config();

const db = knex({
	client: 'pg',
	connection: {
		host: process.env.DB_HOST,
		port: process.env.BD_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		// ssl:{rejectUnauthorized:false}
	}
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.BD_PORT, 
});

module.exports = {
	db, 
	pool
}