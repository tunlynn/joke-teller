const audioElement = document.getElementById('audio');
const button = document.getElementById('button');


// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing joke into VoiceRSS API
function tellJoke(joke) {
    VoiceRSS.speech({
        key: 'f98d7ec343e24449a7a47fc3b93068e8',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get JOkes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming,Pun?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup}...${data.delivery}`
        } else {
            joke = data.joke;
        }
        // Text-to-speech
        tellJoke(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        // Catch Error Here
        console.log('wooops! something went wrong: ', error);
    }
}

// Event Listener
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);