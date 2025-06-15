import React, { useState } from "react";
import SearchBox from "./components/SearchBox";
import TrackList from "./components/TrackList";
import Queue from "./components/Queue";
import { searchTracks } from "./api/search";

export default function App() {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("spotify");
  const [results, setResults] = useState([]);
  const [queue, setQueue] = useState(() => {
    const saved = localStorage.getItem("musicQueue");
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    localStorage.setItem("musicQueue", JSON.stringify(queue));
  }, [queue]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    const data = await searchTracks(platform, query);
    setResults(data);
  };

  const handleAddToQueue = (track) => {
    setQueue((prev) => [...prev, track]);
  };

  const handleRemoveFromQueue = (trackId) => {
    setQueue((prev) => prev.filter((t) => t.id !== trackId));
  };

  return (
    <div className="min-h-screen bg-[#121212] p-4 font-['Inter'] antialiased">
      <div className="h-[calc(100vh-2rem)] flex gap-4">
        {/* Search Panel */}
        <section className="w-[35%] min-w-[400px] flex flex-col bg-[#1a1a1a] rounded-xl shadow-lg overflow-hidden">
          <div className="flex-none p-5">
            <SearchBox
              query={query}
              setQuery={setQuery}
              platform={platform}
              setPlatform={setPlatform}
              onSearch={handleSearch}
            />
          </div>
          
          <div className="flex-1 overflow-hidden">
            <TrackList tracks={results} onAddToQueue={handleAddToQueue} />
          </div>
        </section>

        {/* Queue Panel */}
        <section className="flex-1 flex flex-col bg-[#1f1f1f] rounded-xl shadow-lg overflow-hidden">
          <Queue queue={queue} onRemove={handleRemoveFromQueue} />
        </section>
      </div>
    </div>
  );
}
