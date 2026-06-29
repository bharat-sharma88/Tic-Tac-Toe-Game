let boxes = document.querySelectorAll(".box");
let game = document.querySelector(".game");
let restartBtn = document.querySelector("#restart-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true;
let count = 0;

let winPatterns = [
    [0, 1, 2],    //row
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],    //column
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],    //diagonal
    [6, 7, 8],
];

let playerColor = (box) => {
    box.style.color = (turnX) ? "#1892ea" : "#a737ff";
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {

        playerColor(box);

        if (turnX == true) {
            box.innerText = "X";
            turnX = false;
        }
        else {
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

let gameDraw = () => {
    msg.innerText = `Game was a Draw`;
    game.classList.add("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const restartGame = () => {
    turnX = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    game.classList.remove("hide");
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is "${winner}"`;
    msgContainer.classList.remove("hide");
    game.classList.add("hide");
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
}
restartBtn.addEventListener("click", restartGame);