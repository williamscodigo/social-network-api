import { Schema, model, Document, Types } from 'mongoose';

// Interface for the User model
export interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[];
  friends: Types.ObjectId[];
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
    id: false, // Disallow the use of `id` as a virtual
  }
);

// Create a virtual property `friendCount` to retrieve the number of friends
userSchema.virtual('friendCount').get(function (this: IUser) {
  return this.friends.length;
});

// Initialize the User model
const User = model<IUser>('User', userSchema);

export default User;