import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [formData, setFormData] = useState({
    prn: '',
    name: '',
    branch: 'Computer Engineering',
    semester: 1,
    mseSub1: '',
    eseSub1: '',
    mseSub2: '',
    eseSub2: '',
    mseSub3: '',
    eseSub3: '',
    mseSub4: '',
    eseSub4: ''
  });

  const [result, setResult] = useState(null);
  const [searchPrn, setSearchPrn] = useState('');
  const [error, setError] = useState('');

  const API_URL = "http://localhost:8080/api/results";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit new student marks via Axios POST
  const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Convert inputs to numbers before sending to backend
  const payload = {
    ...formData,
    semester: parseInt(formData.semester),
    mseSub1: parseFloat(formData.mseSub1),
    eseSub1: parseFloat(formData.eseSub1),
    mseSub2: parseFloat(formData.mseSub2),
    eseSub2: parseFloat(formData.eseSub2),
    mseSub3: parseFloat(formData.mseSub3),
    eseSub3: parseFloat(formData.eseSub3),
    mseSub4: parseFloat(formData.mseSub4),
    eseSub4: parseFloat(formData.eseSub4),
  };

  try {
    const response = await axios.post(API_URL, payload);
    setResult(response.data);
    setError('');
  } catch (err) {
    setError('Failed to calculate/save result. Check backend connection.');
  }
};
  // Search existing result by PRN via Axios GET
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}/search/${searchPrn}`);
      setResult(response.data);
      setError('');
    } catch (err) {
      setError('PRN not found!');
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white text-center">
          <h2>Vishwakarma Institute of Technology, Pune</h2>
          <h5>Semester Result System (React + Spring Boot REST)</h5>
        </div>
        <div className="card-body">
          {/* PRN Search Form */}
          <form onSubmit={handleSearch} className="row g-3 mb-4 pb-3 border-bottom">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Search result by PRN..."
                value={searchPrn}
                onChange={(e) => setSearchPrn(e.target.value)}
                required
              />
            </div>
            <div className="col-md-4">
              <button type="submit" className="btn btn-secondary w-100">Find Result</button>
            </div>
          </form>

          {error && <div className="alert alert-danger">{error}</div>}

          {/* Marks Entry Form */}
          {!result && (
            <form onSubmit={handleSubmit}>
              <h4 className="mb-3">Student Details</h4>
              <div className="row g-3 mb-4">
                <div className="col-md-3">
                  <label className="form-label">PRN</label>
                  <input type="text" name="prn" className="form-control" onChange={handleChange} required />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Name</label>
                  <input type="text" name="name" className="form-control" onChange={handleChange} required />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Branch</label>
                  <select name="branch" className="form-select" value={formData.branch} onChange={handleChange}>
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="IT">Information Technology</option>
                    <option value="AIDS">AI & Data Science</option>
                    <option value="ENTC">E&TC</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Semester</label>
                  <input type="number" name="semester" className="form-control" value={formData.semester} onChange={handleChange} min="1" max="8" required />
                </div>
              </div>

              <h4 className="mb-3">Subject Marks (MSE: 30% | ESE: 70%)</h4>
              <table className="table table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Subject Name</th>
                    <th>MSE Marks (Out of 100)</th>
                    <th>ESE Marks (Out of 100)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Web Technology (WT)', mse: 'mseSub1', ese: 'eseSub1' },
                    { name: 'Database Management Systems (DBMS)', mse: 'mseSub2', ese: 'eseSub2' },
                    { name: 'Software Engineering (SE)', mse: 'mseSub3', ese: 'eseSub3' },
                    { name: 'Computer Networks (CN)', mse: 'mseSub4', ese: 'eseSub4' },
                  ].map((sub, idx) => (
                    <tr key={idx}>
                      <td>{sub.name}</td>
                      <td><input type="number" step="0.1" name={sub.mse} className="form-control" onChange={handleChange} min="0" max="100" required /></td>
                      <td><input type="number" step="0.1" name={sub.ese} className="form-control" onChange={handleChange} min="0" max="100" required /></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button type="submit" className="btn btn-primary btn-lg w-100 mt-3">Calculate & Save Result</button>
            </form>
          )}

          {/* Generated Result Display */}
          {result && (
            <div className="mt-3">
              <h3 className="text-center text-primary mb-3">STATEMENT OF MARKS</h3>
              <div className="row mb-3">
                <div className="col-6">
                  <p><strong>PRN:</strong> {result.prn}</p>
                  <p><strong>Student Name:</strong> {result.name}</p>
                </div>
                <div className="col-6 text-end">
                  <p><strong>Branch:</strong> {result.branch}</p>
                  <p><strong>Semester:</strong> {result.semester}</p>
                </div>
              </div>

              <table className="table table-bordered text-center align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Subject</th>
                    <th>MSE (30%)</th>
                    <th>ESE (70%)</th>
                    <th>Final Total (100)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="text-start">Web Technology</td><td>{result.mseSub1}</td><td>{result.eseSub1}</td><td>{result.totalSub1?.toFixed(2)}</td></tr>
                  <tr><td className="text-start">Database Management Systems</td><td>{result.mseSub2}</td><td>{result.eseSub2}</td><td>{result.totalSub2?.toFixed(2)}</td></tr>
                  <tr><td className="text-start">Software Engineering</td><td>{result.mseSub3}</td><td>{result.eseSub3}</td><td>{result.totalSub3?.toFixed(2)}</td></tr>
                  <tr><td className="text-start">Computer Networks</td><td>{result.mseSub4}</td><td>{result.eseSub4}</td><td>{result.totalSub4?.toFixed(2)}</td></tr>
                </tbody>
              </table>

              <div className="row p-3 bg-light border rounded">
                <div className="col-md-3"><strong>Grand Total:</strong> {result.grandTotal?.toFixed(2)} / 400</div>
                <div className="col-md-3"><strong>Percentage:</strong> {result.percentage?.toFixed(2)}%</div>
                <div className="col-md-3"><strong>Grade:</strong> <span className="badge bg-info text-dark">{result.grade}</span></div>
                <div className="col-md-3">
                  <strong>Status:</strong> <span className={`badge ${result.status === 'PASS' ? 'bg-success' : 'bg-danger'}`}>{result.status}</span>
                </div>
              </div>

              <div className="text-center mt-4">
                <button onClick={() => window.print()} className="btn btn-outline-primary me-2">Print Marksheet</button>
                <button onClick={() => setResult(null)} className="btn btn-secondary">Enter Another Result</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;