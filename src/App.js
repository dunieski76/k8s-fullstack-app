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
      <h1>Dunieski is here</h1>
    </div>
  );
}

export default App;
