import React from "react";

export default function SearchBox({ query, setQuery, platform, setPlatform, onSearch }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="space-y-3">
      {/* Platform Selector */}
      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        className="w-full bg-[#2a2a2a] px-4 py-3 rounded-lg text-white text-sm
          border border-transparent hover:border-[#1DB954]/50 focus:border-[#1DB954]
          focus:ring-1 focus:ring-[#1DB954] transition-all duration-200
          appearance-none cursor-pointer shadow-lg shadow-black/20"
      >
        <option value="spotify">Spotify</option>
      </select>

      {/* Search Input with Button */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search tracks..."
          className="w-full px-4 py-3 pr-[100px] bg-[#2a2a2a] text-white rounded-lg
            border border-transparent hover:border-white/10 focus:border-[#1DB954]
            focus:ring-1 focus:ring-[#1DB954] text-[15px] placeholder-gray-400
            transition-all duration-200 shadow-lg shadow-black/20"
        />
        <button
          onClick={onSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2
            bg-[#1DB954] hover:bg-[#1ed760] px-5 py-1.5 rounded-md
            text-white font-medium shadow-lg transition-all duration-200
            text-sm hover:scale-[1.02] active:scale-[0.98]"
        >
          Search
        </button>
      </div>
    </div>
  );
}
