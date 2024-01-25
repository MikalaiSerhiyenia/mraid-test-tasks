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
let result = 0;

// Create a map with paths to images

const images = ["banana", "coco", "grape", "lemon", "lime", "pear"];

// Create elements

const main = createElement("main", ["main"]);
const matchGame = createElement("div", ["match-game"]);
const gameInfo = createElement("div", ["match-game__info"]);
const gameTitle = createElement("div", ["match-game__info__title"]);
const gameTimer = createElement("div", ["match-game__info__timer"]);
const countdown = createElement("span", ["match-game__info__countdown"]);
const gamePlayField = createElement("div", ["match-game__play-field"]);
const gameResult = createElement("div", ["game-result"]);
const gameResultMessage = createElement("div", ["game-result__message"]);
const playButton = createElement("button", ["game-result__play-btn"]);

// Track selected tiles

let selectedTiles = [];

// Create a function to start the game

function startGame() {
  gameTitle.innerHTML = "<img src='./images/text.png' alt='Match 3 tiles'>";
  gameTimer.innerHTML = "<img src='./images/timer.png' alt='Timer'>";
  countdown.textContent = `:${seconds}`;

  appendChild(document.body, main);
  appendChild(main, matchGame);
  appendChild(matchGame, gameInfo);
  appendChild(matchGame, gamePlayField);
  appendChild(gameInfo, gameTitle);
  appendChild(gameInfo, gameTimer);
  appendChild(gameTimer, countdown);

  createPlayField(gamePlayField);
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
  const items = document.querySelectorAll(".match-game__play-field__item");
  const matchGame = document.querySelector(".match-game");
  items.forEach((item) => {
    item.classList.remove("active", "incorrect");
    item.classList.add("matched");
  });
  matchGame.classList.add("matched");
  setTimeout(() => {
    playAgain(items, matchGame);
  }, getAnimationDuration());
}

// Restart game function

function playAgain(array, elem) {
  array.forEach((item) => {
    item.classList.remove("matched");
    item.innerHTML = "";
  });
  elem.classList.remove("matched");
  gamePlayField.innerHTML = "";
  main.innerHTML = "";

  playButton.type = "button";
  playButton.textContent = "Play";
  playButton.innerHTML =
    "<img src='./images/button.png' alt='Play Button' class='play-btn'>" +
    "<span>Play</span>";
  playButton.removeEventListener("click", restartGame);

  showResult(result, gameResultMessage);

  appendChild(main, gameResult);
  appendChild(gameResult, gameResultMessage);
  appendChild(gameResult, playButton);

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
    checkResult();
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

function checkResult() {
  const matchedLength = document.querySelectorAll(
    ".match-game__play-field__item.active.matched"
  ).length;
  result = matchedLength;
}

// Create play field

function createPlayField(elem) {
  for (let i = 0; i < 8; i++) {
    const gameRow = createElement("div", ["match-game__play-field__row"]);
    for (let j = 0; j < 8; j++) {
      const gameItem = createElement("div", ["match-game__play-field__item"]);
      appendChild(gameRow, gameItem);
    }
    appendChild(elem, gameRow);
  }
  const items = document.querySelectorAll(".match-game__play-field__item");
  fillGameField(items);
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
    i.innerHTML += `<img src='./images/box.png' alt='Game Item' class='box'><img src='./images/${image}.png' alt='${image}' class='item ${image}'>`;
  });
}

// Get animation duration

function getAnimationDuration() {
  return 1000;
}

function restartGame() {
  main.innerHTML = "";
  seconds = 59;
  countdownStarted = false;
  selectedTiles = [];
  startGame();
}

// Create elements

function createElement(tagName, classNames) {
  const element = document.createElement(tagName);

  if (classNames && classNames.length > 0) {
    element.classList.add(...classNames);
  }

  return element;
}

// Append children

function appendChild(parent, child) {
  return parent.appendChild(child);
}

// Show result

function showResult(num, elem) {
  return num === 64
    ? (elem.textContent = "You win!")
    : (elem.textContent = "Game Over");
}
