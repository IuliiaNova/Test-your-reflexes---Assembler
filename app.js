let windowGame = document.querySelector("#windowGame");
let startButton = document.querySelector("#usernameButton");
let startGameButton = document.querySelector("#startGameButton");
let gameUsername = document.querySelector("#gameUsername");
let gameStartGame = document.querySelector("#gameStartGame");
let gameGetReady = document.querySelector("#gameGetReady");
let chooseUsernameInput = document.querySelector("#chooseUsernameInput")
let patternUsername = /[ `!@#$%^&*()+=\[\]{};':"\\|,.<>\/?]/;
let dataObject = new Object();
let counterValidationUsername = false;
let usernameCorrect = false;
let stopGameButtonOne = document.querySelector("#stopGameButtonOne");
let stopGameButtonTwo = document.querySelector("#stopGameButtonTwo");
let stopGameButtonThree = document.querySelector("#stopGameButtonThree");
let playAgainButton = document.querySelector("#playAgainButton");


startButton.addEventListener("click", nextPageToRules);
startGameButton.addEventListener("click", startGame);
stopGameButtonOne.addEventListener("click", finishGame);
stopGameButtonTwo.addEventListener("click", finishGame);
stopGameButtonThree.addEventListener("click", finishGame);
playAgainButton.addEventListener("click", comeBackToFierstPage);


function nextPageToRules(){
    if (usernameCorrect = true) {
        dataObject.username = chooseUsernameInput.value;
        localStorage.setItem("username", JSON.stringify(dataObject.username));
        windowGame.style.transitionDuration = "1s";
        windowGame.style.transform = "translateY(-90vh)";
    } 
}

function startGame(){
    windowGame.style.transitionDuration = "1s";
    windowGame.style.transform = "translateY(-180vh)";
    setTimeout(getReady, 5000); 
    playGame();
}

function getReady(){
    windowGame.style.transitionDuration = "1s";
    windowGame.style.transform = "translateY(-270vh)";
}

chooseUsernameInput.addEventListener('focusout', invalidUsernameOut);
chooseUsernameInput.addEventListener('focusin', invalidUsernameIn);

function invalidUsernameOut() {
    if (patternUsername.test(chooseUsernameInput.value)) {
        let text = "Invalid username. Do not use special characters.";
        let paragraphInvalidUsername = document.createElement("p");
        paragraphInvalidUsername.setAttribute("class", "color-paragraph-username");
        paragraphInvalidUsername.innerHTML = `${text}`;
        gameUsername.appendChild(paragraphInvalidUsername);
        chooseUsernameInput.style.border = "2px dashed red";
        counterValidationUsername = true;
    }
    else {
        usernameCorrect=true;
    }
}

function invalidUsernameIn() {
    if (counterValidationUsername == true) {
        chooseUsernameInput.style.border = "none";
        let colorParagraphUsername = document.querySelector(".color-paragraph-username");
        colorParagraphUsername.remove();
        counterValidationUsername = false;
    }
}


function playGame(){
    stopGameButtonOne.style.color = "red";
}

function finishGame(){
    windowGame.style.transitionDuration = "1s";
    windowGame.style.transform = "translateY(-360vh)";
}

function comeBackToFierstPage(){
    windowGame.style.transitionDuration = "1s";
    windowGame.style.transform = "translateY(0)";
}