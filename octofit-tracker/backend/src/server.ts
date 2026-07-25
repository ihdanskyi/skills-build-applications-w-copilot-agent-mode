import express from 'express';
import db from './config/database';
import { Activity, Leaderboard, Team, User, Workout } from './models';

const app = express();
const port = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker API is running',
    apiUrl: apiBaseUrl,
    database: db.readyState === 1 ? 'connected' : 'disconnected'
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
  const users = await User.find({}).lean();
  res.json(users);
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  const teams = await Team.find({}).populate('members').lean();
  res.json(teams);
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const activities = await Activity.find({}).populate('userId').lean();
  res.json(activities);
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  const leaderboard = await Leaderboard.find({}).sort({ rank: 1 }).lean();
  res.json(leaderboard);
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json(workouts);
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
  });
}

export default app;
