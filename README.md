# 🎵 Music Dashboard & Live Stream Player

A highly responsive, retro-styled web player dashboard inspired by the vibrant warm palettes and aesthetics of Gorillaz' **Plastic Beach**. This site displays what I'm listening to in real time while tracking my top favorite tracks of the week using the Last.fm developer API.

## ✨ Features

- **Real-Time Track Syncing:** Automatically polls the Last.fm data channel every 7 seconds to catch exactly what track I'm listening to on Spotify.
- **Dynamic Vinyl CD Rotation:** The central vinyl disc rotates continuously whenever a live song is playing and smoothly pauses when the music stops.
- **Dynamic Color Extraction:** Integrates `ColorThief` to automatically sample the dominant accent hue of the live album artwork and radiate a glowing 3D aura ring around the spinning CD container.

## 🎨 Visual Identity & Architecture
- **The Palette:** Built completely around the hazy sunset tones of the plastic island sitting under a sunset vector sky on Gorillaz's Plastic Beach album:
- **Atmospheric Backdrop:** Uses a CSS pseudo-element (`body::before`) to create a stretched, full-screen color melt of album that is blurred at `7px` to keep your content paper cards crisp and legible.
- **Custom Typography:** Features a localized `@font-face` injection of the hand-drawn, cut-angle **Plastic Beach** graffiti display font from Fonts2u, balanced with clean Google Fonts (`Outfit`)
- **3D Comic Layout:** Incorporates solid asymmetrical card borders

## 🛠️ Installation & Setup

Since this application operates purely on client-side frontend files, setting it up locally takes seconds.

1. **Clone or Download the Repository:**
   ```bash
   git clone https://github.com
   ```

2. **Configure Your Credentials:**
   Open `spotifyjs.js` and change the config parameters on lines 2 and 3 with your personal API token keys:
   ```javascript
   const LASTFM_USERNAME = "YOUR_USERNAME_HERE";
   const LASTFM_API_KEY = "YOUR_LASTFM_API_KEY_HERE";
   ```

3. **Launch the Dashboard:**
   Simply double-click the `index.html` file to open your interface instantly inside any desktop web browser, or launch it with a local environment extensions like VS Code's *Live Server*.


## 🧱 File Structure

```text
├── index.html          # Core dashboard frame panels & structural semantic markers
├── style.css           # 70s geometric patterns, typography definitions, & 3D grid layout
├── spotifyjs.js        # API extraction logic
└── plastic-beach.ttf   # Downloaded custom graffiti vector text rendering file
```
