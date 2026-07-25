import { useEffect, useState } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
          : 'http://localhost:8000/api/leaderboard/';
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Unable to load leaderboard');
        }
        const data = await response.json();
        setEntries(Array.isArray(data) ? data : data.items || []);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <div className="list-group">
          {entries.map((entry) => (
            <div key={entry._id || entry.rank} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="h6 mb-1">#{entry.rank} {entry.name}</h3>
                  <p className="mb-0 text-muted">{entry.streak || 0} day streak</p>
                </div>
                <span className="badge bg-success">{entry.points} pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Leaderboard;
