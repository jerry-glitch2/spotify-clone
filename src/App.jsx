import "./App.css";
import { useState, useEffect } from "react";
import PlayerBar from "./components/Playbar/PlayerBar";
import TopNav from "./components/Topnav/TopNav";
import SideBar from "./components/Sidebar/SideBar";
import Home from "./components/Home/Home";

const SONG_LENGTH = 180; // every song is a pretend 3 minutes long

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState({
    id: 1,
    title: "kill bill",
    artist: "SZA",
    image:
      "https://i.pinimg.com/736x/a2/f9/63/a2f96373a7dae6b82a97ebb9ba01994e.jpg",
  });
  const [search, setSearch] = useState("");
  const [queue, setQueue] = useState([]);
  const [likedIds, setLikedIds] = useState([]);
  const [openPlaylist, setOpenPlaylist] = useState(null);
  const [showQueue, setShowQueue] = useState(true);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [progress, setProgress] = useState(0); // seconds into the song

  // Work out which songs come before / after the current one in the queue
  const currentIndex = queue.findIndex((s) => s.id === currentSong.id);
  const nextSong = queue[currentIndex + 1];
  const previousSong = queue[currentIndex - 1];
  const canGoNext = shuffle ? queue.length > 1 : Boolean(nextSong);

  // Start a song from the beginning
  function playSong(song) {
    setCurrentSong(song);
    setProgress(0);
    setIsPlaying(true);
  }

  function onSongSelect(song, list) {
    setQueue(list);
    playSong(song);
  }

  function playNext() {
    if (!canGoNext) return;

    if (shuffle) {
      // pick any song in the queue except the one playing now
      const others = queue.filter((s) => s.id !== currentSong.id);
      playSong(others[Math.floor(Math.random() * others.length)]);
    } else {
      playSong(nextSong);
    }
  }

  function playBefore() {
    if (previousSong) {
      playSong(previousSong);
    }
  }

  function toggleLikedSongs(id) {
    if (likedIds.includes(id)) {
      setLikedIds(likedIds.filter((x) => x !== id));
    } else {
      setLikedIds([...likedIds, id]);
    }
  }

  function openLikedSongs() {
    setSearch("");
    setOpenPlaylist({ title: "Liked Songs", isLiked: true });
  }

  function goHome() {
    setSearch("");
    setOpenPlaylist(null);
  }

  // Every second the song is playing, move the progress bar forward
  // Once a second: move the progress bar forward, or handle the song ending
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (progress + 1 < SONG_LENGTH) {
        setProgress(progress + 1);
      } else if (repeat) {
        setProgress(0);
      } else if (canGoNext) {
        playNext();
      } else {
        setIsPlaying(false);
        setProgress(0);
      }
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, progress, repeat, canGoNext]);

  return (
    <>
      <PlayerBar
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        song={currentSong}
        playNext={playNext}
        playBefore={playBefore}
        likedIds={likedIds}
        toggleLikedSongs={toggleLikedSongs}
        shuffle={shuffle}
        setShuffle={setShuffle}
        repeat={repeat}
        setRepeat={setRepeat}
        progress={progress}
        setProgress={setProgress}
        songLength={SONG_LENGTH}
        toggleQueue={() => setShowQueue(!showQueue)}
      />
      <TopNav search={search} setSearch={setSearch} goHome={goHome} />
      <div className="main-layout">
        <SideBar
          song={currentSong}
          nextSong={nextSong}
          likedCount={likedIds.length}
          openLikedSongs={openLikedSongs}
          showQueue={showQueue}
          closeQueue={() => setShowQueue(false)}
        />
        <Home
          onSongSelect={onSongSelect}
          search={search}
          likedIds={likedIds}
          toggleLikedSongs={toggleLikedSongs}
          openPlaylist={openPlaylist}
          setOpenPlaylist={setOpenPlaylist}
          showQueue={showQueue}
        />
      </div>
    </>
  );
}
