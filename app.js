const API = "https://api.lyrics.ovh/suggest/";

// select items
const songscontainer = document.getElementById("songs");
const lyricsContainer = document.getElementById("lyrics");
const notFountDiv = document.getElementById("not-found");

const getSongs = async (keyword) => {
  const res = await fetch(`${API}${keyword}`);
  const data = await res.json();

  if (data.data.length === 0) {
    notFountDiv.style.display = "block";
    songscontainer.innerHTML = "";
    lyricsContainer.innerHTML = "";
  } else {
    notFountDiv.style.display = "none";
    displaySongs(data.data);
  }
};

const getLyrics = async (title, name) => {
  const res = await fetch(`https://api.lyrics.ovh/v1/${name}/${title}`);
  const data = await res.json();
  if (data.lyrics) {
    showLyrics(data.lyrics);
  } else {
    console.log("meri jan tu");
    console.log(data.lyrics);
  }
};

document.getElementById("search-btn").addEventListener("click", () => {
  const searchInput = document.getElementById("search-song");
  const keyword = searchInput.value;
  if (keyword) {
    getSongs(keyword);
  }

  searchInput.value = "";
});

const displaySongs = (songs) => {
  lyricsContainer.innerHTML = "";

  const html = songs.map((song) => {
    const {
      title,
      artist: { name },
    } = song;

    return `
        <div class="single-result row align-items-center my-3 p-3">
          <div class="col-md-9 text-center text-md-left">
            <h3 class="lyrics-name">${title}</h3>
            <p class="author lead">Album by <span>${name}</span></p>
          </div>
          <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyrics('${title}','${name}')" class="btn btn-success">Get Lyrics</button>
          </div>
        </div>`;
  });

  songscontainer.innerHTML = html.join("");
};

const showLyrics = (lyrics) => {
  const html = `<pre class="lyric text-white">${lyrics}</pre>`;

  lyricsContainer.innerHTML = html;
};

const notFoundSong = () => {
  const html = `
      `;

  notFountDiv.innerHTML = html;
};
