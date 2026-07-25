import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(`${getApiUrl('/api/activities/')}`);
        if (!response.ok) {
          throw new Error('Unable to load activities');
        }
        const data = await response.json();
        setActivities(Array.isArray(data) ? data : data.items || []);
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      }
    }

    loadActivities();
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Activities</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <div className="list-group">
          {activities.map((activity) => (
            <div key={activity._id || activity.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="h6 mb-1">{activity.type}</h3>
                  <p className="mb-0 text-muted">{activity.userId?.name || activity.userId || 'Unknown user'}</p>
                </div>
                <span className="badge bg-info text-dark">{activity.duration} min</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Activities;
