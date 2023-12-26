const playBtnEl = document.querySelector("#play");
const prevBtnEl = document.querySelector("#prev");
const nextBtnEl = document.querySelector("#next");
const audioEl = document.querySelector("audio");

const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const imgEl = document.querySelector("img");

const progressContainerEl = document.getElementById("progress-container");
const progressBarEl = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.querySelector(".duration");

const musicList = [
  {
    coverImg: "assets/img/img-1.jpg",
    name: "Jacinto",
    title: "Electric Chill Machine",
    audio: "assets/music/music-1.mp3",
  },
  {
    coverImg: "assets/img/img-2.jpg",
    name: "Heisenberg",
    title: "Seven Nation Army (Remix)",
    audio: "assets/music/music-2.mp3",
  },
  {
    coverImg: "assets/img/img-3.jpg",
    name: "pinkman",
    title: "Electric Chill Machine 2",
    audio: "assets/music/music-3.mp3",
  },
  {
    coverImg: "assets/img/img-4.jpg",
    name: "Skyler",
    title: "Front Row (Remix)",
    audio: "assets/music/music-4.mp3",
  },
];
let isPlaying = false;
const playSong = () => {
  audioEl.play();
  playBtnEl.classList.replace("fa-play", "fa-pause");
  playBtnEl.setAttribute("title", "Pause");
  isPlaying = true;
};
const pauseSong = () => {
  audioEl.pause();
  playBtnEl.classList.replace("fa-pause", "fa-play");
  playBtnEl.setAttribute("title", "Play");

  isPlaying = false;
};

playBtnEl.addEventListener("click", () => {
  !isPlaying ? playSong() : pauseSong();
});

function loadSong(song) {
  const { coverImg, name, title, audio } = song;
  titleEl.textContent = title;
  artistEl.textContent = name;
  imgEl.src = coverImg;
  audioEl.src = audio;
}
let songIndex = 0;

const prevSong = () => {
  if (songIndex === 0) {
    songIndex = musicList.length - 1;
  } else {
    songIndex -= 1;
  }
  loadSong(musicList[songIndex]);
  playSong();
};
const nextSong = () => {
  if (songIndex === musicList.length - 1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  loadSong(musicList[songIndex]);
  playSong();
};

loadSong(musicList[songIndex]);

const updateProgressBar = (e) => {
  if (isPlaying) {
    const { duration, currentTime } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    progressBarEl.style.width = `${progressPercent}%`;

    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    const totalDuration = `${durationMinutes}:${durationSeconds}`;

    if (durationSeconds) {
      durationEl.textContent = totalDuration;
    }

    const currentMinutes = Math.floor(currentTime / 60);
    let currentseconds = Math.floor(currentTime % 60);
    if (currentseconds < 10) {
      currentseconds = `0${currentseconds}`;
    }

    currentTimeEl.textContent = `${currentMinutes}:${currentseconds}`;
  }
};

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  console.log(width, clickX);
  const { duration } = audioEl;
  audioEl.currentTime = (clickX / width) * duration;
}

prevBtnEl.addEventListener("click", prevSong);
nextBtnEl.addEventListener("click", nextSong);
audioEl.addEventListener("timeupdate", updateProgressBar);

audioEl.addEventListener("ended", nextSong);

progressContainerEl.addEventListener("click", setProgressBar);
