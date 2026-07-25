import express from 'express';
import db from './config/database';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker API is running' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
