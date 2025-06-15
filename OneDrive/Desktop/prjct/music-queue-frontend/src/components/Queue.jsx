import React from "react";

const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export default function Queue({ queue, onRemove }) {
  return (
    <>
      <div className="p-5 bg-[#1f1f1f] shadow-md">
        <h2 className="text-xl font-bold text-white flex items-center gap-3">
          Queue
          <span className="text-sm font-medium px-3 py-1 rounded-full bg-[#2a2a2a] text-[#1DB954]">
            {queue.length} tracks
          </span>
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {!queue.length ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center px-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                <span className="text-3xl">🎵</span>
              </div>
              <p className="text-gray-400 text-base">
                Your queue is empty
                <span className="block text-sm text-gray-500 mt-2">
                  Add tracks from the search panel
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div className="p-5 space-y-1">
            {queue.map((track, index) => (
              <div
                key={track.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="group hover:bg-[#282828] p-3 rounded-lg
                  transition-all duration-200 animate-fadeIn cursor-default"
              >
                <div className="flex gap-3">
                  {track.album?.image && (
                    <img
                      src={track.album.image}
                      alt={track.album.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white truncate text-[15px]">
                      {track.name}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-[#1DB954]">
                        {track.duration_ms ? formatDuration(track.duration_ms) : '--:--'}
                      </span>
                      <span className="text-[13px] text-gray-400 truncate">
                        {track.artists?.map(a => a.name).join(', ')}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(track.id)}
                    className="text-gray-400 hover:text-red-400 p-2 rounded-full
                      hover:bg-red-400/10 opacity-0 group-hover:opacity-100
                      transition-all duration-200 hover:scale-110 -mr-1"
                    title="Remove from queue"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
