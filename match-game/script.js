// Start the game when the page loads

document.addEventListener("DOMContentLoaded", startGame);

// Create a function to start the game

function startGame() {
  const main = document.createElement("main");
  main.classList.add("main");

  document.body.appendChild(main);
}
