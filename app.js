let windowGame = document.querySelector("#windowGame");
let usernameButton = document.querySelector("#usernameButton");
let startGameButton = document.querySelector("#startGameButton");
let gameUsername = document.querySelector("#gameUsername");
let gameStartGame = document.querySelector("#gameStartGame");
let gameGetReady = document.querySelector("#gameGetReady");
let chooseUsernameInput = document.querySelector("#chooseUsernameInput")
let invalidUsername = document.querySelector("#invalidUsername")
let patternUsername = /[ `!@#$%^&*()+=\[\]{};':"\\|,.<>\/?]/;
let dataObject = new Object();
let counterValidationUsername = false;
let usernameCorrect = false;

chooseUsernameInput.addEventListener('focusout', invalidUsernameOut);
chooseUsernameInput.addEventListener('focusin', invalidUsernameIn);
usernameButton.addEventListener("click", nextPageToRules);
startGameButton.addEventListener("click", startGame);

function invalidUsernameOut() {
    if (patternUsername.test(chooseUsernameInput.value)||chooseUsernameInput.value=="") {
        invalidUsername.classList.add("invalidUsernameAppear");
        chooseUsernameInput.style.border = "1px solid red";
        counterValidationUsername = true;
    }
    else {
        invalidUsername.classList.remove("invalidUsernameAppear");
        usernameCorrect=true;
    }
}

function invalidUsernameIn() {
    if (counterValidationUsername == true) {
        chooseUsernameInput.style.border = "none";
        invalidUsername.classList.remove("invalidUsernameAppear");
        counterValidationUsername = false;
    }
}

function nextPageToRules(){
    event.preventDefault();
    if (usernameCorrect == true) {
        dataObject.username = chooseUsernameInput.value;
        localStorage.setItem("username", JSON.stringify(dataObject.username))
        windowGame.style.transitionDuration = "1s";
        windowGame.style.transform = "translateY(-100vh)";
        windowGame.style.gridTemplateRows= "100% 100%";
        gameStartGame.style.display = "grid";
    }
}

function startGame(){
    windowGame.style.transitionDuration = "1s";
    windowGame.style.transform = "translateY(-200vh)";
    setTimeout(getReady, 5000);
}

function getReady(){
    windowGame.style.transitionDuration = "1s";
    windowGame.style.transform = "translateY(-300vh)";
}
