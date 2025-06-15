import React, { useState } from "react";
import SearchBox from "./components/SearchBox";
import TrackList from "./components/TrackList";
import Queue from "./components/Queue";
import { searchTracks } from "./api/search";

export default function App() {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("spotify");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // ADDED
  const [error, setError] = useState(null); // ADDED
  const [searchAttempted, setSearchAttempted] = useState(false); // ADDED
  const [queue, setQueue] = useState(() => {
    const saved = localStorage.getItem("musicQueue");
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    localStorage.setItem("musicQueue", JSON.stringify(queue));
  }, [queue]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true); // ADDED
    setError(null); // ADDED
    setSearchAttempted(true); // ADDED
    try {
      const data = await searchTracks(platform, query);
      setResults(data);
    } catch (err) {
      console.error("Search failed:", err);
      setError(err.message || "Failed to fetch tracks. Please try again."); // ADDED
      setResults([]);
    } finally {
      setIsLoading(false); // ADDED
    }
  };

  const handleAddToQueue = (track) => {
    setQueue((prev) => [...prev, track]);
  };

  const handleRemoveFromQueue = (trackId) => {
    setQueue((prev) => prev.filter((t) => t.id !== trackId));
  };

  const handleClearQueue = () => { // ADDED
    setQueue([]);
  };

  return (
    <div className="min-h-screen bg-[#1A202C] p-4 font-['Inter'] antialiased"> {/* CORRECTED BG */}
      {/* Changed to flex-col by default, md:flex-row for medium screens and up.
          Adjusted height for mobile: h-auto to allow content to define height,
          md:h-[calc(100vh-2rem)] for larger screens to maintain full viewport height minus padding.
      */}
      <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[calc(100vh-2rem)]">
        {/* Search Panel: Adjusted width and min-width for responsiveness.
            Height is auto on mobile (content defines it), full height for sidebar layout on md+ screens.
            Added overflow-hidden for md+ screens to contain its own scrollable children if necessary.
        */}
        <section className="w-full md:w-[35%] min-w-[320px] md:min-w-[400px] flex flex-col bg-[#2D3748] rounded-xl shadow-lg md:overflow-hidden"> {/* CORRECTED BG, responsive widths, md:overflow-hidden */}
          {/* Added Search Panel Title */}
          <h2 className="heading-oswald text-xl text-white px-5 pt-5 pb-2"> {/* Adjusted padding */}
            Search Music
          </h2>
          <div className="flex-none p-5 pt-3"> {/* Adjusted SearchBox container top padding */}
            <SearchBox
              query={query}
              setQuery={setQuery}
              platform={platform}
              setPlatform={setPlatform}
              onSearch={handleSearch}
              isLoading={isLoading} // ADDED
              error={error} // ADDED
            />
          </div>
          
          {/* On mobile, this part will take its natural height.
              On md+ screens, it will be scrollable within the fixed height of the search panel.
          */}
          <div className="flex-1 md:overflow-y-auto"> {/* Changed overflow-hidden to md:overflow-y-auto */}
            <TrackList
              tracks={results}
              onAddToQueue={handleAddToQueue}
              searchAttempted={searchAttempted} // ADDED
            />
          </div>
        </section>

        {/* Queue Panel: Adjusted width for responsiveness.
            Height is auto on mobile (content defines it), full height for sidebar layout on md+ screens.
        */}
        <section className="w-full md:flex-1 flex flex-col bg-[#2D3748] rounded-xl shadow-lg md:overflow-hidden"> {/* CORRECTED BG, responsive width, md:overflow-hidden */}
          <Queue
            queue={queue}
            onRemove={handleRemoveFromQueue}
            onClearQueue={handleClearQueue} // ADDED
          />
        </section>
      </div>
    </div>
  );
}
