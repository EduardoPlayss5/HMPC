let musicFile;

var player = document.querySelector('#player');
const musicName = document.querySelector('#musicName');
const playPauseButton = document.querySelector('#playPauseButton');
const currentTime = document.querySelector('#currentTime');
const duration = document.querySelector('#duration');
const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('.progress');
const loadMusicButton = document.querySelector("#loadMusicButton");
const mp4Player = document.querySelector("#mp4Player");

const elementInput = document.querySelector("#fileInput");

const textButtonPlay = "<i class='bx bx-caret-right'></i>";
const textButtonPause = "<i class='bx bx-pause'></i>";
const textButtonReset = "<i class='bx bx-reset'></i>";

// added sources:
// load local music
// mp4 support

document.querySelector("#goBack").addEventListener("click", () => {
    player = document.querySelector('#player');
    mp4Player.classList.add("hidden");
    document.querySelector(".player").classList.remove("hidden");
    document.querySelector("#goBack").classList.add("hidden");
    mp4Player.pause();
    playPauseButton.innerHTML = textButtonReset;
    mp4Player.src = "";
});

playPauseButton.onclick = () => playPause();
player.ontimeupdate = () => updateTime();

function resetPage(){
    location.reload();
}

loadMusicButton.addEventListener("click", () => {
    const music = elementInput.files[0];

    if (music.type === "video/mp4"){
        player = mp4Player;
        document.querySelector(".player").classList.add("hidden");
        player.classList.remove("hidden");
        document.querySelector("#goBack").classList.remove("hidden");
        playPauseButton.onclick = () => resetPage();
    }

    if (music) {
        musicFile = URL.createObjectURL(music);
        player.src = musicFile;
        musicName.textContent = music.name;

        playPause();
    } else {
        console.error("No file selected");
    }
});

const playPause = () => {
    if (player.paused) {
        player.play();
        playPauseButton.innerHTML = textButtonPause;
    } else {
        player.pause();
        playPauseButton.innerHTML = textButtonPlay;
    }
};

const formatZero = (n) => (n < 10 ? "0" + n : n);

progressBar.onclick = (e) => {
    const newTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
    player.currentTime = newTime;
}

const updateTime = () => {
    const currentMinutes = Math.floor(player.currentTime / 60);
    const currentSeconds = Math.floor(player.currentTime % 60);
    currentTime.textContent = currentMinutes + ":" + formatZero(currentSeconds)
    
    const durationFormatted = isNaN(player.duration) ? 0 : player.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration.textContent = durationMinutes + ":" + formatZero(durationSeconds)

    const progressWidth = durationFormatted ? (player.currentTime / durationFormatted) * 100 : 0;

    progress.style.width = progressWidth + "%";
}