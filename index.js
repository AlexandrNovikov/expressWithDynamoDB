import express from 'express';

import createMoviesTable from './utils/createMoviesTable.js';
import indexRouter from './routes/movies.js';

const app = express();
const PORT = process.env.APP_PORT;

createMoviesTable();

app.use(express.json())
app.use('/movie', indexRouter);

app.listen(PORT, () => console.log(`app on the ${PORT} port`));