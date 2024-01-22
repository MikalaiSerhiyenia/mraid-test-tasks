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

  fillGameField(items, image);
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

//

document.addEventListener("click", handleClick);

function handleClick(event) {
  const target = event.target;
  if (target.classList.contains("item")) {
    target.parentNode.classList.add("active");
  }
}

let lastClickTime = 0;

document.addEventListener("click", () => {
  const currentClickTime = new Date().getTime();
  const interval = currentClickTime - lastClickTime;
  if (interval > 3000) {
    setTimeout(function () {
      alert("3 секунды");
    }, 3000);
  }
  lastClickTime = 0;
});
