// Start the game when the page loads

document.addEventListener("DOMContentLoaded", () => {
  startGame();
  play();
});

document.addEventListener("click", (event) => {
  handleClick(event);
});

// Set the countdown time and mark it as not started

let seconds = 59;
let countdownStarted = false;

// Create a map with paths to images

const images = ["banana", "coco", "grape", "lemon", "lime", "pear"];

// Create elements

const main = document.createElement("main");
main.classList.add("main");

const matchGame = document.createElement("div");
matchGame.classList.add("match-game");

const gameInfo = document.createElement("div");
gameInfo.classList.add("match-game__info");

const gameTitle = document.createElement("div");
gameTitle.classList.add("match-game__info__title");
gameTitle.innerHTML = "<img src='./images/text.png' alt='Match 3 tiles'>";

const gameTimer = document.createElement("div");
gameTimer.classList.add("match-game__info__timer");
gameTimer.innerHTML = "<img src='./images/timer.png' alt='Timer'>";

const countdown = document.createElement("span");
countdown.classList.add("match-game__info__countdown");
countdown.textContent = `:59`;

const gamePlayField = document.createElement("div");
gamePlayField.classList.add("match-game__play-field");

const gameRow = document.createElement("div");
gameRow.classList.add("match-game__play-field__row");

const gameItem = document.createElement("div");
gameItem.classList.add("match-game__play-field__item");
gameItem.innerHTML = `<img src='./images/box.png' alt='Game Item' class='box'>`;

createPlayField(gamePlayField);

// Create a function to start the game

function startGame() {
  document.body.appendChild(main);
  main.appendChild(matchGame);
  matchGame.appendChild(gameInfo);
  matchGame.appendChild(gamePlayField);
  gameInfo.appendChild(gameTitle);
  gameInfo.appendChild(gameTimer);
  gameTimer.appendChild(countdown);

  const items = document.querySelectorAll(".match-game__play-field__item");

  fillGameField(items);
}

// Process clicks on field elements

function handleClick(event) {
  const target = event.target;

  if (target.classList.contains("item")) {
    if (!countdownStarted) {
      startCountdown();
      countdownStarted = true;
    }
    target.parentNode.classList.add("active");
  }
}

// Play function

function play() {
  const playField = document.querySelector(".match-game__play-field");
  let selectedTiles = [];

  playField.addEventListener("click", handleTileClick);

  function handleTileClick(event) {
    const target = event.target.closest(".match-game__play-field__item");
    if (
      !target ||
      target.classList.contains("matched") ||
      target.classList.contains("active")
    ) {
      return;
    }

    addClassList(target, selectedTiles);

    const altValues = getAltValues(selectedTiles);
    const className = altValues[0];

    if (selectedTiles.length > 1) {
      let areAllAltValuesEqual = altValues.every(
        (value) => value === altValues[0]
      );

      if (!areAllAltValuesEqual) {
        selectedTiles.forEach((tile) => tile.classList.add("incorrect"));
        setTimeout(() => {
          selectedTiles.forEach((tile) =>
            tile.classList.remove("active", "incorrect")
          );
          selectedTiles = [];
        }, getAnimationDuration());
        return;
      }

      if (selectedTiles.length === countElementsWithClass(className)) {
        selectedTiles.forEach((tile) => tile.classList.add("matched"));
        setTimeout(() => {
          selectedTiles = [];
        }, getAnimationDuration());
      }
    }
  }
}

// End game function

function endGame() {
  const boxes = document.querySelectorAll(".match-game__play-field__item");
  boxes.forEach((box) => {
    box.classList.remove("active", "incorrect");
    box.classList.add("matched");
  });

  setTimeout(() => {
    main.innerHTML = "";
    restart();
  }, getAnimationDuration());
}

// Restart game function

function restart() {
  countdownStarted = false;
  const gameResult = document.createElement("div");
  gameResult.classList.add("game-result");

  const gameResultMessage = document.createElement("div");
  gameResultMessage.classList.add("game-result__message");

  checkResult(gameResultMessage);

  const playButton = document.createElement("button");
  playButton.type = "button";
  playButton.textContent = "Play";
  playButton.classList.add("game-result__play-btn");
  playButton.innerHTML =
    "<img src='./images/button.png' alt='Play Button' class='play-btn'>" +
    "<span>Play</span>";

  main.appendChild(gameResult);
  gameResult.append(gameResultMessage);
  gameResult.append(playButton);

  function restartGame() {
    main.innerHTML = "";
    countdownStarted = false;
    startGame();
    play();
  }

  playButton.removeEventListener("click", restartGame);
  playButton.addEventListener("click", restartGame);
}

// Getting alt values

function getAltValues(array) {
  return array.map((tile) => tile.querySelector(".item").alt);
}

// Adding class

function addClassList(target, array) {
  target.classList.add("active");
  array.push(target);
}

// Count elems with class

function countElementsWithClass(classname) {
  return document.querySelectorAll(`.item.${classname}`).length;
}

// Update countdown

function updateCountdown(sec, elem) {
  if (sec >= 10) {
    elem.textContent = `:${sec}`;
  } else if (sec >= 0 && sec < 10) {
    elem.textContent = `:0${sec}`;
  } else {
    endGame();
    return;
  }

  sec--;
  setTimeout(() => updateCountdown(sec, elem), getAnimationDuration());
}

// Create countdown function from 30 to 0

function startCountdown() {
  const countdownElem = document.querySelector(".match-game__info__countdown");
  updateCountdown(seconds, countdownElem);
}

// check result

function checkResult(elem) {
  const matchedLength = document.querySelectorAll(".matched").length;
  return matchedLength === 64
    ? (elem.textContent = "You win!")
    : (elem.textContent = "Game Over");
}

// Create play field

function createPlayField(elem1) {
  for (let i = 0; i < 8; i++) {
    const gameRow = document.createElement("div");
    gameRow.classList.add("match-game__play-field__row");
    for (let j = 0; j < 8; j++) {
      const gameItem = document.createElement("div");
      gameItem.classList.add("match-game__play-field__item");
      gameItem.innerHTML = `<img src='./images/box.png' alt='Game Item' class='box'>`;
      gameRow.appendChild(gameItem);
    }
    elem1.appendChild(gameRow);
  }
}

// Create a function for selecting a random image

function randomImage(array) {
  const item = Math.floor(Math.random() * array.length);
  return array[item];
}

// Create a function to fill a field with random images

function fillGameField(array) {
  array.forEach((i) => {
    const image = randomImage(images);
    i.innerHTML += `<img src='./images/${image}.png' alt='${image}' class='item ${image}'>`;
  });
}

// Get animation duration

function getAnimationDuration() {
  return 1000;
}
