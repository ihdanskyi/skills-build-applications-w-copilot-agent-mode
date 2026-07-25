"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            models_1.User.deleteMany({}),
            models_1.Team.deleteMany({}),
            models_1.Activity.deleteMany({}),
            models_1.Leaderboard.deleteMany({}),
            models_1.Workout.deleteMany({})
        ]);
        const users = await models_1.User.insertMany([
            {
                name: 'Avery Chen',
                email: 'avery.chen@example.com',
                role: 'captain',
                fitnessLevel: 'advanced'
            },
            {
                name: 'Jordan Rivera',
                email: 'jordan.rivera@example.com',
                role: 'member',
                fitnessLevel: 'intermediate'
            },
            {
                name: 'Mina Patel',
                email: 'mina.patel@example.com',
                role: 'coach',
                fitnessLevel: 'advanced'
            }
        ]);
        const team = await models_1.Team.create({
            name: 'Night Owls',
            goal: 'Complete 10 group workouts this month',
            sport: 'running',
            members: [users[0]._id, users[1]._id]
        });
        await models_1.Activity.insertMany([
            {
                userId: users[0]._id,
                type: 'run',
                duration: 35,
                calories: 420,
                date: new Date('2026-07-20')
            },
            {
                userId: users[1]._id,
                type: 'strength',
                duration: 45,
                calories: 310,
                date: new Date('2026-07-21')
            },
            {
                userId: users[2]._id,
                type: 'yoga',
                duration: 30,
                calories: 180,
                date: new Date('2026-07-22')
            }
        ]);
        await models_1.Leaderboard.insertMany([
            { userId: users[0]._id, name: 'Avery Chen', points: 980, streak: 7, rank: 1 },
            { userId: users[1]._id, name: 'Jordan Rivera', points: 840, streak: 4, rank: 2 },
            { userId: users[2]._id, name: 'Mina Patel', points: 910, streak: 5, rank: 3 }
        ]);
        await models_1.Workout.insertMany([
            {
                title: 'HIIT Cardio Blast',
                difficulty: 'medium',
                duration: 25,
                focus: 'cardio',
                description: 'Short intervals with brisk pacing.'
            },
            {
                title: 'Core Strength Builder',
                difficulty: 'easy',
                duration: 20,
                focus: 'core',
                description: 'A steady core routine for endurance.'
            },
            {
                title: 'Trail Run Challenge',
                difficulty: 'hard',
                duration: 40,
                focus: 'endurance',
                description: 'Build stamina with a sustained run.'
            }
        ]);
        console.log('Database seeding complete');
        console.log(`Seeded team: ${team.name}`);
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
