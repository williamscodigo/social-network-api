import { Schema, model, type Document, Types} from 'mongoose';

// Interface for the Reaction schema
export interface IReactions extends Document {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string; // The user that created this reaction - connected to the User model (instead of using id as a reference)
  createdAt: Date;
}

// Interface for the Thought schema
export interface IThought extends Document {
  thoughtText: string;
  username: string; // The user that created this thought - connected to the User model (instead of using id as a reference? should't this be id?)
  reactions: IReactions[];
  reactionCount: number;
  createdAt: Date;
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
    } as any, // Cast to any  (TypeScript) to avoid type error
  },
  {
    toJSON: {
      getters: true, // Enable getter methods
    },
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
    } as any, // Cast to any  (TypeScript) to avoid type error
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


/*
note: using createAt instead of timestamps: true, becuase timestamps won't allow us to format the date
*/