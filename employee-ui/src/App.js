import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// TRICK: This reads the variable injected by Docker at build time.
// If it's missing (like when running locally without Docker), it falls back to localhost:8090.
const API_URL = window.env.API_URL || 'http://localhost:8080/api/employees';

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [dept, setDept] = useState('');
  const [email, setEmail] = useState('');

  // Load employees on start
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    // Uses the dynamic URL
    axios.get(API_URL)
      .then(res => setEmployees(res.data))
      .catch(err => console.error("Error fetching data:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Uses the dynamic URL
    axios.post(API_URL, { name, department: dept, email })
      .then(() => {
        fetchEmployees(); // Refresh list
        setName(''); setDept(''); setEmail('');
      })
      .catch(err => console.error("Error saving data:", err));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">TechCorp Directory (Enterprise Edition)</h2>
      
      <div className="card p-4 mb-4 shadow-sm">
        <h5 className="mb-3">Add New Employee</h5>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-3">
              <input 
                className="form-control" 
                placeholder="Name" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required
              />
            </div>
            <div className="col-md-3">
              <input 
                className="form-control" 
                placeholder="Department" 
                value={dept} 
                onChange={e => setDept(e.target.value)} 
                required
              />
            </div>
            <div className="col-md-3">
              <input 
                className="form-control" 
                placeholder="Email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required
              />
            </div>
            <div className="col-md-3">
              <button className="btn btn-primary w-100">Add Employee</button>
            </div>
          </div>
        </form>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          Employee List
        </div>
        <ul className="list-group list-group-flush">
          {employees.length === 0 ? (
            <li className="list-group-item text-center text-muted">No employees found. Add one above!</li>
          ) : (
            employees.map(emp => (
              <li key={emp.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{emp.name}</strong>
                  <span className="text-muted ms-2" style={{fontSize: '0.9em'}}>({emp.department})</span>
                </div>
                <span className="badge bg-secondary">{emp.email}</span>
              </li>
            ))
          )}
        </ul>
      </div>
      
      <div className="text-muted text-center mt-3" style={{fontSize: '0.8em'}}>
        <p>API Endpoint: {API_URL}</p>
      </div>
    </div>
  );
}

export default App;