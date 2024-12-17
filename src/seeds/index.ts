import db from '../config/connection.js';
import { User } from '../models/index.js';
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


  // Add students to the collection and await the results
  const userData = await User.create(users);

  //create thoughts and reactions and friends for each user here
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