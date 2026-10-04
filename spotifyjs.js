// 1. Paste your 18-digit Discord User ID between these quotation marks:
const DISCORD_ID = "896136727519985716"; 

// 2. This function communicates with Lanyard to fetch your live status
async function checkCurrentSong() {
    try {
       const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const data = await response.json();

        // Target your HTML elements using their unique IDs
        const cdElement = document.getElementById("cd");
        const trackText = document.getElementById("current-track");

        // Check if the API request was successful and if you are actively listening to Spotify
        if (data.success && data.data.listening_to_spotify) {
            const spotify = data.data.spotify;
            const songName = spotify.track;
            const artistName = spotify.artist;

            // Instantly update the text inside the player container box
            trackText.innerHTML = `Currently playing track: <strong>${songName} by ${artistName}</strong>`;
            
            // Set the CSS animation state to running so your rainbow CD starts spinning
            cdElement.style.animationPlayState = "running";
        } else {
            // If you pause your music or close Spotify, update the text and freeze the CD
            trackText.innerHTML = "Spotify is currently quiet...";
            cdElement.style.animationPlayState = "paused";
        }
    } catch (error) {
        console.error("Error fetching live song data from Lanyard:", error);
    }
}

// 3. Set up a heartbeat timer to check for song changes automatically every 5 seconds
setInterval(checkCurrentSong, 5000);

// 4. Fire off the function immediately the absolute second the webpage finishes loading
checkCurrentSong();

