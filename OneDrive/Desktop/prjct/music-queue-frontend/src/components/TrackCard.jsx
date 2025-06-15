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
      style={style} // For animation delay
      className={`group bg-[#1e1e1e] hover:bg-[#2a2a2a] px-4 py-3 rounded-lg shadow-lg
                 transition-all duration-200 ease-in-out hover:shadow-xl hover:scale-105 flex items-center gap-4 font-['Roboto'] ${className}`} // Updated BGs and Padding
    >
      {track.album?.image ? (
        <img
          src={track.album.image}
          alt={albumName}
          className="w-20 h-20 rounded-md object-cover shadow-md flex-shrink-0"
        />
      ) : (
        <AlbumArtPlaceholder />
      )}
      <div className="flex-1 min-w-0">
        <div className="font-bold text-white truncate text-base mb-1">
          {track.name || "Unknown Track"}
        </div>
        <div className="text-sm text-gray-300 truncate mb-0.5">
          {artistsName}
        </div>
        <div className="text-xs text-gray-400 truncate">
          {albumName}
        </div>
      </div>
      <div className="flex flex-col items-end justify-between self-stretch ml-2">
        <span className="text-xs text-gray-400 mb-2 flex-shrink-0">
          {formatDuration(track.duration_ms)}
        </span>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md
                     font-medium shadow-md transition-all duration-200 ease-in-out
                     text-sm hover:scale-[1.03] active:scale-[0.97] flex-shrink-0"
          onClick={() => onAddToQueue(track)}
        >
          Add
        </button>
      </div>
    </div>
  );
}
