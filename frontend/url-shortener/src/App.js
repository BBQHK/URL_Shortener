import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const backendServerAddress = "http://127.0.0.1:8000/";

  const handleUrlShorten = async () => {
    try {
      const response = await fetch(backendServerAddress+'s/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "original_url": originalUrl
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        setShortenedUrl(backendServerAddress+"g/"+data.shorten_url);
      } else {
        // Handle error response
        console.error('Error:', response.status);
      }
    } catch (error) {
      // Handle fetch error
      console.error('Error:', error);
    }
  };

  const handleOriginalUrlChange = (event) => {
    setOriginalUrl(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>URL Shortener</h1>
        <div className="Shorten-section">
          <TextField
            label="Original URL"
            variant="outlined"
            value={originalUrl}
            onChange={handleOriginalUrlChange}
            sx={{width: '300px'}}
          />
          <Button variant="contained" onClick={handleUrlShorten} sx={{margin: '10px'}}>
            Generate Shorten URL
          </Button>
        </div>
        {shortenedUrl && (
          <div className="Result-section">
            <p>Your shortened URL:</p>
            <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
              {shortenedUrl}
            </a>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;