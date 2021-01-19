import mongoose from 'mongoose';

class Connection {
    static connect(connection_config, app=null){
        return mongoose.connect( connection_config.database_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true
        }).then( connection => {
            //console.log(connection)
            if(app){
                app.listen(connection_config.port, () => {
                    console.log('<<<<<=======Server running at ' + connection_config.port+'======>>>>>>');
                });
            }else{
                console.log('<<<<<<<<<=======Database Connected=======================>>>>>>>>>>>>>>>>')
            }
        }).catch( err => {
            throw err;
        })
    }

    static disconnect(){
        return mongoose.disconnect()
    }

    static mocker(body, model){
       const M = require(`./models/${model}`)
        M.findOneAndDelete(body).then( deleted => {
            console.log('Cleared')
        }).catch( err => {
            console.log(err.message)
        })
    }
}


export default Connection