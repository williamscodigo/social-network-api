import { Schema, model, Document, ObjectId } from 'mongoose';

// Interface for the User model
interface IUser extends Document {
  username: string;
  email: string;
  thoughts: ObjectId[];
  friends: ObjectId[];
  friendCount: number;
}

// Schema to create User model
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, 'Must match a valid email address'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', // Self-reference to the User model
      },
    ],
  },
  {
    // Include virtuals when data is converted to JSON
    toJSON: {
      virtuals: true,
      versionKey: false, // Exclude `__v` field from the JSON response
    },
    id: false,
  }
);

// Create a virtual property `friendCount` to retrieve the number of friends
userSchema.virtual('friendCount').get(function (this: IUser) {
  return this.friends.length;
});

// Initialize the User model
const User = model<IUser>('User', userSchema);

export default User;










/*
NOTES on above: versionKey: false, // Exclode `__v` field from the JSON response

Setting versionKey: false in the schema configuration removes __v from the JSON response.

The __v field will still exist in the database but won't be included in the output when querying documents.

The __v field in Mongoose is a version key that is used by Mongoose for internal purposes, specifically for tracking document versions 

Mongoose increments the __v field whenever you perform an update operation on a document.

This mechanism helps Mongoose prevent conflicting updates to a document in concurrent environments.
*/