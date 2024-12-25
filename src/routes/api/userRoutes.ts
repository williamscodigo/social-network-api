import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser, updateUser, deleteUser, removeFriend, addFriend } from '../../controllers/userController.js';

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);

//update user
router.route('/:userId').put(updateUser);

//delete user
router.route('/:userId').delete(deleteUser);

//remove/delete friend
router.route('/:userId/friends/:friendId').delete(removeFriend);

//add friend
router.route('/:userId/friends/:friendId').post(addFriend);

export default router;
