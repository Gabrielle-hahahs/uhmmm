const letters = {
  miss: {
    title: "Open when you miss me ♡",
    text: "Hi, love. I wish I could be beside you right now, even just for a little while. Since I can't give you a hug through the screen, I hope this letter can remind you that you're on my mind. Take care of yourself for me, okay? One day at a time. 💗"
  },
  tired: {
    title: "Open when you're tired 🌷",
    text: "Hey, baby. You don't have to do everything perfectly, and you don't have to be okay every second. Rest when you need to. I'm proud of you for getting through today, even if it felt ordinary or difficult. Please be gentle with yourself."
  },
  sad: {
    title: "Open when you're sad 🧸",
    text: "I might not always know the perfect thing to say, but I want you to know that your feelings matter to me. You don't have to explain everything if you don't feel like it. I can listen, stay with you, or give you space — whatever helps you most. ♡"
  },
  smile: {
    title: "Open when you need a smile 🎀",
    text: "Tiny reminder: somewhere, there's someone who feels lucky to know you. That someone is me. I hope something kind happens to you today, and if not, I hope this little note gives you at least one small reason to smile."
  }
};

document.querySelectorAll(".letter-card").forEach((card) => {
  card.addEventListener("click", () => {
    const letter = letters[card.dataset.letter];
    document.getElementById("letterTitle").textContent = letter.title;
    document.getElementById("letterText").textContent = letter.text;
    document.getElementById("letterPaper").hidden = false;
    document.getElementById("letterPaper").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});

document.getElementById("closeLetter").addEventListener("click", () => {
  document.getElementById("letterPaper").hidden = true;
});

document.getElementById("surpriseBtn").addEventListener("click", () => {
  const message = document.getElementById("surpriseMessage");
  message.hidden = !message.hidden;
  document.getElementById("surpriseBtn").textContent = message.hidden
    ? "Open your little world ♡"
    : "A little message for you ♡";
});

const notes = [
  "I hope something makes you smile today. ♡",
  "You don't have to be loud to be loved.",
  "Just checking in: have you had some water, love? 🎀",
  "I'm glad our paths crossed.",
  "You make ordinary conversations feel special.",
  "Please remember to be kind to yourself today.",
  "If I could, I'd send you the coziest hug right now. 🧸",
  "No pressure to say anything big. I'm happy just getting to know you.",
  "One little note to say: I'm thinking of you. 💗",
  "I hope your day is as gentle as you deserve."
];

let lastNoteIndex = -1;
let noteCount = 0;

document.getElementById("noteBtn").addEventListener("click", () => {
  let index = Math.floor(Math.random() * notes.length);
  if (notes.length > 1 && index === lastNoteIndex) index = (index + 1) % notes.length;
  lastNoteIndex = index;
  noteCount += 1;
  document.getElementById("loveNote").textContent = notes[index];
  document.getElementById("noteCount").textContent = `You picked ${noteCount} little ${noteCount === 1 ? "note" : "notes"} ♡`;
});
const songs = [
  {
    title: "o_ninanais(128k).mp3",
    artist: "Arthur Nery",
    file: "./o_ninanais(128k).mp3"
  },
  {
    title: "Song 2",
    artist: "Artist name",
    file: "./Song2.mp3"
  },
  {
    title: "Song 3",
    artist: "Artist name",
    file: "./Song3.mp3"
  },
  {
    title: "Song 4",
    artist: "Artist name",
    file: "./Song4.mp3"
  },
  {
    title: "Song 5",
    artist: "Artist name",
    file: "./Song5.mp3"
  }
];

const songList = document.getElementById("song-list");
const audio = document.getElementById("audio-player");
const playPause = document.getElementById("play-pause");
const currentTitle = document.getElementById("current-title");
const currentArtist = document.getElementById("current-artist");
const progressBar = document.getElementById("progress-bar");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

let selectedSong = -1;

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function renderSongs() {
  songList.innerHTML = "";

  songs.forEach((song, index) => {
    const item = document.createElement("div");
    item.className = "song-item";
    item.dataset.index = index;

    const icon = document.createElement("div");
    icon.className = "song-icon";
    icon.textContent = "♫";

    const details = document.createElement("div");
    details.className = "song-details";

    const title = document.createElement("h3");
    title.textContent = song.title;

    const artist = document.createElement("p");
    artist.textContent = song.artist;

    details.append(title, artist);

    const button = document.createElement("button");
    button.className = "song-select";
    button.type = "button";
    button.textContent = "▶";
    button.setAttribute("aria-label", `Play ${song.title}`);

    button.addEventListener("click", () => playSong(index));

    item.append(icon, details, button);
    songList.appendChild(item);
  });

  updateActiveSong();
}

function updateActiveSong() {
  document.querySelectorAll(".song-item").forEach((item, index) => {
    const active = index === selectedSong;
    item.classList.toggle("active", active);

    const button = item.querySelector(".song-select");
    if (button) {
      button.textContent =
        active && !audio.paused ? "Ⅱ" : "▶";
    }
  });
}

async function playSong(index) {
  if (index < 0 || index >= songs.length) return;

  selectedSong = index;
  const song = songs[index];

  currentTitle.textContent = song.title;
  currentArtist.textContent = song.artist;

  audio.src = song.file;
  audio.load();

  updateActiveSong();

  try {
    await audio.play();
    playPause.textContent = "Ⅱ";
  } catch (error) {
    playPause.textContent = "▶";
    alert(
      `Hindi ma-play ang "${song.title}". ` +
      `Tingnan kung na-upload na ang ${song.file} sa GitHub.`
    );
  }

  updateActiveSong();
}

playPause.addEventListener("click", async () => {
  if (selectedSong === -1) {
    await playSong(0);
    return;
  }

  if (audio.paused) {
    try {
      await audio.play();
    } catch (error) {
      alert("Hindi ma-play ang kanta. Tingnan ang audio file.");
    }
  } else {
    audio.pause();
  }

  playPause.textContent = audio.paused ? "▶" : "Ⅱ";
  updateActiveSong();
});

audio.addEventListener("timeupdate", () => {
  currentTime.textContent = formatTime(audio.currentTime);

  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    progressBar.value =
      (audio.currentTime / audio.duration) * 100;
  }
});

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});

progressBar.addEventListener("input", () => {
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    audio.currentTime = (Number(progressBar.value) / 100)
      * audio.duration;
  }
});

audio.addEventListener("ended", () => {
  if (selectedSong < songs.length - 1) {
    playSong(selectedSong + 1);
  } else {
    playPause.textContent = "▶";
    updateActiveSong();
  }
});

renderSongs();
                       
