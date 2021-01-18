import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import AuthRoutes from './routes/authRouter';
import StoreRoutes from './routes/storeRouter';
import saleRoutes from './routes/saleRouter';


const app = express();



app.use(bodyParser.urlencoded({
    extended: false
}));

// application/json parsing json incoming request

app.use(bodyParser.json());

//allowing CORS
app.use(cors());

//Application routes

app.use('/api/v1', AuthRoutes);
app.use('/api/v1', StoreRoutes);
app.use('/api/v1', saleRoutes);

//routes ends here
app.use('/', (req, res)=> {
    res.status(200).json({
        statusCode: 200,
        message: 'Welcome to the entry point to the api'
    })
} )


app.all( '*',(req, res, next)=> {
    return res.status(404).json({
        statusCode: 404,
        message: 'Not found, invalid route'
    });
})
//Handling errors 


app.use((error, req, res, next) => {
    //console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;

    res.status(status).json({
        message: message,
        statusCode: status
    });
});


export default app;