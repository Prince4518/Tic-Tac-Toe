// Start with Player X
let currentPlayer = "X";

// When a cell is clicked
function makeMove(cell) {
  // Only allow if cell is empty and game is not over
  if (cell.textContent === "" && !document.getElementById("message").textContent) {
    // Show current player (X or O)
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer); // Add X or O class for color

    // Check if player won
    if (checkWinner()) {
      document.getElementById("message").textContent = currentPlayer + " wins!";
      highlightWin();
    }
    // Check if game is draw
    else if (isDraw()) {
      document.getElementById("message").textContent = "It's a Draw!";
      document.querySelectorAll(".cell").forEach(c => c.classList.add("draw"));
    }
    // Switch turn
    else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

// Check for winning combinations
function checkWinner() {
  const cells = document.querySelectorAll(".cell");
  const patterns = [
    [0,1,2], [3,4,5], [6,7,8],  // rows
    [0,3,6], [1,4,7], [2,5,8],  // columns
    [0,4,8], [2,4,6]            // diagonals
  ];

  return patterns.some(pattern => {
    const [a,b,c] = pattern;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      // Add green win animation
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");
      return true;
    }
    return false;
  });
}

// Check if all cells filled = draw
function isDraw() {
  return [...document.querySelectorAll(".cell")].every(cell => cell.textContent !== "");
}

// Restart the game
function restartGame() {
  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = "";
    cell.className = "cell"; // remove X/O/win/draw class
  });
  document.getElementById("message").textContent = "";
  currentPlayer = "X";
}


