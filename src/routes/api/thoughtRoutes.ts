import { Router } from 'express';
const router = Router();
import { getThoughts, getSingleThought, createThought } from '../../controllers/thoughtController.js';

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought);

export default router;
