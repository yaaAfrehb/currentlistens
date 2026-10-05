// 1. CONFIGURE YOUR CREDENTIALS
const LASTFM_USERNAME = "AfrehB";
const LASTFM_API_KEY = "687764789dc91f6adfe5aab9a8d910f3";

// Create the color extractor tool instance
const colorThief = new ColorThief();

async function checkCurrentSong() {
  try {
    
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&limit=1&format=json`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    const cdElement = document.getElementById("cd");
    const trackText = document.getElementById("current-track");
    const albumArt = document.getElementById("cd-album-art");

   
    const tracks = data?.recenttracks?.track;
    if (!tracks || tracks.length === 0) {
      setFallbackState();
      return;
    }

  
    const currentTrack = tracks[0];

    
    const isPlayingNow = currentTrack && currentTrack['@attr'] && currentTrack['@attr'].nowplaying === 'true';

    if (isPlayingNow) {
      const songName = currentTrack.name;
      const artistName = currentTrack.artist['#text'];
      
     
      const artUrl = currentTrack.image[3]['#text'] || currentTrack.image[2]['#text'] || "";

      trackText.innerHTML = `Currently playing track: <strong>${songName} by ${artistName}</strong>`;
      
      if (albumArt.src !== artUrl && artUrl !== "") {
        albumArt.crossOrigin = "anonymous"; 
        albumArt.src = artUrl;
      }
      
      if (cdElement) {
        cdElement.style.animationPlayState = "running";
      }
    } else {
      setFallbackState();
    }
  } catch (error) {
    console.error("Error fetching live song data from Last.fm:", error);
    setFallbackState();
  }
}


function setFallbackState() {
  const cdElement = document.getElementById("cd");
  const trackText = document.getElementById("current-track");
  const albumArt = document.getElementById("cd-album-art");

  if (trackText) trackText.innerHTML = "Not listening to anything right now!";
  if (albumArt) albumArt.src = ""; // Clears the image frame if inactive
  if (cdElement) {
    cdElement.style.setProperty('--current-color', '#e0e0e0');
    cdElement.style.animationPlayState = "paused";
  }
}


document.getElementById("cd-album-art").addEventListener('load', function() {
  try {
    // Only attempt extraction if a valid image source exists
    if (!this.src || this.src === window.location.href) return;

    const dominantColor = colorThief.getColor(this);
    const r = dominantColor[0];
    const g = dominantColor[1];
    const b = dominantColor[2];
    
    const cdElement = document.getElementById("cd");
    if (cdElement) {
      cdElement.style.setProperty('--current-color', `rgb(${r}, ${g}, ${b})`);
    }
  } catch (e) {
    console.log("Waiting for album art color sampling...", e);
  }
});


setInterval(checkCurrentSong, 7000);
checkCurrentSong();
