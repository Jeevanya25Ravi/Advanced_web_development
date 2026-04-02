type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: string;
  favorite: boolean;
  playCount: number;
};

type Playlist = {
  name: string;
  createdDate: Date;
  songCount: number;
  songs: Song[];
};

type RecentlyPlayedTuple = [Song | null, Song | null, Song | null, Song | null, Song | null];

const playlist: Playlist = {
  name: "PulseDeck Prime Mix",
  createdDate: new Date("2026-03-30"),
  songCount: 16,
  songs: [
    { id: 1, title: "Ilaya Nila", artist: "S. P. Balasubrahmanyam", album: "Payanangal Mudivathillai", genre: "Tamil 80s Melody", duration: "4:34", favorite: true, playCount: 0 },
    { id: 2, title: "Poongatru Puthithanathu", artist: "K. J. Yesudas", album: "Moondram Pirai", genre: "Tamil 80s Melody", duration: "4:16", favorite: true, playCount: 0 },
    { id: 3, title: "Kanne Kalaimaane", artist: "K. J. Yesudas", album: "Moondram Pirai", genre: "Tamil 80s Classical", duration: "4:09", favorite: false, playCount: 0 },
    { id: 4, title: "Mandram Vandha Thendralukku", artist: "S. P. Balasubrahmanyam", album: "Mouna Ragam", genre: "Tamil 80s Romantic", duration: "4:47", favorite: true, playCount: 0 },
    { id: 5, title: "Vaa Vennila", artist: "S. P. Balasubrahmanyam", album: "Mella Thiranthathu Kadhavu", genre: "Tamil 80s Romantic", duration: "4:11", favorite: true, playCount: 0 },
    { id: 6, title: "Valaiyosai", artist: "S. P. Balasubrahmanyam", album: "Sathya", genre: "Tamil 80s Duet", duration: "4:33", favorite: false, playCount: 0 },
    { id: 7, title: "Raja Rajadhi Rajan", artist: "S. P. Balasubrahmanyam", album: "Agni Natchathiram", genre: "Tamil 80s Dance", duration: "4:52", favorite: true, playCount: 0 },
    { id: 8, title: "Pani Vizhum Malarvanam", artist: "S. P. Balasubrahmanyam", album: "Ninaivellam Nithya", genre: "Tamil 80s Soft Rock", duration: "4:24", favorite: false, playCount: 0 },
    { id: 9, title: "Aayiram Thamarai", artist: "S. Janaki", album: "Alaigal Oivathillai", genre: "Tamil 80s Melody", duration: "4:28", favorite: false, playCount: 0 },
    { id: 10, title: "Poove Sempoove", artist: "K. J. Yesudas", album: "Solla Thudikuthu Manasu", genre: "Tamil 80s Sad Melody", duration: "5:07", favorite: true, playCount: 0 },
    { id: 11, title: "Thenpaandi Cheemayile", artist: "K. J. Yesudas", album: "Nayakan", genre: "Tamil 80s Folk", duration: "4:38", favorite: true, playCount: 0 },
    { id: 12, title: "Nila Adhu Vanathumele", artist: "S. P. Balasubrahmanyam", album: "Nayagan", genre: "Tamil 80s Melody", duration: "4:03", favorite: false, playCount: 0 },
    { id: 13, title: "Keladi Kanmani", artist: "S. P. Balasubrahmanyam", album: "Pudhu Pudhu Arthangal", genre: "Tamil 80s Romantic", duration: "4:44", favorite: true, playCount: 0 },
    { id: 14, title: "En Iniya Pon Nilave", artist: "K. J. Yesudas", album: "Moodu Pani", genre: "Tamil 80s Melody", duration: "4:20", favorite: false, playCount: 0 },
    { id: 15, title: "Sundari Neeyum Sundaran Naanum", artist: "S. P. Balasubrahmanyam", album: "Michael Madana Kama Rajan", genre: "Tamil 80s Duet", duration: "5:12", favorite: true, playCount: 0 },
    { id: 16, title: "Kodiyile Malligapoo", artist: "P. Susheela", album: "Kadalora Kavithaigal", genre: "Tamil 80s Folk", duration: "4:14", favorite: false, playCount: 0 }
  ]
};

const recentlyPlayed: RecentlyPlayedTuple = [null, null, null, null, null];
let nowPlaying: Song | null = null;
let isPlaying = false;

let selectedGenre = "All";
let selectedArtist = "All";
let searchTerm = "";
let sortKey: keyof Song = "title";

const searchInput = document.querySelector<HTMLInputElement>("#searchInput");
const genreFilter = document.querySelector<HTMLSelectElement>("#genreFilter");
const artistFilter = document.querySelector<HTMLSelectElement>("#artistFilter");
const sortBySelect = document.querySelector<HTMLSelectElement>("#sortBy");
const songGrid = document.querySelector<HTMLDivElement>("#songGrid");
const nowPlayingContent = document.querySelector<HTMLDivElement>("#nowPlayingContent");
const recentlyPlayedList = document.querySelector<HTMLOListElement>("#recentlyPlayedList");
const toggleBtn = document.querySelector<HTMLButtonElement>("#toggleBtn");
const prevBtn = document.querySelector<HTMLButtonElement>("#prevBtn");
const nextBtn = document.querySelector<HTMLButtonElement>("#nextBtn");
const totalSongsStat = document.querySelector<HTMLElement>("#totalSongsStat");
const favoritesStat = document.querySelector<HTMLElement>("#favoritesStat");
const playsStat = document.querySelector<HTMLElement>("#playsStat");

const artistImageMap: Record<string, string> = {
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

function filterByGenre(songs: Song[], genre: string): Song[] {
  if (genre === "All") {
    return songs;
  }
  return songs.filter((song) => song.genre === genre);
}

function filterByArtist(songs: Song[], artist: string): Song[] {
  if (artist === "All") {
    return songs;
  }
  return songs.filter((song) => song.artist === artist);
}

function sortBy<K extends keyof Song>(songs: Song[], key: K): Song[] {
  return [...songs].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return aValue - bValue;
    }

    return String(aValue).localeCompare(String(bValue));
  });
}

function initials(text: string): string {
  return text
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getArtistImage(artist: string): string {
  return artistImageMap[artist] ?? `https://picsum.photos/seed/${encodeURIComponent(artist)}/500/500`;
}

function getArtistFallback(artist: string): string {
  return `https://picsum.photos/seed/${encodeURIComponent(`${artist}-fallback`)}/500/500`;
}

function durationToSeconds(duration: string): number {
  const [m, s] = duration.split(":").map(Number);
  return m * 60 + s;
}

function updateRecentlyPlayed(song: Song): void {
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

function getVisibleSongs(): Song[] {
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

function playSong(songId: number): void {
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

function playRelative(offset: number): void {
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

function toggleFavorite(songId: number): void {
  const song = playlist.songs.find((item) => item.id === songId);
  if (!song) {
    return;
  }

  song.favorite = !song.favorite;
  renderAll();
}

function togglePlayPause(): void {
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

function populateFilters(): void {
  if (!genreFilter || !artistFilter) {
    return;
  }

  const genres = ["All", ...new Set(playlist.songs.map((song) => song.genre))];
  const artists = ["All", ...new Set(playlist.songs.map((song) => song.artist))];

  genreFilter.innerHTML = genres.map((genre) => `<option value="${genre}">${genre}</option>`).join("");
  artistFilter.innerHTML = artists.map((artist) => `<option value="${artist}">${artist}</option>`).join("");
}

function renderSongs(): void {
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

  songGrid.querySelectorAll<HTMLButtonElement>(".play-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.songId);
      if (nowPlaying?.id === id) {
        togglePlayPause();
      } else {
        playSong(id);
      }
    });
  });

  songGrid.querySelectorAll<HTMLButtonElement>(".favorite-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.favoriteId);
      toggleFavorite(id);
    });
  });
}

function renderNowPlaying(): void {
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

function renderRecentlyPlayed(): void {
  if (!recentlyPlayedList) {
    return;
  }

  const items = recentlyPlayed
    .filter((song): song is Song => song !== null)
    .map((song) => `<li>${song.title} - ${song.artist}</li>`)
    .join("");

  recentlyPlayedList.innerHTML = items || `<li class="empty-state">No songs played yet.</li>`;
}

function renderStats(): void {
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

function renderAll(): void {
  renderNowPlaying();
  renderRecentlyPlayed();
  renderSongs();
  renderStats();
}

function bindEvents(): void {
  searchInput?.addEventListener("input", (event) => {
    searchTerm = (event.target as HTMLInputElement).value;
    renderSongs();
  });

  genreFilter?.addEventListener("change", (event) => {
    selectedGenre = (event.target as HTMLSelectElement).value;
    renderSongs();
  });

  artistFilter?.addEventListener("change", (event) => {
    selectedArtist = (event.target as HTMLSelectElement).value;
    renderSongs();
  });

  sortBySelect?.addEventListener("change", (event) => {
    sortKey = (event.target as HTMLSelectElement).value as keyof Song;
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

function init(): void {
  playlist.songCount = playlist.songs.length;
  populateFilters();
  bindEvents();
  renderAll();
}

init();
