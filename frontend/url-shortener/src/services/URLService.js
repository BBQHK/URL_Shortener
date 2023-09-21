export function getShortenedURL (originalUrl) {
    return fetch('http://10.109.9.212:8000/s/', {
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