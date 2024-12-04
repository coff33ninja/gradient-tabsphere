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

// Lidarr API
export const addArtistToLidarr = async (apiUrl, apiKey, artistData) => {
  const response = await axios.post(`${apiUrl}/api/v1/artist`, artistData, {
    headers: {
      'X-Api-Key': apiKey,
    },
  });
  return response.data;
};

// Readarr API
export const addBookToReadarr = async (apiUrl, apiKey, bookData) => {
  const response = await axios.post(`${apiUrl}/api/v1/book`, bookData, {
    headers: {
      'X-Api-Key': apiKey,
    },
  });
  return response.data;
};

// Generic torrent client API
export const addTorrentToClient = async (apiUrl, username, password, torrentData, client) => {
  const endpoints = {
    transmission: '/transmission/rpc',
    deluge: '/json',
    rtorrent: '/RPC2',
    qbittorrent: '/api/v2/torrents/add'
  };

  const response = await axios.post(`${apiUrl}${endpoints[client]}`, torrentData, {
    auth: {
      username,
      password,
    },
  });
  return response.data;
};
