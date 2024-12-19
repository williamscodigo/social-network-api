import { ObjectId } from 'mongoose';
import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import cleanDB from './cleanDB.js';

try {
  await db();
  await cleanDB();

  // Create empty array to hold the users
  const users = [];

    users.push({
      username: 'testUser1',
      email: 'testUser1@gmail.com',
    },
    {
      username: 'testUser2',
      email: 'testUser2@gmail.com',
    });


  // Add users to the collection and await the results
  const userData = await User.create(users);

  //create one thought and assign it to the first user
  const thought = await Thought.create({
    thoughtText: 'This is a thought',
    username: userData[0].username,
  });

  console.log('thought:', thought);

  //add the thought to the user's thoughts array
  //note this is a reference to the thought model and not the thought itself
  userData[0].thoughts.push(thought._id as ObjectId);

  //save the user - this will save the thought to the user's thoughts array
  await userData[0].save();

   //NOTE: can create thoughts and reactions and friends for each user dynamically here or just add them manually in users array above
  //note: can ref noSQL mini project for help with this
  //just log for now
  console.log(userData);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}