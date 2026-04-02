const playlist = {
  name: "PulseDeck Prime Mix",
  createdDate: new Date("2026-03-30"),
  songCount: 25,
  songs: [
    { id: 1, title: "Ilaya Nila", artist: "S. P. Balasubrahmanyam", album: "Payanangal Mudivathillai", genre: "Tamil 80s Melody", duration: "4:34", favorite: true, playCount: 0 },
    { id: 2, title: "Poongatru Puthithanathu", artist: "K. J. Yesudas", album: "Moondram Pirai", genre: "Tamil 80s Melody", duration: "4:16", favorite: true, playCount: 0 },
    { id: 3, title: "Kanne Kalaimaane", artist: "K. J. Yesudas", album: "Moondram Pirai", genre: "Tamil 80s Classical", duration: "4:09", favorite: false, playCount: 0 },
    { id: 4, title: "Mandram Vandha Thendralukku", artist: "S. P. Balasubrahmanyam", album: "Mouna Ragam", genre: "Tamil 80s Romantic", duration: "4:47", favorite: true, playCount: 0 },
    { id: 5, title: "Vaa Vennila", artist: "S. P. Balasubrahmanyam", album: "Mella Thiranthathu Kadhavu", genre: "Tamil 80s Romantic", duration: "4:11", favorite: true, playCount: 0 },
    { id: 6, title: "Raja Rajadhi Rajan", artist: "S. P. Balasubrahmanyam", album: "Agni Natchathiram", genre: "Tamil 80s Dance", duration: "4:52", favorite: true, playCount: 0 },
    { id: 7, title: "Keladi Kanmani", artist: "S. P. Balasubrahmanyam", album: "Pudhu Pudhu Arthangal", genre: "Tamil 80s Romantic", duration: "4:44", favorite: true, playCount: 0 },
    { id: 8, title: "Poove Sempoove", artist: "K. J. Yesudas", album: "Solla Thudikuthu Manasu", genre: "Tamil 80s Sad Melody", duration: "5:07", favorite: true, playCount: 0 },
    { id: 9, title: "Thenpaandi Cheemayile", artist: "K. J. Yesudas", album: "Nayakan", genre: "Tamil 80s Folk", duration: "4:38", favorite: true, playCount: 0 },
    { id: 10, title: "Poove Sempoove", artist: "K. J. Yesudas", album: "Solla Thudikuthu Manasu", genre: "Tamil 80s Sad Melody", duration: "5:07", favorite: true, playCount: 0 },
    { id: 11, title: "En Iniya Pon Nilave", artist: "K. J. Yesudas", album: "Moodu Pani", genre: "Tamil 80s Melody", duration: "4:20", favorite: false, playCount: 0 },
    { id: 12, title: "Aayiram Thamarai", artist: "S. Janaki", album: "Alaigal Oivathillai", genre: "Tamil 80s Melody", duration: "4:28", favorite: false, playCount: 0 },
    { id: 13, title: "Senthoora Poove", artist: "S. Janaki", album: "16 Vayathinile", genre: "Tamil 80s Folk", duration: "4:19", favorite: true, playCount: 0 },
    { id: 14, title: "Putham Pudhu Kaalai", artist: "S. Janaki", album: "Alaigal Oivathillai", genre: "Tamil 80s Soft Melody", duration: "4:18", favorite: true, playCount: 0 },
    { id: 15, title: "Indha Minminikku", artist: "S. Janaki", album: "Sigappu Rojakkal", genre: "Tamil 80s Romantic", duration: "4:01", favorite: false, playCount: 0 },
    { id: 16, title: "Sundari Kannal Oru Sethi", artist: "S. Janaki", album: "Thalapathi", genre: "Tamil 90s Duet", duration: "7:12", favorite: true, playCount: 0 },
    { id: 17, title: "Maalai Pozhudhin Mayakathile", artist: "P. Susheela", album: "Bhagyalakshmi", genre: "Tamil Classic", duration: "3:58", favorite: false, playCount: 0 },
    { id: 18, title: "Chittu Kuruvi Mutham Koduthu", artist: "P. Susheela", album: "Puthiya Paravai", genre: "Tamil Classic", duration: "3:32", favorite: true, playCount: 0 },
    { id: 19, title: "Aalaya Maniyin Osaiyai", artist: "P. Susheela", album: "Paalum Pazhamum", genre: "Tamil Classic", duration: "3:41", favorite: false, playCount: 0 },
    { id: 20, title: "Athai Madi Methaiyadi", artist: "P. Susheela", album: "Karpagam", genre: "Tamil Classic", duration: "3:49", favorite: false, playCount: 0 },
    { id: 21, title: "Kodiyile Malligapoo", artist: "P. Susheela", album: "Kadalora Kavithaigal", genre: "Tamil 80s Folk", duration: "4:14", favorite: true, playCount: 0 },
    { id: 22, title: "Janani Janani", artist: "Ilaiyaraaja", album: "Thai Moogambigai", genre: "Tamil Devotional", duration: "6:31", favorite: true, playCount: 0 },
    { id: 23, title: "Naan Thedum Sevvanthi Poovidu", artist: "Ilaiyaraaja", album: "Dharma Pathini", genre: "Tamil 80s Melody", duration: "4:46", favorite: false, playCount: 0 },
    { id: 24, title: "Thendral Vandhu Theendum Pothu", artist: "Ilaiyaraaja", album: "Avatharam", genre: "Tamil 90s Melody", duration: "5:11", favorite: true, playCount: 0 },
    { id: 25, title: "Poombaaraiyil Pottu Vaitha", artist: "Ilaiyaraaja", album: "En Uyir Kannamma", genre: "Tamil 80s Folk", duration: "4:22", favorite: false, playCount: 0 },
    { id: 26, title: "Metti Oli Kaatrodu", artist: "Ilaiyaraaja", album: "Metti", genre: "Tamil 80s Melody", duration: "4:10", favorite: true, playCount: 0 }
  ]
};

const recentlyPlayed = [null, null, null, null, null];
let nowPlaying = null;
let isPlaying = false;

let selectedGenre = "All";
let selectedArtist = "All";
let searchTerm = "";
let sortKey = "title";

const searchInput = document.querySelector("#searchInput");
const genreFilter = document.querySelector("#genreFilter");
const artistFilter = document.querySelector("#artistFilter");
const sortBySelect = document.querySelector("#sortBy");
const songGrid = document.querySelector("#songGrid");
const nowPlayingContent = document.querySelector("#nowPlayingContent");
const recentlyPlayedList = document.querySelector("#recentlyPlayedList");
const toggleBtn = document.querySelector("#toggleBtn");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const totalSongsStat = document.querySelector("#totalSongsStat");
const favoritesStat = document.querySelector("#favoritesStat");
const playsStat = document.querySelector("#playsStat");

const artistImageMap = {
  "S. P. Balasubrahmanyam":
    "./assets/artists/spb.jpg",
  "K. J. Yesudas":
    "./assets/artists/yesudas.jpg",
  "S. Janaki":
    "./assets/artists/sjanaki.jpg",
  "P. Susheela":
    "./assets/artists/psusheela.jpg",
  Ilaiyaraaja:
    "./assets/artists/ilaiyaraaja-2.jpg"
};

function filterByGenre(songs, genre) {
  if (genre === "All") {
    return songs;
  }
  return songs.filter((song) => song.genre === genre);
}

function filterByArtist(songs, artist) {
  if (artist === "All") {
    return songs;
  }
  return songs.filter((song) => song.artist === artist);
}

function sortBy(songs, key) {
  return [...songs].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return aValue - bValue;
    }

    return String(aValue).localeCompare(String(bValue));
  });
}

function initials(text) {
  return text
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getArtistImage(artist) {
  return artistImageMap[artist] ?? `https://picsum.photos/seed/${encodeURIComponent(artist)}/500/500`;
}

function getArtistFallback(artist) {
  return `https://picsum.photos/seed/${encodeURIComponent(`${artist}-fallback`)}/500/500`;
}

function durationToSeconds(duration) {
  const [m, s] = duration.split(":").map(Number);
  return m * 60 + s;
}

function updateRecentlyPlayed(song) {
  const existingIndex = recentlyPlayed.findIndex((item) => item?.id === song.id);

  if (existingIndex !== -1) {
    for (let i = existingIndex; i > 0; i -= 1) {
      recentlyPlayed[i] = recentlyPlayed[i - 1];
    }
    recentlyPlayed[0] = song;
    return;
  }

  for (let i = recentlyPlayed.length - 1; i > 0; i -= 1) {
    recentlyPlayed[i] = recentlyPlayed[i - 1];
  }
  recentlyPlayed[0] = song;
}

function getVisibleSongs() {
  const byGenre = filterByGenre(playlist.songs, selectedGenre);
  const byArtist = filterByArtist(byGenre, selectedArtist);
  const searched = byArtist.filter((song) => {
    const token = `${song.title} ${song.artist} ${song.album}`.toLowerCase();
    return token.includes(searchTerm.toLowerCase());
  });

  if (sortKey === "duration") {
    return [...searched].sort((a, b) => durationToSeconds(a.duration) - durationToSeconds(b.duration));
  }

  return sortBy(searched, sortKey);
}

function playSong(songId) {
  const song = playlist.songs.find((item) => item.id === songId);
  if (!song) {
    return;
  }

  song.playCount += 1;
  nowPlaying = song;
  isPlaying = true;
  updateRecentlyPlayed(song);
  renderAll();
}

function playRelative(offset) {
  if (!nowPlaying) {
    const firstVisible = getVisibleSongs()[0];
    if (firstVisible) {
      playSong(firstVisible.id);
    }
    return;
  }

  const songs = getVisibleSongs();
  if (songs.length === 0) {
    return;
  }

  const currentIndex = songs.findIndex((song) => song.id === nowPlaying?.id);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const nextIndex = (safeIndex + offset + songs.length) % songs.length;
  playSong(songs[nextIndex].id);
}

function toggleFavorite(songId) {
  const song = playlist.songs.find((item) => item.id === songId);
  if (!song) {
    return;
  }

  song.favorite = !song.favorite;
  renderAll();
}

function togglePlayPause() {
  if (!nowPlaying) {
    const firstVisible = getVisibleSongs()[0];
    if (firstVisible) {
      playSong(firstVisible.id);
    }
    return;
  }

  isPlaying = !isPlaying;
  renderNowPlaying();
  renderSongs();
}

function populateFilters() {
  if (!genreFilter || !artistFilter) {
    return;
  }

  const genres = ["All", ...new Set(playlist.songs.map((song) => song.genre))];
  const artists = ["All", ...new Set(playlist.songs.map((song) => song.artist))];

  genreFilter.innerHTML = genres.map((genre) => `<option value="${genre}">${genre}</option>`).join("");
  artistFilter.innerHTML = artists.map((artist) => `<option value="${artist}">${artist}</option>`).join("");
}

function renderSongs() {
  if (!songGrid) {
    return;
  }

  const songs = getVisibleSongs();

  if (songs.length === 0) {
    songGrid.innerHTML = `<p class="no-results">No songs match your filter criteria.</p>`;
    return;
  }

  songGrid.innerHTML = songs
    .map(
      (song) => `
      <article class="song-card ${nowPlaying?.id === song.id ? "active" : ""}">
        <div class="cover-art">
          <img src="${getArtistImage(song.artist)}" data-fallback="${getArtistFallback(song.artist)}" alt="${song.artist}" loading="lazy" referrerpolicy="no-referrer" onerror="if(this.dataset.fallback){this.src=this.dataset.fallback;this.removeAttribute('data-fallback');}" />
        </div>
        <h3 class="song-title">${song.title}</h3>
        <p class="song-info">Artist: ${song.artist}</p>
        <p class="song-info">Album: ${song.album}</p>
        <p class="song-info">Genre: ${song.genre}</p>
        <div class="song-footer">
          <span>${song.duration} | Plays ${song.playCount}</span>
          <div class="song-actions">
            <button class="favorite-btn ${song.favorite ? "is-favorite" : ""}" data-favorite-id="${song.id}" type="button" aria-label="${song.favorite ? "Remove from favorites" : "Add to favorites"}" title="${song.favorite ? "Remove from favorites" : "Add to favorites"}">${song.favorite ? "?" : "?"}</button>
            <button class="play-btn" data-song-id="${song.id}" type="button">${nowPlaying?.id === song.id && isPlaying ? "Pause" : "Play"}</button>
          </div>
        </div>
      </article>
    `
    )
    .join("");

  songGrid.querySelectorAll(".play-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.songId);
      if (nowPlaying?.id === id) {
        togglePlayPause();
      } else {
        playSong(id);
      }
    });
  });

  songGrid.querySelectorAll(".favorite-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.favoriteId);
      toggleFavorite(id);
    });
  });
}

function renderNowPlaying() {
  if (!nowPlayingContent) {
    return;
  }

  if (!nowPlaying) {
    nowPlayingContent.innerHTML = `<p class="empty-state">Select a song to start listening.</p>`;
    if (toggleBtn) {
      toggleBtn.textContent = "Play";
    }
    return;
  }

  nowPlayingContent.innerHTML = `
    <div class="cover-mini">
      <img src="${getArtistImage(nowPlaying.artist)}" data-fallback="${getArtistFallback(nowPlaying.artist)}" alt="${nowPlaying.artist}" loading="lazy" referrerpolicy="no-referrer" onerror="if(this.dataset.fallback){this.src=this.dataset.fallback;this.removeAttribute('data-fallback');}" />
    </div>
    <div class="meta">
      <p><strong>${nowPlaying.title}</strong></p>
      <p>${nowPlaying.artist} | ${nowPlaying.album}</p>
      <p>${nowPlaying.genre} | ${nowPlaying.duration} | Plays ${nowPlaying.playCount}</p>
      <p>Status: ${isPlaying ? "Playing" : "Paused"}</p>
    </div>
  `;

  if (toggleBtn) {
    toggleBtn.textContent = isPlaying ? "Pause" : "Play";
  }
}

function renderRecentlyPlayed() {
  if (!recentlyPlayedList) {
    return;
  }

  const items = recentlyPlayed
    .filter((song) => song !== null)
    .map((song) => `<li>${song.title} - ${song.artist}</li>`)
    .join("");

  recentlyPlayedList.innerHTML = items || `<li class="empty-state">No songs played yet.</li>`;
}

function renderStats() {
  const totalFavorites = playlist.songs.filter((song) => song.favorite).length;
  const totalPlays = playlist.songs.reduce((sum, song) => sum + song.playCount, 0);

  if (totalSongsStat) {
    totalSongsStat.textContent = String(playlist.songCount);
  }

  if (favoritesStat) {
    favoritesStat.textContent = String(totalFavorites);
  }

  if (playsStat) {
    playsStat.textContent = String(totalPlays);
  }
}

function renderAll() {
  renderNowPlaying();
  renderRecentlyPlayed();
  renderSongs();
  renderStats();
}

function bindEvents() {
  searchInput?.addEventListener("input", (event) => {
    searchTerm = event.target.value;
    renderSongs();
  });

  genreFilter?.addEventListener("change", (event) => {
    selectedGenre = event.target.value;
    renderSongs();
  });

  artistFilter?.addEventListener("change", (event) => {
    selectedArtist = event.target.value;
    renderSongs();
  });

  sortBySelect?.addEventListener("change", (event) => {
    sortKey = event.target.value;
    renderSongs();
  });

  prevBtn?.addEventListener("click", () => {
    playRelative(-1);
  });

  nextBtn?.addEventListener("click", () => {
    playRelative(1);
  });

  toggleBtn?.addEventListener("click", () => {
    togglePlayPause();
  });
}

function init() {
  playlist.songCount = playlist.songs.length;
  populateFilters();
  bindEvents();
  renderAll();
}

init();
