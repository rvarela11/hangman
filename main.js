// All Elements
const answerForm = document.getElementById('answer-form');
const answerInput = document.getElementById('answer-input');
const audioPlayer = document.getElementById('audio_preview');
const errorMessage = document.getElementById('error-message');
const livesNumber = document.getElementById('livesNumber');
const missedWord = document.getElementById('missedWord');
const playButton = document.querySelector('.answer-button');
const wordToGuess = document.getElementById('wordToGuess');

// Global variables
let livesLeft = 10;
let userCorrectGuessesArray = [];
let userCorrectGuesses = "";
let word = "";
const wordToGuessChildren = wordToGuess.children;

// Disable input box until the "Play" button is clicked
answerInput.disabled = true;

// ---------------------------------------------------------
// --------------------- Play Button -----------------------
// ---------------------------------------------------------

playButton.addEventListener('click', handlePlayButtonClick);

function handlePlayButtonClick () {

  canvas();

  // clear items
  clearCanvas();
  clearWord();
  clearWrongAnswer();
  resetLives();

  // Set lives to 10 & enable answerInput
  createLives();
  answerInput.disabled = false;

  // This URL will return a top 10 list. 
  const URL = 'http://itunes.apple.com/us/rss/topsongs/genre=1/json';

  fetch(URL)
  .then(response => response.json() )
  .then((data) => {
    const artistPicked = data.feed.entry[Math.floor(Math.random()* 11)];
    createWord(artistPicked['im:artist'].label.toLowerCase());
    createAudioPlayer(artistPicked.link[1].attributes.href);
  })
  .catch(error => console.log(error) );

}

// ----------------------------------------------------------------------
// --------------------- Word To Guess Container ------------------------
// ----------------------------------------------------------------------

createWord = (artist) => {
  // Setting artist argument to the global const word
  word = artist;

  artist.split("").forEach((letter) => {
    const div = document.createElement('div');
    // Separating the spaces in the artist name
    if (letter.charCodeAt(0) - 97 === -65) {
      div.classList.add('space');
    } else {
      div.classList.add('wordBreakdown');
    }
    wordToGuess.appendChild(div);
  });

}

clearWord = () => {
  for (let i = wordToGuessChildren.length - 1; i >= 0; i--) {
    wordToGuess.removeChild(wordToGuessChildren[i]);
  }
}

// ------------------------------------------------------------------------
// ------------------ Audio Player & Lives Container ----------------------
// ------------------------------------------------------------------------

createAudioPlayer = link => audioPlayer.setAttribute("src",link);

createLives = () => livesNumber.innerHTML = livesLeft;

resetLives = () => livesLeft = 10;

// ---------------------------------------------------------------
// ------------------ Missed Word Container ----------------------
// ---------------------------------------------------------------

wrongAnswer = (letter) => {

  // Animate is for the stickman hangman
  animate();

  // The wrong character will be placed in the missedWord.
  // Lives will reduce by 1.
  // When lives hit 0 the user will be shown "Game Over" and the input box will become disabled. The word will also be shown
  missedWord.innerHTML += letter;
  livesLeft--;
  if (livesLeft < 1) {
    livesNumber.innerHTML = "Game Over";
    answerInput.disabled = true;
    showWord();
  } else {
    livesNumber.innerHTML = livesLeft;
  }
}

showWord = () => {
  word.split("").forEach((letter, i) => {
     wordToGuessChildren[i].innerHTML = letter;
  });
}

clearWrongAnswer = () => missedWord.innerHTML = "";

// ----------------------------------------------------------
// --------------------- Answer Input -----------------------
// ----------------------------------------------------------

answerForm.addEventListener('submit', submit);

function submit (e) {
  e.preventDefault();
  const answerInputLength = answerInput.value.length;

// This switch sends error messages
  switch (true) {
    case answerInputLength > 1:
      errorMessage.innerHTML = "Please only 1 letter at a time";
      break;
    case answerInputLength === 0:
      errorMessage.innerHTML = "Don't be shy. Type a letter.";
      break;
    default:
      errorMessage.innerHTML = "";
    
    // Placing the checkAnswer function inside the switch so that the error message does not create wrong letters and the stickman
    checkAnswer(answerInput.value);
  }
  document.getElementById('answer-input').value = "";
}

checkAnswer = (value) => {

  const letter = value.toLowerCase();
  const wordSplit = word.split("");

//If the value is included in the word
  if(word.includes(letter)) {
    for (let i = 0; i < wordSplit.length; i++) {
      if (wordSplit[i] === letter) {
        wordToGuess.children[i].innerHTML = letter;
        userCorrectGuessesArray = [];
        for (let i = 0; i < wordToGuessChildren.length; i++) {
          userCorrectGuessesArray.push(wordToGuessChildren[i].innerHTML);
        }
      }
    }
    decodeHTMLEntities(userCorrectGuessesArray.join(""));
    if (userCorrectGuesses === word.split(" ").join("")) {
      livesNumber.innerHTML = "Winner!";
      answerInput.disabled = true;
    }
  } else {
    wrongAnswer(letter);
  }
}

decodeHTMLEntities = (str) => {
    str = str.replace(/&amp;/g, '&')
    userCorrectGuesses = str;
}

// --------------------------------------------------
// ------------------ Stickman ----------------------
// --------------------------------------------------

const drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1];
const myStickman = document.getElementById("stickman");
let context = myStickman.getContext('2d');

// Animate
function animate () {
  const drawMe = livesLeft - 1;
  drawArray[drawMe]();
}

// Hangman

function clearCanvas () {
  context.clearRect(0, 0, 400, 400);
}

function canvas (){
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;
};

function draw ($pathFromx, $pathFromy, $pathTox, $pathToy) {
  context.moveTo($pathFromx, $pathFromy);
  context.lineTo($pathTox, $pathToy);
  context.stroke();
}

function frame1 () {
  draw (0, 150, 150, 150);
 };
function frame2 () {
  draw (10, 0, 10, 600);
 };
function frame3 () {
  draw (0, 5, 70, 5);
 };
function frame4 () {
  draw (60, 5, 60, 15);
};
function head (){
  context.beginPath();
  context.arc(60, 25, 10, 0, Math.PI*2, true);
  context.stroke();
}
function torso () {
  draw (60, 36, 60, 70);
};
function leftArm () {
  draw (60, 46, 20, 50);
};
function rightArm () {
  draw (60, 46, 100, 50);
};
function leftLeg () {
  draw (60, 70, 20, 100);
};
function rightLeg () {
  draw (60, 70, 100, 100);
};