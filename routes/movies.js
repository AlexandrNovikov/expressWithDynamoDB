import express from 'express';

import * as movieController from '../controllers/movies.js';
const router = express.Router();

router.post('/create', movieController.addMovie);

router.get('/list', movieController.loadAllMovies);

router.get('/get/:id', movieController.loadMovie);

router.delete('/delete/:id', movieController.deleteMovie);

router.post('/update/:id', movieController.updateMovie);

export default router;