import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
              <p className="lead text-muted">
                A modern multi-tier fitness tracking experience for teams and individuals.
              </p>
              <div className="d-flex gap-3 flex-wrap mt-4">
                <a className="btn btn-primary" href="http://localhost:8000/api/health">
                  Check API Health
                </a>
                <a className="btn btn-outline-secondary" href="http://localhost:5173">
                  Frontend Running
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
