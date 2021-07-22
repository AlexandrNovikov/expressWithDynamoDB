import express from 'express';

import * as movieController from '../controllers/movies.js';
const router = express.Router();

router.post('/create', movieController.addMovie);

router.get('/list', movieController.loadAllMovies)

router.get('/movie/:id', movieController.loadMovie)

export default router;