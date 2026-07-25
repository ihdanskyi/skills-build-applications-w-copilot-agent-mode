import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { getApiUrl } from './utils/api';

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const apiBaseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';

  return (
    <BrowserRouter>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
                <p className="lead text-muted">
                  A modern multi-tier fitness tracking experience for teams and individuals.
                </p>
                <div className="alert alert-info">
                  Configure <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to target your Codespaces backend. When it is unset, the app uses <code>http://localhost:8000</code>.
                </div>
                <div className="d-flex gap-2 flex-wrap mt-3">
                  <NavLink className="btn btn-outline-primary" to="/users">Users</NavLink>
                  <NavLink className="btn btn-outline-primary" to="/teams">Teams</NavLink>
                  <NavLink className="btn btn-outline-primary" to="/activities">Activities</NavLink>
                  <NavLink className="btn btn-outline-primary" to="/leaderboard">Leaderboard</NavLink>
                  <NavLink className="btn btn-outline-primary" to="/workouts">Workouts</NavLink>
                </div>
                <div className="mt-3 text-muted small">API base URL: {apiBaseUrl}</div>
              </div>
            </div>

            <div className="d-flex gap-3 flex-wrap mb-4">
              <a className="btn btn-primary" href={getApiUrl('/api/health')}>
                Check API Health
              </a>
              <a className="btn btn-outline-secondary" href="http://localhost:5173">
                Frontend Running
              </a>
            </div>

            <Routes>
              <Route path="/" element={<Users />} />
              <Route path="/users" element={<Users />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/workouts" element={<Workouts />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
