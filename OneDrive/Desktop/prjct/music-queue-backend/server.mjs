import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());

let spotifyToken = null;
let tokenExpiry = 0;

async function getSpotifyToken() {
  if (spotifyToken && Date.now() < tokenExpiry) return spotifyToken;

  const resp = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({ grant_type: "client_credentials" }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
      },
    }
  );

  spotifyToken = resp.data.access_token;
  tokenExpiry = Date.now() + resp.data.expires_in * 1000 - 10000; // Refresh 10s early
  return spotifyToken;
}

function normalizeSpotifyTrack(track) {
  return {
    id: track.id,
    name: track.name,
    artists: track.artists.map((artist) => ({ name: artist.name })),
    album: {
      name: track.album.name,
      image: track.album.images[0]?.url,
    },
    duration_ms: track.duration_ms,
    platform: "spotify",
    preview_url: track.preview_url,
    external_url: track.external_urls.spotify,
  };
}

app.get("/search", async (req, res) => {
  const { platform, query } = req.query;
  if (!platform || !query) return res.status(400).send("Missing query or platform");

  try {
    if (platform === "spotify") {
      const token = await getSpotifyToken();
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const normalizedTracks = response.data.tracks.items.map(normalizeSpotifyTrack);
      return res.json(normalizedTracks);
    }

    res.status(400).send("Unsupported platform");
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Search failed");
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
