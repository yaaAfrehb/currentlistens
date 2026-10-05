
async function checkCurrentSong() {
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/896136727519985716`);
        const data = await response.json();

        const cdElement = document.getElementById("cd");
        const trackText = document.getElementById("current-track");
        const albumArt = document.getElementById("cd-album-art");

        if (data.success && data.data.listening_to_spotify) {
            const spotify = data.data.spotify;
            const songName = spotify.song;
            const artistName = spotify.artist;
            const artUrl = spotify.album_art_url; 

            trackText.innerHTML = `Currently playing track: <strong>${songName} by ${artistName}</strong>`;
            
            // Check if the album art has changed before updating to prevent flickering
            if (albumArt.src !== artUrl) {
                albumArt.src = artUrl;
                
                // COLOR CALCULATION: Creates a distinct, beautiful pastel hue accent specifically tied to the track
                const trackHue = spotify.track_id ? (spotify.track_id.charCodeAt(0) * 15) % 360 : 180;
                cdElement.style.setProperty('--current-color', `hsl(${trackHue}, 65%, 65%)`);
            }
            
            cdElement.style.animationPlayState = "running";
        } else {
            // When Spotify is quiet, reset everything back cleanly
            trackText.innerHTML = "Spotify is currently quiet...";
            albumArt.src = "";
            cdElement.style.setProperty('--current-color', '#e0e0e0'); // Reverts to default clean gray
            cdElement.style.animationPlayState = "paused";
        }
    } catch (error) {
        console.error("Error fetching live song data from Lanyard:", error);
    }
}

// Check for updates automatically every 5 seconds
setInterval(checkCurrentSong, 5000);

// Run immediately upon page loading
checkCurrentSong();




