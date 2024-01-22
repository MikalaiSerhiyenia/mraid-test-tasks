// Start the game when the page loads

document.addEventListener("DOMContentLoaded", startGame);

// Create a map with paths to images

const images = ["banana", "coco", "grape", "lemon", "lime", "pear"];

const image = randomImage(images);

// Create a function to start the game

function startGame() {
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
  countdown.textContent = `:30`;

  const gamePlayField = document.createElement("div");
  gamePlayField.classList.add("match-game__play-field");

  for (let i = 0; i < 8; i++) {
    const gameRow = document.createElement("div");
    gameRow.classList.add("match-game__play-field__row");
    for (let j = 0; j < 8; j++) {
      const gameItem = document.createElement("div");
      gameItem.classList.add("match-game__play-field__item");
      gameItem.innerHTML = `<img src='./images/box.png' alt='Game Item' class='box'>`;
      gameRow.appendChild(gameItem);
    }
    gamePlayField.appendChild(gameRow);
  }

  document.body.appendChild(main);
  main.appendChild(matchGame);
  matchGame.appendChild(gameInfo);
  matchGame.appendChild(gamePlayField);
  gameInfo.appendChild(gameTitle);
  gameInfo.appendChild(gameTimer);
  gameTimer.appendChild(countdown);

  const items = document.querySelectorAll(".match-game__play-field__item");

  fillGameField(items, image);
  // startCountdown();
}

// Create a function for selecting a random image

function randomImage(array) {
  const item = Math.floor(Math.random() * array.length);
  return array[item];
}

// Create a function to fill a field with random images

function fillGameField(element, array) {
  element.forEach((i) => {
    const item = randomImage(images);
    i.innerHTML += `<img src='./images/${item}.png' alt='${item}' class='item ${item}'>`;
  });
}

// Process clicks on field elements

document.addEventListener("click", handleClick);

let countdownStarted = false;

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

// Create countdown function from 30 to 0

function startCountdown() {
  const countdown = document.querySelector(".match-game__info__countdown");
  let seconds = 30;
  function updateCountdown() {
    if (seconds >= 10) {
      countdown.textContent = `:${seconds}`;
      seconds--;
      setTimeout(updateCountdown, 1000);
    } else if (seconds >= 0 && seconds < 10) {
      countdown.textContent = `:0${seconds}`;
      seconds--;
      setTimeout(updateCountdown, 1000);
    } else {
      console.log("Время вышло!");
    }
  }

  updateCountdown();
}
