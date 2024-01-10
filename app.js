// Array to store the game sequence
let gameSeq = [];

// Array to store the user input sequence
let userSeq = [];

// Array of button colors
let btns = ["yellow", "red", "purple", "green"];

// Variable to track if the game has started
let started = false;

// Variable to store the current level
let level = 0;

// Reference to the h2 element for displaying the level
let h2 = document.querySelector("h2");

// Event listener for starting the game on keypress
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game Started");
    started = true;
    levelUp();
  }
});

// Function to create a flash effect for game buttons
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 100);
}

// Function to create a flash effect for user input
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 100);
}

// Function to increase the level and generate a new sequence
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  // Generate a random button color and flash it
  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

// Function to check user input against the game sequence
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 500);
    }
  } else {
    // Display game over message, update background color, and reset the game
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start`;
    document.body.style.backgroundColor = "red";
    reset();
  }
}

// Event listener for button clicks
function btnPress() {
  let btn = this;
  userFlash(btn);

  // Get the color of the clicked button and add it to the user sequence
  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  // Check the user's answer
  checkAns(userSeq.length - 1);
}

// Add click event listeners to all buttons
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

// Function to reset the game state
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;

  // Set background color to red
  document.body.style.backgroundColor = "red";

  // Reset background color after 1000 milliseconds (1 second)
  setTimeout(function () {
    document.body.style.backgroundColor = "";
  }, 1000);
}
