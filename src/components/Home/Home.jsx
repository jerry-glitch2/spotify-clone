import "./home.css";

import { songs } from "../data";

export default function Home({
  onSongSelect,
  search,
  likedIds,
  toggleLikedSongs,
  openPlaylist,
  setOpenPlaylist,
  showQueue,
}) {
  const recentlyPlayed = [
    {
      key: 1,
      title: "SOS",
      image:
        "https://i.pinimg.com/736x/a2/f9/63/a2f96373a7dae6b82a97ebb9ba01994e.jpg",
    },
    {
      key: 2,
      title: "Etorica",
      image:
        "https://imgs.search.brave.com/PGje_Nx3nFHor4-UMfVz1cqHbCZkNwVZDu9sFnQpYIg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnNj/ZG4uY28vaW1hZ2Uv/YWI2NzYxNmQwMDAw/MWUwMjUyZmMyODYx/YjU3NDBmNGZlN2I2/YjA0NQ",
    },
    {
      key: 3,
      title: "Drunk In love",
      image:
        "https://imgs.search.brave.com/_3D-G9tNUm-FfJcDM1KyZhSVIBdHPC3xKIJiQ3KTZUI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzY5L2Fj/Lzg5LzY5YWM4OTA2/ZDNmODdkOWMxNmE4/MWZmMjhkYmYyODA5/LmpwZw",
    },
  ];

  const madeForYou = [
    {
      key: 1,
      title: "GIVEON, Bryson Tiller, Kehlani and more",
      image:
        "https://imgs.search.brave.com/YkG-5bY19730npSQhKjUjjd1JIgPPbdtKkINIemRfKY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMS5z/bmRjZG4uY29tL2Fy/dHdvcmtzLVBJajBY/eTdNV3p6d1hvWU4t/U1Vaa1F3LXQxMDgw/eDEwODAuanBn",
      artists: ["Giveon", "Bryson Tiller", "Kehlani"],
    },
    {
      key: 2,
      title: "Drake, Tory Lanez, Travis Scott and more",
      image:
        "https://imgs.search.brave.com/1deGNt-9PdeRFw5R64pSUakk1a21gzDsWvCjGrlEfS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9waWNr/YXNzby5zcG90aWZ5/Y2RuLmNvbS9pbWFn/ZS9hYjY3YzBkZTAw/MDBkZWVmL2R0L3Yx/L2ltZy9kYWlseS8y/L2FiNjc2MTYxMDAw/MGU1ZWJhYWRjMThj/YWM4ZDQ4MTI0MzU3/YzM4ZTYvZW4",
      artists: ["Drake", "Tory Lanez", "Travis Scott"],
    },
  ];

  const searching = search.trim() !== "";

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase()),
  );

  const playlistSongs = openPlaylist?.isLiked
    ? songs.filter((s) => likedIds.includes(s.id))
    : openPlaylist?.song;

  // Start the open playlist from the top (does nothing if it has no songs)
  function playPlaylist() {
    if (openPlaylist.song.length !== 0) {
      onSongSelect(openPlaylist.song[0], openPlaylist.song);
    }
  }

  // One song row, used by both the search results and the playlist view
  function renderSong(song, list) {
    const isLiked = likedIds.includes(song.id);

    return (
      <div
        className="playlist-song-card"
        key={song.id}
        onClick={() => onSongSelect(song, list)}
      >
        <img src={song.image} alt="song cover" />
        <div className="playlist-song-card-info">
          <h3>{song.title}</h3>
          <p>{song.artist}</p>
        </div>
        <button
          className={isLiked ? "like-btn liked" : "like-btn"}
          onClick={(e) => {
            e.stopPropagation(); // don't also play the song when liking it
            toggleLikedSongs(song.id);
          }}
        >
          {isLiked ? "♥" : "♡"}
        </button>
      </div>
    );
  }

  return (
    <div className={showQueue ? "home" : "home wide"}>
      {searching ? (
        <>
          <h2>Search Results</h2>
          <div className="playlist-songs">
            {filteredSongs.length === 0 ? (
              <p className="no-results">No songs found for "{search}"</p>
            ) : (
              filteredSongs.map((song) => renderSong(song, filteredSongs))
            )}
          </div>
        </>
      ) : openPlaylist === null ? (
        <>
          <div className="home-first-row">
            <p>All</p>
            <p>Music</p>
            <p>Podcasts</p>
            <p>Audiobooks</p>
          </div>

          <div className="home-second-row">
            <h2>Recently Played</h2>
            <div className="recently-played">
              {recentlyPlayed.map((item) => (
                <div
                  className="recently-played-card"
                  key={item.key}
                  onClick={() =>
                    setOpenPlaylist({
                      ...item,
                      song: songs.filter((s) => s.album === item.title),
                    })
                  }
                >
                  <img src={item.image} alt="album cover" />
                  <div className="recently-played-card-info">
                    <h3>{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="home-third-row">
            <h2>Made for you</h2>
            <div className="made-for-you">
              {madeForYou.map((item) => (
                <div
                  className="made-for-you-card"
                  key={item.key}
                  onClick={() =>
                    setOpenPlaylist({
                      ...item,
                      song: songs.filter((s) =>
                        item.artists.includes(s.artist),
                      ),
                    })
                  }
                >
                  <img src={item.image} alt="album cover" />
                  <div className="made-for-you-card-info">
                    <p>{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="playlist-view">
            <button onClick={() => setOpenPlaylist(null)}> ←</button>

            <div className="playlist-header">
              {openPlaylist.isLiked ? (
                <div className="liked-cover">♥</div>
              ) : (
                <img src={openPlaylist.image} alt="playlist cover" />
              )}

              <div className="playlist-info">
                <p>Playlist</p>
                <h1>{openPlaylist.title}</h1>
                <p>{playlistSongs.length} songs</p>
              </div>
            </div>

            <div className="playlist-actions">
              <button className="play-button" onClick={playPlaylist}>
                ▶
              </button>
              <button>♡</button>
              <button>•••</button>
            </div>

            <div className="playlist-songs">
              {playlistSongs.length === 0 ? (
                <p className="no-results">Songs you like will show up here</p>
              ) : (
                playlistSongs.map((song) => renderSong(song, playlistSongs))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
