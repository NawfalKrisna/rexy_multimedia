const audio = document.getElementById("roarAudio");
const wrap = document.getElementById("dinoWrap");
const roarBtn = document.getElementById("roarBtn");
const walkBtn = document.getElementById("walkBtn");
const lookBtn = document.getElementById("lookBtn");
const playBtn = document.getElementById("playBtn");
const volume = document.getElementById("volume");
const progress = document.getElementById("trackProgress");
const audioState = document.getElementById("audioState");
const status = document.getElementById("status");
const mood = document.getElementById("mood");
let animationTimer;

audio.volume = Number(volume.value);
volume.addEventListener("input", () => audio.volume = Number(volume.value));

function animate(kind, duration, message, moodText) {
  wrap.classList.remove("roaring", "walking", "looking");
  void wrap.offsetWidth;
  wrap.classList.add(kind);
  clearTimeout(animationTimer);
  animationTimer = setTimeout(() => wrap.classList.remove(kind), duration);
  status.textContent = message;
  mood.textContent = "MOOD: " + moodText;
}

async function playRoar() {
  try {
    audio.currentTime = 0;
    await audio.play();
    animate("roaring", 2400, "Rexy mengeluarkan auman dahsyatnya!", "AGGRESSIVE");
  } catch (err) {
    status.textContent = "Audio belum bisa diputar. Coba tekan tombol auman sekali lagi.";
    audioState.textContent = "TAP TO PLAY";
  }
}
roarBtn.addEventListener("click", playRoar);
playBtn.addEventListener("click", async () => {
  if (audio.paused) {
    if (audio.ended) audio.currentTime = 0;
    try {
      await audio.play();
      playBtn.textContent = "Ⅱ";
      audioState.textContent = "PLAYING";
      status.textContent = "Memutar file auman T-Rex.";
    } catch {
      status.textContent = "Browser menolak audio. Tekan tombol putar sekali lagi.";
    }
  } else {
    audio.pause();
    playBtn.textContent = "▶";
    audioState.textContent = "PAUSED";
  }
});
walkBtn.addEventListener("click", () => {
  animate("walking", 3000, "Rexy mulai bergerak dan mengentakkan tubuhnya.", "MOVING");
});
lookBtn.addEventListener("click", () => {
  animate("looking", 2400, "Rexy mengamati sekeliling dengan waspada.", "ALERT");
});
audio.addEventListener("timeupdate", () => {
  const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  progress.style.width = pct + "%";
});
audio.addEventListener("play", () => {
  playBtn.textContent = "Ⅱ";
  audioState.textContent = "PLAYING";
});
audio.addEventListener("pause", () => {
  playBtn.textContent = "▶";
  if (!audio.ended) audioState.textContent = "PAUSED";
});
audio.addEventListener("ended", () => {
  playBtn.textContent = "▶";
  audioState.textContent = "READY";
  progress.style.width = "0%";
  wrap.classList.remove("roaring");
  mood.textContent = "MOOD: ALERT";
});
audio.addEventListener("error", () => {
  audioState.textContent = "AUDIO ERROR";
  status.textContent = "File audio tidak ditemukan. Pastikan folder assets ikut di-upload.";
});
