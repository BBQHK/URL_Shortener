import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const backendServerAddress = "http://10.109.9.212:8000/";

  const handleUrlShorten = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/s/', {
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

        setShortenedUrl(backendServerAddress + data.shorten_url);
        setErrorMsg(null);
      } else {
        // Handle error response
        console.error('Error:', response.status);
        const error = await response.json();
        console.error(error.detail);

        setErrorMsg(error.detail);
        setShortenedUrl(null);
      }
    } catch (error) {
      // Handle fetch error
      console.error('Error:', error);
    }
  };

  const handleOriginalUrlChange = (event) => {
    setOriginalUrl(event.target.value);
  };

  const handleCopyButtonClick = () => {
    navigator.clipboard.writeText(shortenedUrl)
      .then(() => {
        enqueueSnackbar('URL copied to clipboard', { variant: 'success' });
        console.log('URL copied to clipboard:', shortenedUrl);
        // enqueueSnackbar('URL copied to clipboard');
        // Optionally, you can show a success message or perform any other action
      })
      .catch((error) => {
        console.error('Error copying URL to clipboard:', error);
        // Optionally, you can show an error message or perform any other action
      });
  };

  const CopyButton = () => (
    <IconButton aria-label="copy" onClick={handleCopyButtonClick}>
      <ContentCopyIcon />
    </IconButton>
  )
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
            Generate Shortened URL
          </Button>
        </div>

        {errorMsg && (
          <div className='Alert-section'>
            <Alert severity="error" sx={{marginTop: '10px'}}>{errorMsg}</Alert>
          </div>
        )}

        {shortenedUrl && (
          <div className="Result-section">
            <p>Your shortened URL:</p>
            <TextField value={shortenedUrl} variant="standard" sx={{width: "500px"}} InputProps={{readOnly: true, endAdornment: <CopyButton />}}/>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;