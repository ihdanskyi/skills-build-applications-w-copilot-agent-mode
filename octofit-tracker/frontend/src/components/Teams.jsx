import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${getApiUrl('/api/teams/')}`);
        if (!response.ok) {
          throw new Error('Unable to load teams');
        }
        const data = await response.json();
        setTeams(Array.isArray(data) ? data : data.items || []);
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      }
    }

    loadTeams();
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Teams</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <div className="list-group">
          {teams.map((team) => (
            <div key={team._id || team.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="h6 mb-1">{team.name}</h3>
                  <p className="mb-0 text-muted">{team.goal}</p>
                </div>
                <span className="badge bg-secondary">{team.members?.length || 0} members</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Teams;
