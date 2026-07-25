import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['captain', 'member', 'coach'], default: 'member' },
    fitnessLevel: { type: String, default: 'intermediate' },
    joinedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    goal: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    sport: { type: String, default: 'fitness' }
  },
  { timestamps: true }
);

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['run', 'cycle', 'swim', 'strength', 'yoga'], required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
    streak: { type: Number, default: 0 },
    rank: { type: Number, required: true }
  },
  { timestamps: true }
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    duration: { type: Number, required: true },
    focus: { type: String, default: 'endurance' },
    description: { type: String, default: '' }
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
