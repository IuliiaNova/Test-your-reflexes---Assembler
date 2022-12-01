let windowGame = document.querySelector("#windowGame");
let startButton = document.querySelector("#usernameButton");
let startGameButton = document.querySelector("#startGameButton");
let gameUsername = document.querySelector("#gameUsername");
let gameStartGame = document.querySelector("#gameStartGame");
let gameGetReady = document.querySelector("#gameGetReady");


startButton.addEventListener("click", nextPage);
startGameButton.addEventListener("click", startGame);

function nextPage(){
    windowGame.style.transitionDuration = "1s";
    windowGame.style.transform = "translateY(-90vh)";
}

function startGame(){
    windowGame.style.transitionDuration = "1s";
    windowGame.style.transform = "translateY(-180vh)";
    setTimeout(getReady, 5000); 
}

function getReady(){
    windowGame.style.transitionDuration = "1s";
    windowGame.style.transform = "translateY(-270vh)";
}


