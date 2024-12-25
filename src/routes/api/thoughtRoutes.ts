import { Router } from 'express';
const router = Router();
import { getThoughts, getSingleThought, createThought, updateThought, deleteThought } from '../../controllers/thoughtController.js';

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought);

//update thought
router.route('/:thoughtId').put(updateThought);

//delete thought
router.route('/:thoughtId').delete(deleteThought);

export default router;
