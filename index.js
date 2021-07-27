import express from 'express';
import serverless from 'serverless-http';

import createMoviesTable from './utils/createMoviesTable.js';
import indexRouter from './routes/movies.js';

const app = express();

createMoviesTable();

app.use(express.json());
app.use('/movie', indexRouter);

// lambda entrypoint
const handler = serverless(app);
exports.handler = async (event, context) => {
    console.info(JSON.stringify(event));
    return handler(event, context);
};