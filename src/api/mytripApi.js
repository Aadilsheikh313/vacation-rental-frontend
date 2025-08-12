// src/api/mytripApi.js
const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api/mytrip';

export async function fetchTripInfo({ q, lat, lon, radius = 5000, limit = 12, mode = 'driving' }) {
  const params = new URLSearchParams();
  if (q) params.append('q', q);
  if (lat && lon) { params.append('lat', lat); params.append('lon', lon); }
  params.append('radius', radius);
  params.append('limit', limit);
  params.append('mode', mode);

  const url = `${BASE}/trip-info?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    const txt = await res.text().catch(()=>null);
    throw new Error(`API error ${res.status}: ${txt || res.statusText}`);
  }
  return res.json();
}
