let Player = (name, mark) => {
  let player = { name, mark }
  return player
}

function placeMark(player, cell) {
  if (cell.classList.contains('o') || cell.classList.contains('x')) return;
  cell.classList.add(player.mark);
}

function checkWin(player, gameboard) {
  let winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  return winningCombos.some(combination => {
    return combination.every(cell => {
      return gameboard[cell].classList.contains(player.mark);
    });
  });
}

function checkDraw(gameboard) {
  let winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  return winningCombos.every( combination => {
    return combination.every( cell => {
      return gameboard[cell].classList.contains('o') || gameboard[cell].classList.contains('x');
    })
  })
}

function displayWinner(player) {
  let container = document.querySelector(".match-result");
  container.classList.add("display");
  container.innerHTML = '';
  let winner = document.createElement("h2");
  winner.textContent = `${player.name} wins!`

  let close = document.createElement("input");
  close.type = 'button';
  close.value = 'Close';
  close.classList.add("close");
  container.appendChild(winner);
  container.appendChild(close);
}

function displayDraw() {
  let container = document.querySelector(".match-result");
  container.classList.add("display");
  container.innerHTML = '';
  let draw = document.createElement("h2");
  draw.textContent = `A draw!!`

  let close = document.createElement("input");
  close.type = 'button';
  close.value = 'Close';
  close.classList.add("close");
  container.appendChild(draw);
  container.appendChild(close);
}

function reset(gameboard) {

  gameboard.forEach(cell => {
    cell.classList.contains('x') ? cell.classList.remove('x') : cell.classList.remove('o');
  })
}

function closeResults() {
  let container = document.querySelector(".match-result");
  let btn = document.querySelector(".close");
  btn.addEventListener("click", () => {
    container.classList.remove("display");
  })
}

let Game = (function () {
  let gameboard = [...document.querySelectorAll(".gameboard div")];
  let player1 = Player('Player 1', 'x');
  let player2 = Player('Player 2', 'o');
  let isPlayerXTurn = true;
  gameboard.forEach(cell => {
    cell.addEventListener("click", () => {
      if (isPlayerXTurn) {
        placeMark(player1, cell);
        isPlayerXTurn = !isPlayerXTurn;
        if (checkWin(player1, gameboard)) {
          displayWinner(player1);
          reset(gameboard);
          closeResults();
          isPlayerXTurn = true;
        };
      }
      else {
        placeMark(player2, cell);
        isPlayerXTurn = !isPlayerXTurn;
        if (checkWin(player2, gameboard)) {
          displayWinner(player2);
          reset(gameboard);
          closeResults();
        };
      }
      if (checkDraw(gameboard)) {
        isPlayerXTurn = !isPlayerXTurn;
        displayDraw();
        reset(gameboard);
        closeResults();
      }

    })
  })
})();