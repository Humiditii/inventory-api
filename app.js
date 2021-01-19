import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import AuthRoutes from './routes/authRouter';
import StoreRoutes from './routes/storeRouter';
import saleRoutes from './routes/saleRouter';


const app = express();

const tasks = [
    {
        id: 1,
        name: 'Task 1',
        completed: false
    },
    {
        id: 2,
        name: 'Task 2',
        completed: false
    },
    {
        id: 3,
        name: 'Task 3',
        completed: false  
    }
]

app.use(bodyParser.urlencoded({
    extended: false
}));

// application/json parsing json incoming request

app.use(bodyParser.json());

//allowing CORS
app.use(cors());


// Get all tasks
app.get('/api/tasks', (req, res)=> {
    return res.status(200).json(tasks)
})

// Get a particular task
app.get('/api/tasks/:id', (req, res)=> {
    const {id} = req.params

    const t = tasks.find( task => task.id == parseInt(id))
    if(!t) return res.status(404).json({message: 'Id provided not found'})

    return res.status(200).json(t)
    
})

// add new task

app.post('/api/tasks', (req, res)=> {
    const task = {
        id: tasks.length + 1,
        name: 'Task '+ tasks.length+1,
        completed: false
    }

    tasks.push(task)

    return res.status(201).json({
        message: 'new task created',
        data: task
    })
})

// patch request 

app.patch('/api/tasks/:id', (req, res)=> {
    const {id} = req.params;

    const get_task = tasks.find( task => task.id === parseInt(id) )
    if(!get_task) return res.status(404).json({message: 'Id provided not found'})
    get_task.completed = true
    
    return res.status(200).json(get_task)
})

app.delete('api/tasks/:id', (req, res)=> {
    const task = tasks.find( task => task.id === parseInt(req.params.id) )
    if(!task) return res.status(404).json({message: 'Id provided not found'})
    
    const index = tasks.indexOf(task)
    tasks.splice(index,1)
    return res.json(200).json(task)
})

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