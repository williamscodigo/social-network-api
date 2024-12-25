import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser, updateUser, deleteUser } from '../../controllers/userController.js';

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);

//update user
router.route('/:userId').put(updateUser);

//delete user
router.route('/:userId').delete(deleteUser);

export default router;
