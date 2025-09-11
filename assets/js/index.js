// Default values
sessionStorage.setItem('songName', 'Garden Pig');

// This function hides all main cards
// Usually called when switching between different views
function hideMainCards() {
    document.querySelectorAll('.main-card').forEach(function(el){
        el.style.display = 'none';
    });
}

function showSongList() {
    hideMainCards();

    // Update header text
    var headerText = document.getElementById('header-text');
    headerText.innerHTML = "<i>Songs</i>";

    document.getElementById('song-list').style.display = 'block';
}

// Shows the preview screen
function previewSong() {
    hideMainCards();

    // Update header text
    var headerText = document.getElementById('header-text');
    headerText.innerHTML = "<i>" + sessionStorage.getItem('songName') + "</i>";

    // Update lyrics

    // Update vocabulary

    // Show the preview screen
    document.getElementById('preview').style.display = 'block';
}

// Show the 'select words' screen
function showWords(line) {
    hideMainCards();

    console.log("Show words for line: " + line);

    // Shows the appropriate words for the selected line
    document.getElementById('new-words-' + line).style.display = 'block';
}

// Handles action when word is selected
function selectWord(index, word) {
    hideMainCards();

    // Saves word to sessionStorage with index as key
    console.log("Selected word: " + word + " at index: " + index);
    sessionStorage.setItem(index, word);
    console.log("Word stored in sessionStorage: " + JSON.stringify(sessionStorage));

    // Replaces the '[custom word]' text with chosen word
    var previewWord = document.getElementById('custom-word-' + index);
    previewWord.textContent = word;

    // Preload video
    preloadVideo(index, word);

    // Show image of custom word
    var previewImage = document.getElementById('custom-img-' + index);
    previewImage.src = 'assets/img/' + word.replace(/ /g, '_') + 'Word.png';
    previewImage.style.display = 'block';

    // Show 'Play' button if all word have been selected
    var chosenWords = 0;
    document.querySelectorAll('.custom-word').forEach(function(el){
        if (el.innerHTML != '[choose word]') {
            chosenWords++;
        }
    });

    console.log("Number of chosen words: " + chosenWords);

    var songName = document.getElementById('custom-song-name').value;
    if (chosenWords === 6 && songName) {
        document.getElementById('custom-play-button').style.display = 'block';
        document.getElementById('custom-play-button-disabled').style.display = 'none';
        sessionStorage.setItem('songName', songName);
    }

    // Shows the preview screen again
    previewSong();
}

function preloadVideo(index, word) {
    var video = document.getElementById('custom-video-src' + index);
    video.src = 'assets/video/' + word.replace(/ /g, '_') + 'Video.mp4';  // Directly change the src attribute of the video element
    video.load();        // Reload the video element with the new source
    video.pause();
}

function playSong() {
    hideMainCards();

    // Create custom song card
    var songListRow = document.getElementById('song-list-row')
    songListRow.insertAdjacentHTML('afterbegin',`
        <div class="col-lg-4">
            <div class="card">
                <img src="assets/img/` + sessionStorage.getItem(1) + `Word.png" class="card-img-top song-list-img" alt="...">
                <div class="card-body text-center">
                    <h5 class="card-text">` + sessionStorage.getItem('songName') + `</h5>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary btn-block" onclick="playCustomSong('` + sessionStorage.getItem(1) + "', '" +
                        sessionStorage.getItem(2) + "', '" +
                        sessionStorage.getItem(3) + "', '" +
                        sessionStorage.getItem(4) + "', '" +
                        sessionStorage.getItem(5) + "', '" +
                        sessionStorage.getItem(6) + `')">Play ▶︎</button>
                        <p class="text-danger">Custom Song</p>
                    </div>
                </div>
            </div>
        </div>
    `);

    // Play background audio
    const audio = document.getElementById('background-audio');
    audio.volume = 0.3;
    audio.play();
    

    console.log("Playing song with words:\n" +
        sessionStorage.getItem(1) + ", " +
        sessionStorage.getItem(2) + ", " +
        sessionStorage.getItem(3) + ", " +
        sessionStorage.getItem(4) + ", " +
        sessionStorage.getItem(5) + ", " +
        sessionStorage.getItem(6)
    );

    document.getElementById('custom-video-card').style.display = 'block';

    // Load videos with offest times
    loadVideo(1, 1000);
    loadVideo(2, 4000);
    loadVideo(3, 7400);
    loadVideo(4, 11400);
    loadVideo(5, 14800);
    loadVideo(6, 18300);
}

function loadVideo(index, timeOffset) {
    setTimeout(() => {
        document.querySelectorAll('.custom-video-src').forEach(function(el){
            el.style.display = 'none';
        });
        var video = document.getElementById('custom-video-src' + index);
        video.style.display = 'block';
        video.play();
    }, timeOffset);
}

function stopSong() {
    hideMainCards();

    document.querySelectorAll('.custom-video-src').forEach(function(el){
        el.style.display = 'none';
    });

    const audio = document.getElementById('background-audio');
    audio.pause();
    audio.currentTime = 0;

    showSongList();
}

function playCustomSong(word1, word2, word3, word4, word5, word6) {
    hideMainCards();

    preloadVideo(1, word1);
    preloadVideo(2, word2);
    preloadVideo(3, word3);
    preloadVideo(4, word4);
    preloadVideo(5, word5);
    preloadVideo(6, word6);

    // Play background audio
    const audio = document.getElementById('background-audio');
    audio.volume = 0.3;
    audio.play();

    document.getElementById('custom-video-card').style.display = 'block';

    // Load videos with offest times
    loadVideo(1, 1000);
    loadVideo(2, 4000);
    loadVideo(3, 7400);
    loadVideo(4, 11400);
    loadVideo(5, 14800);
    loadVideo(6, 18300);
}
