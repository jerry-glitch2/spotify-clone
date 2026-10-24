import "./sidebar.css";

export default function SideBar({
  song,
  nextSong,
  openLikedSongs,
  showQueue,
  closeQueue,
}) {
  return (
    <>
      <div className="left-sidebar">
        <div className="first-row">
          <p>Your Library</p>
          <button>+</button>
          <img
            src="https://imgs.search.brave.com/gYIinRK6KPKRrNsXNHZ8HA6eA64T9XCpJPpyCYi60ZI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4w/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvYXJyb3dzLWRp/cmVjdGlvbnMtMy81/MTIvZXhwYW5kX2Fy/cm93c19lbmxhcmdl/X3pvb20tMTI4LnBu/Zw"
            alt="expand"
          />
        </div>

        <div className="second-row">
          <p>Playlists</p>
          <p>Artists</p>
          <p>Albums</p>
          <p>Podcasts</p>
        </div>

        <div className="third-row">
          <img
            src="https://imgs.search.brave.com/hNoxaZVgU7yvSL0VaoEKNh9BWIDaqBWRIv5Lalp0cbM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODVlNGFlMWNiMTFi/MjI3NDkxYzMzOTMu/cG5n"
            alt="search"
          />
          <img
            src="https://imgs.search.brave.com/sgafvuMHpQTS5RnTH54NRWyKzNKCK2oAXbSo9tdymVw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuaWNvbi1pY29u/cy5jb20vMjU1MS9Q/TkcvOTYvc29ydF9k/ZXNjZW5kaW5nX2lj/b25fMTUyNzU1LnBu/Zw"
            alt="sort"
          />
        </div>

        <div className="playlist-row">
          <div className="liked-songs-row" onClick={openLikedSongs}>
            <div className="liked-songs">
              <div className="liked-icon">♥</div>
            </div>
            <div>
              <h3>Liked Songs</h3>
              <p>Playlist • 42 songs</p>
            </div>
          </div>
        </div>
      </div>
      {showQueue && (
        <div className="right-sidebar">
          <div className="queue-row">
            <h3>Queue</h3>
            <p onClick={closeQueue}>x</p>
          </div>
          <div className="queue-songs">
            <div className="now-playing">
              <p>Now playing</p>
              <div className="now-playing-song">
                <img src={song.image} alt="album song" />
                <div className="now-playing-song-info">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>
              </div>
            </div>

            {nextSong && (
              <div className="next-up">
                <p>Next up</p>
                <div className="next-up-song">
                  <img src={nextSong.image} alt="album song" />
                  <div className="next-up-song-info">
                    <h3>{nextSong.title}</h3>
                    <p>{nextSong.artist}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
