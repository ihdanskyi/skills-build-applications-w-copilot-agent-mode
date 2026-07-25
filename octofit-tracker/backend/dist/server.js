"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'OctoFit Tracker API is running',
        apiUrl: apiBaseUrl,
        database: database_1.default.readyState === 1 ? 'connected' : 'disconnected'
    });
});
app.get('/api/config', (_req, res) => {
    res.json({
        apiUrl: apiBaseUrl,
        codespaceName: codespaceName || null,
        port
    });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await models_1.User.find({}).lean();
    res.json(users);
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await models_1.Team.find({}).populate('members').lean();
    res.json(teams);
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await models_1.Activity.find({}).populate('userId').lean();
    res.json(activities);
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await models_1.Leaderboard.find({}).sort({ rank: 1 }).lean();
    res.json(leaderboard);
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await models_1.Workout.find({}).lean();
    res.json(workouts);
});
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
        console.log(`API base URL: ${apiBaseUrl}`);
    });
}
exports.default = app;
