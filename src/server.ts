import morgan from 'morgan';
import express from 'express';
import router from './routes/routes';
import * as dotenv from 'dotenv';
import { Database } from './configs/database';
import cors from 'cors';

const app = express();

// Configuring .env
dotenv.config();
// Logging
app.use(morgan('dev'));
// Parse the request
app.use(express.urlencoded({ extended: false }));
// Takes care of JSON data
app.use(express.json());
// Database connection
const database = new Database();
database.connect();


// RULES OF OUR API raw
app.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        // set the CORS headers
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS');
        return res.status(200).json({});
    }

    next();
});

// RULES OF OUR API
// app.use(cors({
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "allowedHeaders": ['Access-Control-Allow-Headers', 'origin, X-Requested-With, Content-Type, Accept, Authorization'],
//     "preflightContinue": true,
//     "optionsSuccessStatus": 200
// }));

//Routes
app.use('/api', router);

app.get('/', (req, res) => {
    res.status(200).send('Server is operational!');
});

// Error handling 
app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

// Server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});