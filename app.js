let windowGame = document.querySelector("#windowGame");
let usernameButton = document.querySelector("#usernameButton");
let startGameButton = document.querySelector("#startGameButton");
let gameStopGame = document.querySelector("#gameStopGame");
let gameUsername = document.querySelector("#gameUsername");
let gameStartGame = document.querySelector("#gameStartGame");
let gameGetReady = document.querySelector("#gameGetReady");
let getReadyCountDown = document.querySelector("#getReadyCountDown");
let threeCountDown = document.querySelector("#threeCountDown");
let twoCountDown = document.querySelector("#twoCountDown");
let oneCountDown = document.querySelector("#oneCountDown");



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
    chooseUsernameInput.style.border = "none";
    invalidUsername.classList.remove("invalidUsernameAppear");
    counterValidationUsername = false;
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
    } else {
        invalidUsername.classList.add("invalidUsernameAppear");
        chooseUsernameInput.style.border = "1px solid red";
    }
}

function startGame(){
    windowGame.style.transitionDuration = "1s";
    windowGame.style.transform = "translateY(-200vh)";
    setTimeout(getReady, 5000);
    setTimeout(hideGetReady, 2000);
    setTimeout(showTwoCountDown, 3000);
    setTimeout(showOneCountDown, 4000);
    windowGame.style.gridTemplateRows= "100% 100% 100%";
    gameGetReady.style.display = "grid";
}

function hideGetReady(){
    getReadyCountDown.style.display = "none";
    threeCountDown.style.display = "grid";
}

function showTwoCountDown(){
    threeCountDown.style.display  = "none";
    twoCountDown.style.display = "grid";
}

function showOneCountDown(){
    twoCountDown.style.display  = "none";
    oneCountDown.style.display = "grid";
}

function getReady(){
    oneCountDown.style.display = "none";
    windowGame.style.transitionDuration = "1s";
    windowGame.style.transform = "translateY(-300vh)";
    windowGame.style.gridTemplateRows= "100% 100% 100% 100%";
    gameStopGame.style.display = "grid";
}
