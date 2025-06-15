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
      <div className="p-5 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center gap-3">
          <h2 className="heading-oswald text-xl text-white"> {/* Applied .heading-oswald */}
            Current Queue
          </h2>
          <span className="text-sm font-medium px-3 py-1 rounded-full bg-gray-700 text-blue-400">
            {queue.length} {queue.length === 1 ? "track" : "tracks"}
          </span>
        </div>
        {queue.length > 0 && (
          <button
            onClick={onClearQueue}
            className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-1.5 px-3 rounded-md
                       transition-all duration-200 ease-in-out hover:shadow-md active:bg-red-700 active:scale-95" // Added active state
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
                className="group bg-[#1e1e1e] hover:bg-[#2a2a2a] p-3 rounded-lg shadow-md hover:shadow-lg
                           transition-all duration-200 ease-in-out animate-fadeIn flex items-center gap-3 hover:scale-105" // Updated BGs, added hover:shadow-lg
              >
                {track.album?.image ? (
                  <img
                    src={track.album.image}
                    alt={track.album.name || "Album Art"}
                    className="w-10 h-10 rounded object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded bg-gray-600 flex items-center justify-center flex-shrink-0">
                    <AlbumArtPlaceholderIcon className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white truncate text-sm">
                    {track.name || "Unknown Track"}
                  </div>
                  <div className="text-xs text-gray-400 truncate">
                    {track.artists?.map(a => a.name).join(', ') || "Unknown Artist"}
                  </div>
                </div>
                <span className="text-xs text-gray-400 mr-2 flex-shrink-0">
                  {formatDuration(track.duration_ms)}
                </span>
                <button
                  onClick={() => onRemove(track.id)}
                  className="text-gray-400 hover:text-red-500 p-1.5 rounded-full
                             hover:bg-red-500/10 transition-colors duration-200"
                  title="Remove from queue"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
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
