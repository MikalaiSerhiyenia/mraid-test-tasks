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
let timeoutId;

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

    // const areAllAltValuesEqual = altValues.every(
    //   (value) => value === altValues[0]
    // );
    // const className = altValues[0];

    if (
      selectedTiles.length > 1 &&
      !altValues.every((value) => value === altValues[0])
    ) {
      handleIncorrectSelection(selectedTiles);
      selectedTiles = [];
    }

    if (selectedTiles.length === 3) {
      handleCorrectSelection(selectedTiles);
      selectedTiles = [];
    }

    function handleIncorrectSelection(selectedTiles) {
      selectedTiles.forEach((tile) => tile.classList.add("incorrect"));
      setTimeout(() => {
        selectedTiles.forEach((tile) =>
          tile.classList.remove("active", "incorrect")
        );
      }, getAnimationDuration());
    }

    function handleCorrectSelection(selectedTiles) {
      selectedTiles.forEach((tile) => tile.classList.add("matched"));
      setTimeout(() => {
        checkResult();
        if (result === 81) {
          seconds = 0;
          endGame();
        }
      }, getAnimationDuration());
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
  clearTimeout(timeoutId);
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

// // Count elems with class

// function countElementsWithClass(classname) {
//   return document.querySelectorAll(`.item.${classname}`).length;
// }

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
  timeoutId = setTimeout(
    () => updateCountdown(sec, elem),
    getAnimationDuration()
  );
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
  for (let i = 0; i < 9; i++) {
    const gameRow = createElement("div", ["match-game__play-field__row"]);
    for (let j = 0; j < 9; j++) {
      const gameItem = createElement("div", ["match-game__play-field__item"]);
      appendChild(gameRow, gameItem);
    }
    appendChild(elem, gameRow);
  }
  const items = document.querySelectorAll(".match-game__play-field__item");
  fillGameField(items, images);
}

// Create a function for selecting a random image

function randomImage(array) {
  const item = Math.floor(Math.random() * array.length);
  return array[item];
}

// Create a function to fill a field with random images

function fillGameField(elements, array) {
  const newImages = makeArray(shuffleArray(array));

  elements.forEach((elem) => {
    const item = getRandomAndRemove(newImages);
    elem.innerHTML =
      "<img src='./images/box.png' alt='Game Item' class='box'>" +
      `<img src='./images/${item}.png' alt='${item}' class='item ${item}'>`;
  });
}

// Get animation duration

function getAnimationDuration() {
  return 1000;
}

function restartGame() {
  main.innerHTML = "";
  seconds = 59;
  result = 0;
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
  return num === 81
    ? (elem.textContent = "You win!")
    : (elem.textContent = "Game Over");
}

// Shuffle array

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Make new array of images (81 elements)

function makeArray(array) {
  const newArr = [];
  for (let i = 0; i < 15; i++) {
    newArr.push(...array.slice(0, 3));
  }
  for (let i = 0; i < 12; i++) {
    newArr.push(...array.slice(3, 6));
  }
  return newArr;
}

// Get random element and remove

function getRandomAndRemove(array) {
  if (array.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  const randomElement = array[randomIndex];
  array.splice(randomIndex, 1);
  return randomElement;
}
