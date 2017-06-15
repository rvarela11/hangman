const words = [
  {
    word: 'cowboys',
    hint: 'Dallas'
  }
];

// Global variables
let word = "";
let livesLeft = 10;
let userCorrectGuesses = [];

// All Elements
const wordContainer = document.getElementsByClassName('wordContainer');
const hint = document.getElementsByClassName('infoContainer__hint');
const livesNumber = document.getElementById('livesNumber');
const missedWordContainer = document.getElementsByClassName('missedWordContainer');
const form = document.getElementsByClassName('answerContainer__form');
const formInput = document.getElementById('form__input');
const errorContainer = document.getElementsByClassName('errorContainer');

// -------------------------------------------------------------
// --------------------- wordContainer -------------------------
// -------------------------------------------------------------

canvas();

// For loop to assign the value to the correct function
words.forEach((wordInfo) => {
  createWord(wordInfo.word);
  word = wordInfo.word;
  createHint(wordInfo.hint);
  createLives();
})

function createWord(w) {
  for (let i = 0; i < w.length; i++){
    const divChild = document.createElement('div');
    divChild.classList.add('wordBreakdown');
    wordContainer[0].appendChild(divChild);
  }
}

// -------------------------------------------------------
// ------------------ infoContainer ----------------------
// -------------------------------------------------------

function createHint(h) {
  const h4Hint = document.createElement('h4');
  h4Hint.innerHTML = h;
  h4Hint.classList.add('infoHint');
  hint[0].appendChild(h4Hint);
}

function createLives () {
  livesNumber.innerHTML = livesLeft;
}


// -------------------------------------------------------------
// ------------------ missedWordContainer ----------------------
// -------------------------------------------------------------

function wrongAnswer (wa) {
  animate();
  missedWordContainer[0].innerHTML = missedWordContainer[0].innerHTML + wa;
  livesLeft--;
  if (livesLeft < 1) {
    livesNumber.innerHTML = "Game Over";
    formInput.disabled = true;
  } else {
    livesNumber.innerHTML = livesLeft;
  }
}

// -------------------------------------------------------------
// --------------------- answerContainer -----------------------
// -------------------------------------------------------------

form[0].addEventListener('submit', submit);

function submit (e) {
  const formValueLen = formInput.value.length;
  const alphabetNumber = formInput.value.toLowerCase().charCodeAt(0) - 97;
  e.preventDefault();

// This switch sends error messages so user can only type in [a - z]
  switch (true) {
    case formValueLen > 1:
      errorContainer[0].innerHTML = "Please only 1 letter at a time";
      break;
    case formValueLen === 0:
      errorContainer[0].innerHTML = "Don't be shy. Type a letter.";
      break;
    case alphabetNumber >= 0 && alphabetNumber <= 25:
      errorContainer[0].innerHTML = "";
      checkAnswer(formInput.value);
      break;
    case alphabetNumber < 0 || alphabetNumber > 25:
      errorContainer[0].innerHTML = "Only letters [a - z]";
      break;
    default:
      console.log("Switch case");
  }
  document.getElementById('form__input').value = "";
}


function checkAnswer (value) {

  const v = value.toLowerCase();
  const wordSplit = word.split("");
  const wordContainerChildrenArray = wordContainer[0].children;

//If the value is included in the word
  if(word.includes(v)) {
    for (let i = 0; i < wordSplit.length; i++) {
      if (wordSplit[i] === v) {
        wordContainer[0].children[i].innerHTML = v;
        userCorrectGuesses = [];
        for (let i = 0; i < wordContainerChildrenArray.length; i++) {
          userCorrectGuesses.push(wordContainerChildrenArray[i].innerHTML);
        }
      }
    }
    if (userCorrectGuesses.join("") === word) {
      livesNumber.innerHTML = "Winner!";
      formInput.disabled = true;
    }
  } else {
    wrongAnswer(v);
  }
}

// --------------------------------------------------
// ------------------ stickman ----------------------
// --------------------------------------------------

const drawArray = [what, rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1];

// Animate man
function animate () {
  const drawMe = livesLeft ;
  drawArray[drawMe]();
}

// Hangman
function canvas (){
  const myStickman = document.getElementById("stickman");
  context = myStickman.getContext('2d');
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
  const myStickman = document.getElementById("stickman");
  context = myStickman.getContext('2d');
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
function what () {
  console.log("now what?");
}
