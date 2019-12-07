const player = document.querySelector('.looper');
const video = player.querySelector('video');
const playToggle = player.querySelector('.looper-toggle');
const playToggleIcon = playToggle.querySelector('svg');
const pauseIcon = playToggleIcon.innerHTML;
const playIcon =
  '<title id="play-title">Play</title>' +
  '<use xlink:href="#icon-play" />';

function togglePlay() {
    if (video.paused) {
        video.play();
        player.classList.remove('looper-paused');
        playToggle.setAttribute('title', 'Pause');
    } else {
        video.pause();
        player.classList.add('looper-paused');
        playToggle.setAttribute('title', 'Play');
    }
}

function updatePlayToggle() {
    if (this.paused) {
        playToggleIcon.innerHTML = playIcon;
    } else {
        setTimeout(() => {
            playToggleIcon.innerHTML = pauseIcon;
        }, 100);
    }
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
