import app from './app';
import dotenv from 'dotenv';
import db_connection from './conn';

const {connect, disconnect} = db_connection;

dotenv.config()


// Connection object which contains the constant for the port and the database
let connection_config = {
    port: process.env.PORT,
    database_url: process.env.MONGODB_ATLAS
}

if( process.env.NODE_ENV == 'development'){
    connection_config.port = 3333;
    connection_config.database_url = process.env.DATABASE_URL
    
}

connect(connection_config, app)

