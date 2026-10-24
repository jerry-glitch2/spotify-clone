import "./topnav.css";

export default function TopNav({ search, setSearch, goHome }) {
  return (
    <div className="top-nav">
      <div className="topnav-left">
        <img
          src="https://imgs.search.brave.com/wlPhMCXXhnfirVxmwZFrEz0y033jY1htevrJzRnX4G0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzY2Lzk4/L2M4LzY2OThjODk2/MzU3ZDgxNDM2NmYz/YmI1MjMwMTA3NmVm/LmpwZw"
          alt="spotify logo"
          className="logo-img"
          onClick={goHome}
        />
        <img
          src="https://imgs.search.brave.com/Ii7l55kbGzsp9gEQnLmBQIZmTcABPD6QQ-xJd43UgrU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLm1h/Z25pZmljLmNvbS8y/NTYvNjU4My82NTgz/NTY2LnBuZz9zZW10/PWFpc193aGl0ZV9s/YWJlbA"
          alt="home btn"
          className="home-btn"
          onClick={goHome}
        />
        <div className="search">
          <img
            src="https://imgs.search.brave.com/wn5Kc7QZdhB4BZ6rW9IylzAo4Y3wKas0FwX7PHhPKMU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91eHdp/bmcuY29tL3dwLWNv/bnRlbnQvdGhlbWVz/L3V4d2luZy9kb3du/bG9hZC91c2VyLWlu/dGVyZmFjZS9zZWFy/Y2gtbWFnbmlmeWlu/Zy1nbGFzcy13aGl0/ZS1pY29uLnBuZw"
            alt="search"
            className="search-icon"
          />
          <input
            className="search-bar"
            placeholder="What do you want to play?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="topnav-right">
        <img
          src="https://imgs.search.brave.com/7yMme1-eWfpL3XZrYvkETQwIvj9FYu7S9jw3V_JyCvI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTQv/Mzk2LzQzNy9zbWFs/bC9jb21pYy1zdHls/ZS1iZWxsLW5vdGlm/aWNhdGlvbi1pY29u/LXdpdGgtdHJhbnNw/YXJlbnQtYmFja2dy/b3VuZC1maWxlLXBu/Zy5wbmc"
          alt="notificatioon icon"
          className="notification-btn"
        />
        <img
          src="https://imgs.search.brave.com/LQW9UgH1XuDMazx0LERAybS9k8SE9sTwvl-mLqAGbWo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjAv/OTExLzczMi9zbWFs/bC9wcm9maWxlLWlj/b24tYXZhdGFyLWlj/b24tdXNlci1pY29u/LXBlcnNvbi1pY29u/LWZyZWUtcG5nLnBu/Zw"
          alt="profile-btn"
          className="profile-btn"
        />
      </div>
    </div>
  );
}
