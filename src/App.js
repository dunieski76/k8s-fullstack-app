import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [apiResponse, setApiResponse] = useState('');
  const [dbStatus, setDbStatus] = useState('Checking via backend...');
  const [ok, setOk] = useState(null);

  const checkAPI = async () => {
    try {
      const res = await fetch('/api/');
      const text = await res.text();
      setApiStatus('Connected');
      setApiResponse(text);
      setDbStatus('Connected (via backend)');
      setOk(true);
    } catch (e) {
      setApiStatus('Error');
      setApiResponse(e.message);
      setDbStatus('Unknown');
      setOk(false);
    }
  };

  useEffect(() => { checkAPI(); }, []);

  return (
    <div className="App">
      <h1>☸️ Kubernetes Fullstack App</h1>
      <div className="card">
        <h3>Frontend: React</h3>
        <span className="status ok">Running</span>
      </div>
      <div className="card">
        <h3>Backend API</h3>
        <span className={`status ${ok === true ? 'ok' : ok === false ? 'err' : ''}`}>{apiStatus}</span>
        <br /><br />
        <button onClick={checkAPI}>Test Backend Connection</button>
        {apiResponse && <pre>{apiResponse}</pre>}
      </div>
      <div className="card">
        <h3>Database: PostgreSQL</h3>
        <span className={`status ${ok === true ? 'ok' : ok === false ? 'err' : ''}`}>{dbStatus}</span>
      </div>
    </div>
  );
}

export default App;
