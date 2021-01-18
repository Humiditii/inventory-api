import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';

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

mongoose.connect( connection_config.database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then( connection => {
    //console.log(connection)
    app.listen(connection_config.port, () => {
        console.log('Server running at ' + connection_config.port);
    });
}).catch( err => {
    throw err;
})