import "./playbar.css";
import { useState } from "react";

// 75 seconds -> "1:15"
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${secs}`;
}

export default function PlayerBar({
  isPlaying,
  setIsPlaying,
  song,
  playNext,
  playBefore,
  likedIds,
  toggleLikedSongs,
  shuffle,
  setShuffle,
  repeat,
  setRepeat,
  progress,
  setProgress,
  songLength,
  toggleQueue,
}) {
  const [volume, setVolume] = useState(70);
  const isLiked = likedIds.includes(song.id);

  // Click on the progress bar to jump to that spot
  function seek(e) {
    const box = e.currentTarget.getBoundingClientRect();
    const fraction = (e.clientX - box.left) / box.width;
    setProgress(Math.floor(fraction * songLength));
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  return (
    <div className="player-bar">
      <div className="playbar-left">
        <img src={song.image} alt="album image" className="playbar-img" />

        <div className="playbar-song-info">
          <div className="song-name-row">
            <p className="playbar-song-name">{song.title}</p>
            <button
              className={isLiked ? "liked" : ""}
              onClick={() => toggleLikedSongs(song.id)}
            >
              {isLiked ? "♥" : "♡"}
            </button>
          </div>

          <p className="playbar-artist-name">{song.artist}</p>
        </div>
      </div>

      <div className="playbar-middle">
        <div className="controls">
          <button
            className={shuffle ? "active" : ""}
            onClick={() => setShuffle(!shuffle)}
          >
            🔀
          </button>
          <button className="before" onClick={playBefore}>
            ◀◀
          </button>
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button className="next" onClick={playNext}>
            ▶▶
          </button>
          <button
            className={repeat ? "rewind active" : "rewind"}
            onClick={() => setRepeat(!repeat)}
          >
            ↻
          </button>
        </div>

        <div className="progress-row">
          <span>{formatTime(progress)}</span>
          <div className="progress-bar" onClick={seek}>
            <div
              className="progress"
              style={{ width: `${(progress / songLength) * 100}%` }}
            ></div>
          </div>
          <span>{formatTime(songLength)}</span>
        </div>
      </div>

      <div className="playbar-right">
        <p>🎙</p>
        <p onClick={toggleQueue}>☷</p>
        <p>🖥</p>
        <div className="volume">
          <p onClick={() => setVolume(volume === 0 ? 70 : 0)}>
            {volume === 0 ? "🔇" : "🔊"}
          </p>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="volume-slider"
          />
        </div>
        <p onClick={toggleFullscreen}>⛶</p>
      </div>
    </div>
  );
}
