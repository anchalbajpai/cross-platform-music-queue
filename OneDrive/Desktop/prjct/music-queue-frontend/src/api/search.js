const API_URL = "http://localhost:5000/search";

export async function searchTracks(platform, query) {
  try {
    const res = await fetch(`${API_URL}?platform=${platform}&query=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Search failed");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
