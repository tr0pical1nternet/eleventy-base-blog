const player = document.querySelector('.loop-player');
const video = player.querySelector('video');
const playToggle = player.querySelector('.loop-player-toggle');
const playToggleIcon = playToggle.querySelector('svg');
const pauseIcon = playToggleIcon.innerHTML;
const playIcon =
  '<title id="play-title">Play</title>' +
  '<use xlink:href="#icon-play" />';

function togglePlay() {
    if (video.paused) {
        video.play();
        player.classlist.remove('paused');
        // playing = true;
    } else {
        video.pause();
        player.classList.add('paused');
        // playing = false;
    }
}

function updatePlayToggle() {
    const icon = this.paused ? playIcon : pauseIcon;
    playToggleIcon.innerHTML = icon;
}

function videoKeys() {
    if (['Enter', 'Space'].includes(event.code)) {
        event.preventDefault();
        togglePlay();
    }
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayToggle);
video.addEventListener('pause', updatePlayToggle);
video.addEventListener('keydown', videoKeys);

playToggle.addEventListener('click', togglePlay);
