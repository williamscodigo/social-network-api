import { User, Thought } from '../models/index.js';
import { Request, Response } from 'express';

// Get all users
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Get a single user
export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .select('-__v') // Exclude the __v field
      .populate('thoughts') // Populate thoughts
      .populate('friends'); // Populate friends

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json(user);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

// PUT route to update a user by its _id 
// note: need to be careful with this route, only allowing user to update certain fields (email) - if we allow user to update username, we need to update the thoughts associated with the user as well to reflect the new username.
export const updateUser = async (req: Request, res: Response) => {
  try {
    // Find the user and update it with the data in req.body
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId }, // Find user by _id
      req.body.email, // The new data to update the user with 
      { new: true, runValidators: true } // Return the updated user and run validation on update
    );

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json(user);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

// DELETE route to remove a user by its _id
export const deleteUser = async (req: Request, res: Response) => {
  try {
    // Step 1: Find and delete all thoughts associated with the user
    const user = await User.findOne({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    // Delete all thoughts that belong to the user
    await Thought.deleteMany({ _id: { $in: user.thoughts } });

    // Step 2: Remove the user from other users' friends list
    await User.updateMany(
      { friends: req.params.userId }, // Find users who have this user in their friends list
      { $pull: { friends: req.params.userId } } // Remove the user from their friends list
    );

    // Step 3: Delete the user
    await User.findOneAndDelete({ _id: req.params.userId });

    res.json({ message: 'User, associated thoughts, and friendships have been deleted' });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};
