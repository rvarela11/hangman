const words = [
  {
    word: 'cowboys',
    hint: 'Dallas'
  }
];

let word = "";
let livesLeft = 10;

// -------------------------------------------------------------
// --------------------- wordContainer -------------------------
// -------------------------------------------------------------

const wordContainer = document.getElementsByClassName('wordContainer');
const hint = document.getElementsByClassName('infoContainer__hint');

// console.log(Math.floor(Math.random() * words.length));

words.forEach((wordInfo) => {
  wordLength(wordInfo.word);
  word = wordInfo.word;
  const h4Hint = document.createElement('h4');
  h4Hint.innerHTML = wordInfo.hint;
  h4Hint.classList.add('infoHint');
  hint[0].appendChild(h4Hint);
})

function wordLength(w) {
  for (let i = 0; i < w.length; i++){
    const divChild = document.createElement('div');
    divChild.classList.add('wordBreakdown');
    wordContainer[0].appendChild(divChild);
  }
}

// -------------------------------------------------------
// ------------------ infoContainer ----------------------
// -------------------------------------------------------

const livesNumber = document.getElementById('livesNumber');
livesNumber.innerHTML = livesLeft;

// -------------------------------------------------------------
// ------------------ missedWordContainer ----------------------
// -------------------------------------------------------------

function wrongAnswer (wrongAnswer) {
  const missedWordContainer = document.getElementsByClassName('missedWordContainer');
  missedWordContainer[0].innerHTML = missedWordContainer[0].innerHTML + wrongAnswer;
  livesLeft--;
  if (livesLeft < 1) {
    livesNumber.innerHTML = "Game Over";
  } else {
    livesNumber.innerHTML = livesLeft;
  }
}

// --------------------------------------------------
// ------------------ stickman ----------------------
// --------------------------------------------------

// Hangman
  function canvas (){
    const myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };

  function head (){
    const myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI*2, true);
    context.stroke();
  }

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

  function torso () {
    draw (60, 36, 60, 70);
  };

  function rightArm () {
    draw (60, 46, 100, 50);
  };

  function leftArm () {
    draw (60, 46, 20, 50);
   };

  function rightLeg () {
    draw (60, 70, 100, 100);
  };

  function leftLeg () {
    draw (60, 70, 20, 100);
  };

  const drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1];

// -------------------------------------------------------------
// --------------------- answerContainer -----------------------
// -------------------------------------------------------------

    const form = document.getElementsByClassName('answerContainer__form');
    const formInput = document.getElementById('form__input');
    const errorContainer = document.getElementsByClassName('errorContainer');

    form[0].addEventListener('submit', answer);

    function answer (e) {
      e.preventDefault();
      if (livesLeft > 0) {
        if (formInput.value.length > 1) {
          errorContainer[0].innerHTML = "Please only 1 letter at a time";
        } else if (formInput.value.length === 0) {
          errorContainer[0].innerHTML = "Don't be shy. Type a letter.";
        } else {
          const alphabetNumber = formInput.value.toLowerCase().charCodeAt(0) - 97;
          if (alphabetNumber >= 0 && alphabetNumber < 25) {
            errorContainer[0].innerHTML = "";
            checkAnswer(formInput.value);
          } else {
            errorContainer[0].innerHTML = "Only letters [a - z]";
          }
        }
      } else {
        formInput.disabled = true;
      }
      document.getElementById('form__input').value = "";
    }

    function checkAnswer (value) {

      const v = value.toLowerCase();
      const wordSplit = word.split("");

      if(word.includes(v)) {
        for (let i = 0; i < wordSplit.length; i++) {
          if (wordSplit[i] === v) {
            wordContainer[0].children[i].innerHTML = v
          }
        }
      } else {
        wrongAnswer(v);
      }

    }














































window.onload = function () {

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

  var categories;         // Array of topics
  var chosenCategory;     // Selected catagory
  var getHint ;          // Word getHint
  var word ;              // Selected word
  var guess ;             // Geuss
  var geusses = [ ];      // Stored geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'

  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");



  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }


  // Select Catagory
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "The Chosen Category Is Premier League Football Teams";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "The Chosen Category Is Films";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "The Chosen Category Is Cities";
    }
  }

  // Create geusses ul
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  // Show lives
   comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over";
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "You Win!";
      }
    }
  }

      // Animate man
  var animate = function () {
    var drawMe = lives ;
    drawArray[drawMe]();
  }


   // Hangman
  canvas =  function(){

    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };

    head = function(){
      myStickman = document.getElementById("stickman");
      context = myStickman.getContext('2d');
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI*2, true);
      context.stroke();
    }

  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {

    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
}

   frame1 = function() {
     draw (0, 150, 150, 150);
   };

   frame2 = function() {
     draw (10, 0, 10, 600);
   };

   frame3 = function() {
     draw (0, 5, 70, 5);
   };

   frame4 = function() {
     draw (60, 5, 60, 15);
   };

   torso = function() {
     draw (60, 36, 60, 70);
   };

   rightArm = function() {
     draw (60, 46, 100, 50);
   };

   leftArm = function() {
     draw (60, 46, 20, 50);
   };

   rightLeg = function() {
     draw (60, 70, 100, 100);
   };

   leftLeg = function() {
     draw (60, 70, 20, 100);
   };

  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1];


  // OnClick Function
   check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        }
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    }
  }


  // Play
  play = function () {
    categories = [
        ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
        ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
        ["manchester", "milan", "madrid", "amsterdam", "prague"]
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    geusses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
    canvas();
  }

  play();

  // Hint

    hint.onclick = function() {

      hints = [
        ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
        ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
        ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
    ];

    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Clue: - " +  hints [catagoryIndex][hintIndex];
  };

   // Reset

  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
  }
}
