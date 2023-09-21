export async function getAccessLog(shorten_url_code) {
    return await fetch('http://10.109.9.212:8000/log/' + shorten_url_code);
  }