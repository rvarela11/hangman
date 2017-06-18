// Next
  // 1. SASS
  // 2. Make it responsive

// All Elements
const wordContainer = document.getElementsByClassName('wordContainer');
const audioPlayer = document.getElementById('audio_preview');
const livesNumber = document.getElementById('livesNumber');
const missedWordContainer = document.getElementsByClassName('missedWordContainer');
const form = document.getElementsByClassName('answerContainer__form');
const formInput = document.getElementById('form__input');
const errorContainer = document.getElementsByClassName('errorContainer');
const playButton = document.querySelector('.answerContainer__button');

// Global variables
let word = "";
let livesLeft = 10;
let userCorrectGuessesArray = [];
let userCorrectGuesses = "";
const wordContainerChildren = wordContainer[0].children;


// Disable input box until the "Play" button is clicked
formInput.disabled = true;

// ------------------------------------------------------------------------
// --------------------- answerContainer API Button -----------------------
// ------------------------------------------------------------------------

playButton.addEventListener('click', playButtonClicked);

function playButtonClicked () {

  //clear containers
  clearWrongAnswer();
  clearWord();
  resetLives();
  clearCanvas();
  canvas();

  //Set the lives container to 10 & enable input box
  createLives();
  formInput.disabled = false;

  //This URL will return a top 10 list. The artistPicked const is to select different songs each time the "Play" button is clicked
  const URL = 'http://itunes.apple.com/us/rss/topsongs/genre=1/json';

  fetch(URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    const artistPicked = data.feed.entry[Math.floor(Math.random()* 11)];
    createWord(artistPicked['im:artist'].label.toLowerCase());
    createAudioPlayer(artistPicked.link[1].attributes.href);
  })
  .catch(function(error) {
    console.log(error);
  });

}


// -------------------------------------------------------------
// --------------------- wordContainer -------------------------
// -------------------------------------------------------------

function createWord (w) {
  word = w;
  for (let i = 0; i < w.length; i++){
    const divChild = document.createElement('div');

    // Separating the spaces in the artist name
    if (w[i].charCodeAt(0) - 97 === -65) {
      divChild.classList.add('space');
    } else {
      divChild.classList.add('wordBreakdown');
    }
    wordContainer[0].appendChild(divChild);
  }
}

function clearWord () {
  for (let i = wordContainerChildren.length - 1; i >=0; i--) {
    wordContainer[0].removeChild(wordContainerChildren[i]);
  }
}

// -------------------------------------------------------
// ------------------ infoContainer ----------------------
// -------------------------------------------------------

function createAudioPlayer (l) {
  audioPlayer.setAttribute("src",l);
}

function createLives () {
  livesNumber.innerHTML = livesLeft;
}

function resetLives () {
  livesLeft = 10;
}


// -------------------------------------------------------------
// ------------------ missedWordContainer ----------------------
// -------------------------------------------------------------

function wrongAnswer (wa) {
  // Animate is for the stickman hangman
  animate();

  // The wrong character will be placed in the missedWordContainer.
  // Lives will reduce by 1.
  // Lives hit 0 the user will be shown "Game Over" and the input box will become disabled. The word will also be shown
  missedWordContainer[0].innerHTML = missedWordContainer[0].innerHTML + wa;
  livesLeft--;
  if (livesLeft < 1) {
    livesNumber.innerHTML = "Game Over";
    formInput.disabled = true;
    showWord();
  } else {
    livesNumber.innerHTML = livesLeft;
  }
}

function showWord () {
  for (let i = 0; i < word.length; i++){
    wordContainerChildren[i].innerHTML = word[i];
  }
}

function clearWrongAnswer() {
  missedWordContainer[0].innerHTML = "";
}

// -------------------------------------------------------------
// --------------------- answerContainer -----------------------
// -------------------------------------------------------------

form[0].addEventListener('submit', submit);

function submit (e) {
  const formValueLen = formInput.value.length;
  e.preventDefault();

// This switch sends error messages
  switch (true) {
    case formValueLen > 1:
      errorContainer[0].innerHTML = "Please only 1 letter at a time";
      break;
    case formValueLen === 0:
      errorContainer[0].innerHTML = "Don't be shy. Type a letter.";
      break;
    default:
    errorContainer[0].innerHTML = "";
      checkAnswer(formInput.value);
  }
  document.getElementById('form__input').value = "";
}


function checkAnswer (value) {

  const v = value.toLowerCase();
  const wordSplit = word.split("");

//If the value is included in the word
  if(word.includes(v)) {
    for (let i = 0; i < wordSplit.length; i++) {
      if (wordSplit[i] === v) {
        wordContainer[0].children[i].innerHTML = v;
        userCorrectGuessesArray = [];
        for (let i = 0; i < wordContainerChildren.length; i++) {
          userCorrectGuessesArray.push(wordContainerChildren[i].innerHTML);
        }
      }
    }
    decodeHTMLEntities(userCorrectGuessesArray.join(""));
    if (userCorrectGuesses === word.split(" ").join("")) {
      livesNumber.innerHTML = "Winner!";
      formInput.disabled = true;
    }
  } else {
    wrongAnswer(v);
  }
}

function decodeHTMLEntities (str) {
    str = str.replace(/&amp;/g, '&')
    userCorrectGuesses = str;
}

// --------------------------------------------------
// ------------------ stickman ----------------------
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
