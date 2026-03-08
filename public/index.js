const jsConfetti = new JSConfetti();

const startBtn = document.getElementById("start_btn");
const mainInput = document.getElementById("main_input");
const puzzleName = document.getElementById("puzzle_name");

startBtn.addEventListener("click", handleClick);
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

function handleClick(e) {
  console.log("Clicked!");
  if (e.target) {
    //Switch on target
    switch (e.target.id) {
      case "start_btn":
        toggleVisibility(e.target);
        toggleVisibility(mainInput);
        toggleVisibility(puzzleName);

        loadPuzzle(puzzles[0]);

        break;
      default:
        console.log("No target found!");
    }
  }
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

function loadPuzzle(puzzle) {
  currentPuzzle = puzzle;
  puzzleName.textContent = puzzle.name;
  mainInput.type = puzzle.type;
  mainInput.maxLength = puzzle.answer.length;
  mainInput.size = puzzle.answer.length;
  mainInput.autocapitalize = "on";
}

const typingSound = new Audio("./wav/typing.wav");
const wrongSound = new Audio("./wav/fel.wav");
const correctSound = new Audio("./wav/ratt.wav");
