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
    <div className="space-y-4"> {/* Roboto font will be inherited or overridden by global var(--font-family-sans) */}
      {/* Platform Selector */}
      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        disabled={isLoading}
        className="w-full bg-white/5 border border-[var(--aura-panel-border)] px-4 py-3 rounded-lg text-[var(--aura-text-primary)] text-sm
                   focus:border-[var(--aura-accent)] focus:ring-1 focus:ring-[var(--aura-accent)]
                   transition-all duration-200 appearance-none cursor-pointer shadow-sm disabled:opacity-70 disabled:cursor-not-allowed" // Opacity changed
      >
        <option value="spotify" className="bg-gray-800">Spotify</option> {/* Dropdown options need background in some browsers */}
        {/* Add other platforms here if needed */}
      </select>

      {/* Search Input with Button */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search tracks, artists, albums..."
          disabled={isLoading}
          className="w-full bg-white/5 border border-[var(--aura-panel-border)] px-4 py-3 pr-12 rounded-lg
                     text-[var(--aura-text-primary)] placeholder:text-[var(--aura-text-secondary)]
                     focus:border-[var(--aura-accent)] focus:ring-1 focus:ring-[var(--aura-accent)] text-sm
                     transition-all duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed" // Opacity changed
        />
        <button
          onClick={onSearch}
          disabled={isLoading}
          aria-label="Search"
          className="absolute right-0 top-0 bottom-0 px-4 py-2 rounded-r-lg
                     bg-[var(--aura-accent)] hover:bg-[var(--aura-accent-hover)] text-white
                     flex items-center justify-center transition-colors duration-200
                     active:scale-90 disabled:opacity-70 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-[var(--aura-accent)] focus:ring-offset-2 focus:ring-offset-[var(--aura-bg-end)]" // Scale, Opacity, Focus changed
        >
          {isLoading ? <Spinner /> : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p> {/* Adjusted error color for better visibility on dark bg */}
      )}
    </div>
  );
}
