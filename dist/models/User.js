import { Schema, model } from 'mongoose';
// Schema to create User model
const userSchema = new Schema({
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
}, {
    // Include virtuals when data is converted to JSON
    toJSON: {
        virtuals: true,
    },
    id: false,
});
// Create a virtual property `friendCount` to retrieve the number of friends
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
// Initialize the User model
const User = model('User', userSchema);
export default User;
