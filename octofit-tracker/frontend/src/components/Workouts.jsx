import { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
          : 'http://localhost:8000/api/workouts/';
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Unable to load workouts');
        }
        const data = await response.json();
        setWorkouts(Array.isArray(data) ? data : data.items || []);
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <div className="list-group">
          {workouts.map((workout) => (
            <div key={workout._id || workout.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="h6 mb-1">{workout.title}</h3>
                  <p className="mb-0 text-muted">{workout.description}</p>
                </div>
                <span className="badge bg-warning text-dark">{workout.duration} min</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Workouts;
