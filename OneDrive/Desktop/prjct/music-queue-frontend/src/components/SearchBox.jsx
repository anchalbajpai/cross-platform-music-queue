import React from "react";

export default function SearchBox({ query, setQuery, platform, setPlatform, onSearch, isLoading, error }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      onSearch();
    }
  };

  // SVG Spinner for loading state
  const Spinner = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <div className="space-y-4 font-['Roboto']"> {/* Added Roboto font */}
      {/* Platform Selector */}
      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        disabled={isLoading}
        className="w-full bg-gray-700 border border-gray-600 px-4 py-3 rounded-lg text-white text-sm
          hover:border-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          transition-all duration-200 appearance-none cursor-pointer shadow-lg
          disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled cursor
      >
        <option value="spotify">Spotify</option>
        {/* Add other platforms here if needed */}
      </select>

      {/* Search Input with Button */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search tracks..."
          disabled={isLoading}
          className="w-full px-4 py-3 pr-[110px] bg-gray-700 border border-gray-600 text-white rounded-lg
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[15px] placeholder-gray-400
            transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled cursor
        />
        <button
          onClick={onSearch}
          disabled={isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2
            bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-md
            text-white font-medium shadow-lg transition-all duration-200
            text-sm active:bg-blue-700 active:scale-95 disabled:opacity-50
            disabled:hover:bg-blue-500 disabled:cursor-not-allowed" // Added active state and disabled cursor
        >
          {isLoading ? <Spinner /> : "Search"} {/* Using Spinner */}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
