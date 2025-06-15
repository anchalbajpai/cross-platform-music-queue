import React from "react";

const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export default function TrackList({ tracks, onAddToQueue }) {
  if (!tracks.length) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2a2a2a] flex items-center justify-center">
            <span className="text-3xl">🔍</span>
          </div>
          <p className="text-gray-400 text-base">
            Search for your favorite tracks
            <span className="block text-sm text-gray-500 mt-2">
              Find music to add to your queue
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-5 space-y-1">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            style={{ animationDelay: `${index * 50}ms` }}
            className="group hover:bg-[#282828] p-3 rounded-lg
              transition-all duration-200 animate-fadeIn cursor-default"
          >
            <div className="flex items-center gap-3">
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
                    {track.artists?.map((a) => a.name).join(", ")}
                  </span>
                </div>
              </div>
              <button
                className="flex items-center gap-1.5 bg-transparent hover:bg-[#1DB954] 
                  border border-white/10 hover:border-transparent px-4 py-1.5 rounded-full
                  text-white/80 hover:text-white font-medium transition-all duration-200
                  text-sm hover:scale-[1.02] active:scale-[0.98] opacity-0 group-hover:opacity-100"
                onClick={() => onAddToQueue(track)}
              >
                <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 4v16m8-8H4"></path>
                </svg>
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
