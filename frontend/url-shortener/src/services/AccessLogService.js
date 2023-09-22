const API_URL = process.env.REACT_APP_API_URL;
const API_PORT = process.env.REACT_APP_API_PORT;

export async function getAccessLog(shorten_url_code) {
  return await fetch(`http://${API_URL}:${API_PORT}/log/` + shorten_url_code);
}