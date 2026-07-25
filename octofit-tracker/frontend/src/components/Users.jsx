import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(`${getApiUrl('/api/users/')}`);
        if (!response.ok) {
          throw new Error('Unable to load users');
        }
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : data.items || []);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      }
    }

    loadUsers();
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Users</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <div className="list-group">
          {users.map((user) => (
            <div key={user._id || user.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="h6 mb-1">{user.name}</h3>
                  <p className="mb-0 text-muted">{user.email}</p>
                </div>
                <span className="badge bg-primary">{user.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Users;
