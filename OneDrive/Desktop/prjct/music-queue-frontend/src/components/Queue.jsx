import React from "react";

// Placeholder for missing album art - consider moving to a shared utils/components file
const AlbumArtPlaceholderIcon = ({ className = "w-10 h-10 text-gray-500" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 3a1 1 0 00-.894.553l-7 14A1 1 0 003 19h14a1 1 0 00.894-1.447l-7-14A1 1 0 0010 3zm0 2.236L14.432 17H5.568L10 5.236z" clipRule="evenodd" />
  </svg>
);

const formatDuration = (ms) => {
  if (ms === undefined || ms === null) return '--:--';
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export default function Queue({ queue, onRemove, onClearQueue, className }) { // Added className
  return (
    <>
      {/* Queue Header */}
      <div className="p-5 flex justify-between items-center border-b border-[var(--aura-panel-border)]"> {/* Use new border color */}
        <div className="flex items-center gap-3">
          <h2 className="font-[var(--font-family-headings)] text-xl text-[var(--aura-text-headings)]"> {/* AuraFlow heading */}
            Current Queue
          </h2>
          <span className="text-sm font-medium px-3 py-1 rounded-full bg-[rgba(0,0,0,0.2)] text-[var(--aura-accent)]"> {/* Adjusted badge style */}
            {queue.length} {queue.length === 1 ? "track" : "tracks"}
          </span>
        </div>
        {queue.length > 0 && (
          <button
            onClick={onClearQueue}
            className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-1.5 px-3 rounded-md
                       transition-all duration-200 ease-in-out hover:shadow-md active:bg-red-700 active:scale-95 active:brightness-90
                       focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-[var(--aura-bg-end)]" // Added active:brightness, focus (custom red ring)
            title="Clear entire queue"
          >
            Clear Queue
          </button>
        )}
      </div>
      
      {/* Queue List Area */}
      {/* Added relative and overflow-hidden to the scrollable container */}
      <div className={`flex-1 overflow-y-auto font-['Roboto'] relative overflow-hidden ${className || ''}`}>
        {!queue.length ? (
          <div className="h-full flex items-center justify-center p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center">
              <span className="text-3xl text-gray-400">🎵</span>
            </div>
            <p className="text-gray-300 text-lg font-medium">
              The queue is empty.
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Add some tracks from the search panel!
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-2"> {/* Changed space-y-3 to space-y-2 */}
            {queue.map((track, index) => (
              <div
                key={track.id}
                style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
                tabIndex={0} // Make item focusable
                className="group bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.2)] border border-[var(--aura-panel-border)]
                           p-3 rounded-lg shadow-sm transition-all duration-200 ease-in-out animate-fadeIn
                           flex items-center gap-3 hover:scale-105
                           focus:outline-none focus:ring-2 focus:ring-[var(--aura-accent)] focus:ring-offset-1 focus:ring-offset-[var(--aura-bg-end)]" // Added focus and tabindex
              >
                {track.album?.image ? (
                  <img
                    src={track.album.image}
                    alt={track.album.name || "Album Art"}
                    className="w-10 h-10 rounded object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 bg-white/5 rounded flex items-center justify-center flex-shrink-0 border border-[var(--aura-panel-border)]">
                    <AlbumArtPlaceholderIcon className="w-5 h-5 text-[var(--aura-text-secondary)]" /> {/* Adjusted size and color */}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[var(--aura-text-primary)] truncate text-sm">
                    {track.name || "Unknown Track"}
                  </div>
                  <div className="text-xs text-[var(--aura-text-secondary)] truncate">
                    {track.artists?.map(a => a.name).join(', ') || "Unknown Artist"}
                  </div>
                </div>
                <span className="text-xs text-[var(--aura-text-secondary)] mr-2 flex-shrink-0">
                  {formatDuration(track.duration_ms)}
                </span>
                <button
                  onClick={() => onRemove(track.id)}
                  className="text-[var(--aura-text-secondary)] hover:text-red-500 p-1 rounded-full
                             transition-colors duration-200
                             focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 focus:ring-offset-[var(--aura-panel-bg)]" // Added focus (custom red ring, offset against panel)
                  title="Remove from queue"
                >
                  {/* Heroicon: trash */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75H4.5a.75.75 0 000 1.5h11a.75.75 0 000-1.5H14A2.75 2.75 0 0011.25 1H8.75zM10 4.75A.75.75 0 0110.75 5.5v7.5a.75.75 0 01-1.5 0v-7.5A.75.75 0 0110 4.75zM5.992 19.21a.75.75 0 01-.742-.66L4.442 6.25h11.116l-.808 12.3A.75.75 0 0114.008 19.2L5.992 19.21z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
