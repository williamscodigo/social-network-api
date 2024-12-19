import { Schema, model, type Document, Types } from 'mongoose';

// Interface for the Reaction schema
interface IReactions extends Document {
  reactionId: Schema.Types.ObjectId;
  reactionBody: string;
  username: string; // The user that created this reaction - connected to the User model (instead of using id as a reference)
  createdAt: Date;
}

// Interface for the Thought schema
interface IThought extends Document {
  thoughtText: string;
  username: string; // The user that created this thought - connected to the User model (instead of using id as a reference? should't this be id?)
  createdAt: Date;
  reactions: IReactions[];
  reactionCount: number;
}

// Reaction schema (used as a subdocument schema in Thought)
const reactionSchema = new Schema<IReactions>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
      get: (timestamp: Date | string | number) => new Date(timestamp).toLocaleString(),
    } as any, // Cast to `any`  (TypeScript) to avoid type error
  },
  {
    toJSON: {
      getters: true, // Enable getter methods
    },
    id: false,
  }
);

// Thought schema
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
      get: (timestamp: Date | string | number) => new Date(timestamp).toLocaleString(),
    } as any, // Cast to `any`  (TypeScript) to avoid type error
    
    reactions: [reactionSchema], // Embed the reactionSchema as an array of subdocuments
  },
  {
    toJSON: {
      virtuals: true, // Include virtuals when data is converted to JSON
      getters: true,  // Enable getter methods
    },
    id: false,
  }
);

// Virtual for reactionCount
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions.length;
});

// Initialize the Thought model
const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
