// Start the game when the page loads

document.addEventListener("DOMContentLoaded", startGame);

// Create a map with paths to images

const images = new Map([
  ["banana", "./images/banana.png"],
  ["coco", "./images/coco.png"],
  ["grape", "./images/grape.png"],
  ["lemon", "./images/lemon.png"],
  ["lime", "./images/lime.png"],
  ["pear", "./images/pear.png"],
]);

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

  const items = document.querySelectorAll(".match-game__play-field__item");

  fillGameField(items, images);
}

// Create a function for selecting a random image

function randomImage(map) {
  const array = Array.from(map.keys());
  const item = Math.floor(Math.random() * array.length);
  return map.get(array[item]);
}

// Create a function to fill a field with random images

function fillGameField(array, map) {
  array.forEach((element) => {
    element.innerHTML += `<img src='${randomImage(map)}' class='item'>`;
  });
}
