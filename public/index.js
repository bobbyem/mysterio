if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
} else {
  console.warn("Service Workers are not supported in this browser.");
}

const jsConfetti = new JSConfetti();

const STATE = {
  SEEN_INTRO: false,
};

// DOM elements
const cover = document.getElementById("cover");
const mainInput = document.getElementById("main_input");
const puzzleName = document.getElementById("puzzle_name");

//Created DOM elements
const puzzleButtons = [];

cover.addEventListener("animationend", (event) => {
  toggleVisibility(cover);
});
mainInput.addEventListener("input", handleInput);

function handleInput(e) {
  if (e.target.value.toLowerCase() === currentPuzzle.answer) {
    console.log("Correct!");
    mainInput.value = currentPuzzle.payoff;
    puzzleName.textContent = "Rätt!";
    jsConfetti.addConfetti();
    correctSound.play();
  } else if (e.target.value.length === currentPuzzle.answer.length) {
    console.log("Incorrect!");
    mainInput.value = "";
    puzzleName.textContent = "Prova igen";
    wrongSound.play();
  }

  typingSound.play();
}


function toggleVisibility(target) {
  if (target.classList.contains("hidden")) {
    target.classList.remove("hidden");
  } else {
    target.classList.add("hidden");
  }
}

let currentPuzzle;

class Puzzle {
  constructor(name, answer, type, payoff) {
    this.name = name;
    this.answer = answer;
    this.type = type;
    this.payoff = payoff;
  }
}

const puzzles = [new Puzzle("📘", "leo", "text", "198")];

function createPuzzleButtons() {
  puzzles.forEach((puzzle, index) => {
    const button = document.createElement("button");

    button.textContent = puzzle.name;
    button.classList.add("puzzle_button");

    button.addEventListener("click", () => {
      puzzleButtons.forEach((btn) => btn.classList.remove("selected"));
      loadPuzzle(puzzle);
    });

    puzzleButtons.push(button);

    document.getElementById("puzzle_selector").appendChild(button);
  });
}

function loadPuzzle(puzzle) {
  currentPuzzle = puzzle;
  puzzleName.textContent = puzzle.name;
  mainInput.type = puzzle.type;
  mainInput.maxLength = puzzle.answer.length;
  mainInput.size = puzzle.answer.length;
  mainInput.autocapitalize = "on";
  puzzleButtons.forEach((btn) => {
    if (btn.textContent === puzzle.name) {
      btn.classList.add("selected");
    } else {
      btn.classList.remove("selected");
    }
  });
}

function startGame() {
  loadPuzzle(puzzles[0]);
  toggleVisibility(mainInput);
  toggleVisibility(puzzleName);
}

function inti() {
  createPuzzleButtons();
    startGame();
  

  //Fade out cover
  setTimeout(() => {
    cover.classList.add("fade-out");
  }, 1000);
}

const typingSound = new Audio("./wav/typing.wav");
const wrongSound = new Audio("./wav/fel.wav");
const correctSound = new Audio("./wav/ratt.wav");

inti();
