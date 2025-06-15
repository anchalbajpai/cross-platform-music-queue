import React from "react";
import TrackCard from "./TrackCard";

export default function TrackList({ tracks, onAddToQueue, searchAttempted }) {
  if (!tracks.length) {
    if (!searchAttempted) {
      // Initial state: before any search is made
      return (
        <div className="h-full flex items-center justify-center p-6 font-['Roboto']"> {/* Added Roboto */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center">
              <span className="text-3xl text-gray-400">🎵</span>
            </div>
            <p className="text-gray-300 text-lg font-medium">
              Find your music
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Search for songs to add to the queue.
            </p>
          </div>
        </div>
      );
    } else {
      // Search was attempted, but no results
      return (
        <div className="h-full flex items-center justify-center p-6 font-['Roboto']"> {/* Added Roboto */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center">
              <span className="text-3xl text-gray-400">😕</span>
            </div>
            <p className="text-gray-300 text-lg font-medium">
              No tracks found.
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Try a different search term or platform.
            </p>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="h-full overflow-y-auto p-4 bg-[#2D3748] font-['Roboto']"> {/* Added Roboto */}
      <div className="space-y-3">
        {tracks.map((track, index) => (
          <TrackCard
            key={track.id}
            track={track}
            onAddToQueue={onAddToQueue}
            // Applying animation delay: current subtask suggests 100ms
            style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
            className="animate-fadeIn"
          />
        ))}
      </div>
    </div>
  );
}
