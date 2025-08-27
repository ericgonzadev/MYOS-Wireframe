// This function hides all main cards
// Usually called when switching between different views
function hideMainCards() {
    document.querySelectorAll('.main-card').forEach(function(el){
        el.style.display = 'none';
    });
}

// Shows the preview screen
function previewSong() {
    hideMainCards();

    // Update header text
    var headerText = document.getElementById('header-text');
    headerText.innerHTML = "<i>Preview Song</i>";

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
    if (chosenWords === 6) {
        document.getElementById('custom-play-button').style.display = 'block';
        document.getElementById('custom-play-button-disabled').style.display = 'none';
    }

    // Shows the preview screen again
    previewSong();
}

function playSong() {
    hideMainCards();

    console.log("Playing song with words:\n" +
        sessionStorage.getItem(1) + ", " +
        sessionStorage.getItem(2) + ", " +
        sessionStorage.getItem(3) + ", " +
        sessionStorage.getItem(4) + ", " +
        sessionStorage.getItem(5) + ", " +
        sessionStorage.getItem(6)
    );

    document.getElementById('custom-video-card').style.display = 'block';

    // Load first video
    var word = sessionStorage.getItem(1);
    console.log("Loading video for word: " + word);
    var video = document.getElementById('custom-video-src');
    video.src = 'assets/vid/' + word.replace(/ /g, '_') + 'Video.mp4';  // Directly change the src attribute of the video element
    video.load();        // Reload the video element with the new source

    for (let i = 2; i <= 6; i++) {
        setTimeout(() => {
            var word = sessionStorage.getItem(i);
            console.log("Loading video for word: " + word);
            var video = document.getElementById('custom-video-src');
            video.src = 'assets/vid/' + word.replace(/ /g, '_') + 'Video.mp4';  // Directly change the src attribute of the video element
            video.load();        // Reload the video element with the new source
        }, 4000 * i);
    }
}