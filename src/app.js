// App.js
import React from 'react';
import AddShowForm from './AddShowForm';
import AddMovieForm from './AddMovieForm';
import AddIndexerForm from './AddIndexerForm';
import AddTorrentForm from './AddTorrentForm';

const App = () => {
  const sonarrApiUrl = 'http://localhost:8989'; // Replace with your actual URL
  const sonarrApiKey = 'YOUR_SONARR_API_KEY';
  const radarrApiUrl = 'http://localhost:7878'; // Replace with your actual URL
  const radarrApiKey = 'YOUR_RADARR_API_KEY';
  const prowlarrApiUrl = 'http://localhost:9696'; // Replace with your actual URL
  const prowlarrApiKey = 'YOUR_PROWLARR_API_KEY';
  const qbittorrentApiUrl = 'http://localhost:8080'; // Replace with your actual URL
  const qbittorrentUsername = 'YOUR_QBITTORRENT_USERNAME';
  const qbittorrentPassword = 'YOUR_QBITTORRENT_PASSWORD';

  return (
    <div>
      <h1>Media Management</h1>
      <AddShowForm sonarrApiUrl={sonarrApiUrl} sonarrApiKey={sonarrApiKey} />
      <AddMovieForm radarrApiUrl={radarrApiUrl} radarrApiKey={radarrApiKey} />
      <AddIndexerForm prowlarrApiUrl={prowlarrApiUrl} prowlarrApiKey={prowlarrApiKey} />
      <AddTorrentForm qbittorrentApiUrl={qbittorrentApiUrl} username={qbittorrentUsername} password={qbittorrentPassword} />
    </div>
  );
};

export default App;