// mediaService.js
import axios from 'axios';

// Sonarr API
export const addShowToSonarr = async (apiUrl, apiKey, showData) => {
  const response = await axios.post(`${apiUrl}/api/series`, showData, {
    headers: {
      'X-Api-Key': apiKey,
    },
  });
  return response.data;
};

// Radarr API
export const addMovieToRadarr = async (apiUrl, apiKey, movieData) => {
  const response = await axios.post(`${apiUrl}/api/movie`, movieData, {
    headers: {
      'X-Api-Key': apiKey,
    },
  });
  return response.data;
};

// Prowlarr API
export const addIndexerToProwlarr = async (apiUrl, apiKey, indexerData) => {
  const response = await axios.post(`${apiUrl}/api/v1/indexers`, indexerData, {
    headers: {
      'X-Api-Key': apiKey,
    },
  });
  return response.data;
};

// qBittorrent API
export const addTorrentToQbittorrent = async (apiUrl, username, password, torrentData) => {
  const response = await axios.post(`${apiUrl}/api/v2/torrents/add`, torrentData, {
    auth: {
      username,
      password,
    },
  });
  return response.data;
};