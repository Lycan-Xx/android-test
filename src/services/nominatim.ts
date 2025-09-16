import axios from 'axios';

const BASE = 'https://nominatim.openstreetmap.org';

export async function searchAddress(query: string) {
  const url = `${BASE}/search`;
  const resp = await axios.get(url, {
    params: { q: query, format: 'json', addressdetails: 1, limit: 6 },
    headers: { 'User-Agent': 'Venew-RN-Client/1.0 (+your-email@example.com)' }
  });
  return resp.data; // array of results
}