const API_URL = process.env.REACT_APP_API_URL;
const API_PORT = process.env.REACT_APP_API_PORT;

export function getShortenedURL (originalUrl) {
    return fetch(`http://${API_URL}:${API_PORT}/s/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "original_url": originalUrl
        })
      });
}