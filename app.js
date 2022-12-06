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
usernameButton.addEventListener("click", initGame);
startGameButton.addEventListener("click", startGame);

function invalidUsernameOut() {
    if (patternUsername.test(chooseUsernameInput.value)||chooseUsernameInput.value=="") {
        invalidUsername.classList.add("invalidUsernameAppear");
        chooseUsernameInput.style.border = "2px dashed red";
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
        counterValidationUsername = false;
    }
}

function initGame(){
    event.preventDefault();
        if (usernameCorrect == true) {
            dataObject.username = chooseUsernameInput.value;
            windowGame.style.transitionDuration = "1s";
            windowGame.style.transform = "translateY(-100vh)";
            dataHandler()
        }
}

function dataHandler(){
    event.preventDefault();
    let ranking = JSON.parse(localStorage.getItem('puntuation'))

    if (ranking !== null){
        let positionExist = ranking.find(puesto =>puesto.username === chooseUsernameInput.value);
        if(positionExist)  {
            positionExist.puntuation =Math.random(10) //cambiar Math.random(10) por puntuacion
        }else{
            ranking.push({username: chooseUsernameInput.value , puntuation : Math.random(10)})     
        }
        localStorage.setItem("puntuation", JSON.stringify(ranking))  
    }else{
        localStorage.setItem("puntuation", JSON.stringify([{username: chooseUsernameInput.value , puntuation : Math.random(10)}]))
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

