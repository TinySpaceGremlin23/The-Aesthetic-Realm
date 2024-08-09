function toggleNav(){
    var topnav = document.getElementById("topnav");
    topnav.classList.toggle("show-nav");
}

document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('play');
    const previousBtn = document.getElementById('previous-btn');
    const nextBtn = document.getElementById('next-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const progressSlider = document.getElementById('progress-slider');
    const playlistBtn = document.getElementById('playlist-btn');
    const playlistContent = document.querySelector('.playlist-content');
    const playlist = document.getElementById('playlist');

    progressSlider.value = 0;

    // Toggle playlist visibility
    playlistBtn.addEventListener('click', function () {
        playlistContent.classList.toggle('show-playlist');
    });

    // Event listener to play the selected track from the playlist
    playlist.addEventListener('click', function (event) {
        if (event.target.tagName === 'LI') {
            const selectedIndex = Array.from(playlist.children).indexOf(event.target);
            playTrack(selectedIndex);
        }
    });

    let currentTrackIndex = 0; // Keep track of the current audio track index

    // Define an array of audio sources
    const audioSources = [
        "media/Deus Ex - 009 - UNATCO - Ambient.mp3",
        "media/Converter.mp3",
        "media/Insum (2019 Remaster).mp3",
        "media/The Pink Panther Theme.mp3",
        "media/Deus Ex - 076 - Paris Club 1 - Ambient.mp3",
        "media/Rob Zombie - Dragula [Hot Ro Herman Remix] (The Matrix).mp3",
        "media/Deus Ex_ Human Revolution Soundtrack - Hacking Ambient.mp3",
        "media/deadmau5 - Alone With You (HQ).mp3"
    ];

    // Function to play the current track
    function playTrack(index) {
        currentTrackIndex = index;
        audio.src = audioSources[currentTrackIndex];
        audio.play();
    }

    playBtn.addEventListener('click', function () {
        if (audio.paused || audio.ended) {
            audio.play();
            playBtn.textContent = '|| ';
        } else {
            audio.pause();
            playBtn.textContent = '▷';
        }
    });

    previousBtn.addEventListener('click', function () {
        // Go to the previous track
        currentTrackIndex = (currentTrackIndex - 1 + audioSources.length) % audioSources.length;
        playTrack(currentTrackIndex);
    });

    nextBtn.addEventListener('click', function () {
        // Go to the next track
        currentTrackIndex = (currentTrackIndex + 1) % audioSources.length;
        playTrack(currentTrackIndex);
    });

    volumeSlider.addEventListener('input', function () {
        audio.volume = volumeSlider.value / 100;
    });

    progressSlider.addEventListener('input', function () {
        const currentTime = (audio.duration * progressSlider.value) / 100;
        audio.currentTime = currentTime;
    });

    audio.addEventListener('timeupdate', function(){
        const progress = (audio.currentTime / audio.duration) * 100;
        progressSlider.value = progress;
    });

    // Listen for the 'ended' event to play the next track automatically
    audio.addEventListener('ended', function () {
        currentTrackIndex = (currentTrackIndex + 1) % audioSources.length;
        playTrack(currentTrackIndex);
    });
});


