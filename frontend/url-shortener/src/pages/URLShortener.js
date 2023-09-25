import logo from './../logo.svg';
import { useState } from 'react';
import './URLShortener.css';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { getShortenedURL } from '../services/URLService';
import QRCode from "react-qr-code";
import Grid from '@mui/material/Grid'; // Grid version 1
// import ButtonAppBar from './components/AppBar';
// import { height } from '@mui/system';

function URLShortener() {
  const { enqueueSnackbar } = useSnackbar();
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const API_URL = process.env.REACT_APP_API_URL;
  const API_PORT = process.env.REACT_APP_API_PORT;

  const backendServerAddress = `http://${API_URL}:${API_PORT}/`;

  const handleUrlShorten = async () => {
    try {
      const response = await getShortenedURL(originalUrl);
      if (response.ok) {
        const data = await response.json();

        setShortenedUrl(backendServerAddress + data.shorten_url);
        setErrorMsg(null);
      } else {
        // Handle error response
        const error = await response.json();

        setShortenedUrl(null);
        setErrorMsg(error.detail);
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
    <div className="URLShortener">
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <img src={logo} style={{width:"100%"}} className="App-logo" alt="logo" />
          <h1>URL Shortener</h1>

          <div className="Shorten-section">
            <TextField
              label="Original URL"
              variant="outlined"
              value={originalUrl}
              onChange={handleOriginalUrlChange}
              sx={{width: '100%'}}
            />
            <Button variant="contained" onClick={handleUrlShorten} sx={{margin: '10px'}}>
              Generate Shortened URL
            </Button>
          </div>

          {errorMsg && (
            <div className='Alert-section'>
              <Alert severity="error" sx={{width: '100%', margin: '0 auto', marginTop: '10px'}}>{errorMsg}</Alert>
            </div>
          )}

          {shortenedUrl && (
            <div className="Result-section">
              <p>Your shortened URL:</p>
              <TextField value={shortenedUrl} variant="standard" sx={{width: "100%"}} InputProps={{readOnly: true, endAdornment: <CopyButton />}}/>
            </div>
          )}
        </Grid>
        <Grid item xs={4}>
          {shortenedUrl && (
            <>
              <p style={{ marginTop: "300px" }}>QR code of the shortened URL:</p>
              <div style={{ background: 'white', padding: '16px', margin:"auto", height: "auto", maxWidth: 300, width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={shortenedUrl}
                viewBox={`0 0 256 256`}
                />
              </div>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default URLShortener;