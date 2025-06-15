import React from 'react';

// Helper function (can be moved to a utils file later if used elsewhere)
const formatDuration = (ms) => {
  if (ms === undefined || ms === null) return '--:--';
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Placeholder for missing album art
const AlbumArtPlaceholder = () => (
  <div className="w-20 h-20 bg-gray-600 rounded-md flex items-center justify-center shadow-md">
    <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 3a1 1 0 00-.894.553l-7 14A1 1 0 003 19h14a1 1 0 00.894-1.447l-7-14A1 1 0 0010 3zm0 2.236L14.432 17H5.568L10 5.236z" clipRule="evenodd" />
    </svg>
  </div>
);

export default function TrackCard({ track, onAddToQueue, style, className }) { // Added className
  const artistsName = track.artists?.map((a) => a.name).join(", ") || "Unknown Artist";
  const albumName = track.album?.name || "Unknown Album";

  return (
    <div
      style={style} // Animation delay style
      tabIndex={0} // Make card focusable
      // Outer container: handles base styling, padding, hover for background, and importantly, overflow clipping.
      // animate-fadeIn (passed via className prop) should remain on this outer div.
      // 'group' class allows inner elements to react to hover on this outer div.
      className={`group bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.2)] border border-[var(--aura-panel-border)]
                 px-4 py-3 rounded-lg shadow-md
                 transition-colors duration-200 ease-in-out  /* Only color transitions here */
                 focus:outline-none focus:ring-2 focus:ring-[var(--aura-accent)] focus:ring-offset-1 focus:ring-offset-[var(--aura-bg-end)]
                 overflow-hidden ${className}`} // Added overflow-hidden, removed flex properties and hover:scale
    >
      {/* Inner container: handles content layout and the scale transform on hover. */}
      <div
        className="w-full h-full flex items-center gap-4
                   transition-transform duration-200 ease-in-out group-hover:scale-105" // Scale applied here
      >
        {track.album?.image ? (
          <img
            src={track.album.image}
            alt={albumName}
            className="w-20 h-20 rounded-md object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-20 h-20 bg-white/5 rounded-md flex items-center justify-center flex-shrink-0 border border-[var(--aura-panel-border)]">
            <svg className="w-10 h-10 text-[var(--aura-text-secondary)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 00-.894.553l-7 14A1 1 0 003 19h14a1 1 0 00.894-1.447l-7-14A1 1 0 0010 3zm0 2.236L14.432 17H5.568L10 5.236z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[var(--aura-text-headings)] truncate text-base mb-1">
            {track.name || "Unknown Track"}
          </div>
          <div className="text-sm text-[var(--aura-text-primary)] truncate mb-0.5">
            {artistsName}
          </div>
          <div className="text-xs text-[var(--aura-text-secondary)] truncate">
            {albumName}
          </div>
        </div>
        <div className="flex flex-col items-end justify-between self-stretch ml-2">
          <span className="text-xs text-[var(--aura-text-secondary)] mb-2 flex-shrink-0">
            {formatDuration(track.duration_ms)}
          </span>
          <button
            className="bg-[var(--aura-accent)] hover:bg-[var(--aura-accent-hover)] text-gray-900 py-2 px-3 rounded-md
                       font-medium shadow-sm transition-all duration-200 ease-in-out
                       text-sm active:scale-95 active:brightness-90 flex items-center gap-1.5
                       focus:outline-none focus:ring-2 focus:ring-[var(--aura-accent)] focus:ring-offset-2 focus:ring-offset-[var(--aura-panel-bg)]"
            onClick={() => onAddToQueue(track)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
