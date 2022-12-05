const windowGame = document.querySelector("#windowGame");
const usernameButton = document.querySelector("#usernameButton");
const startGameButton = document.querySelector("#startGameButton");
const gameStopGame = document.querySelector("#gameStopGame");
const gameUsername = document.querySelector("#gameUsername");
const gameStartGame = document.querySelector("#gameStartGame");
const gameGetReady = document.querySelector("#gameGetReady");
const getReadyCountDown = document.querySelector("#getReadyCountDown");
const threeCountDown = document.querySelector("#threeCountDown");
const twoCountDown = document.querySelector("#twoCountDown");
const oneCountDown = document.querySelector("#oneCountDown");
const chooseUsernameInput = document.querySelector("#chooseUsernameInput")
const invalidUsername = document.querySelector("#invalidUsername")
const gameScore = document.querySelector("#gameScore")
const patternUsername = /[ `!@#$%^&*()+=\[\]{};':"\\|,.<>\/?]/;
let dataObject = new Object();
let counterValidationUsername = false;
let usernameCorrect = false;
const stopGameButtonOne = document.querySelector("#stopGameButtonOne");
const stopGameButtonTwo = document.querySelector("#stopGameButtonTwo");
const stopGameButtonThree = document.querySelector("#stopGameButtonThree");
const playAgainButton = document.querySelector("#playAgainButton");
const pushColor = document.querySelector("#pushColor");
const gameResult = document.querySelector("#gameResult");
let startTime=new Date();
let endTime=new Date();
let startPressed=false;
let gameHasStarted=false;
let maxWait=20;
let timerID;

startGameButton.addEventListener("click", startGame);
stopGameButtonOne.addEventListener("click", finishGame);
playAgainButton.addEventListener("click", comeBackToFierstPage);
chooseUsernameInput.addEventListener('focusout', invalidUsernameOut);
chooseUsernameInput.addEventListener('focusin', invalidUsernameIn);
usernameButton.addEventListener("click", nextPageToRules);

function playGame(){
    //Set randon time - set color 
    // If for buttons color&&next

    let color = ["RED", "BLUE", "GREEN"]; //It should be random of three colors
    let colorTextOut = document.createElement("p");
    pushColor.appendChild(colorTextOut);
    colorTextOut.innerHTML = `${color}`;
    startTime = new Date();
}

function stopGame()
{
    if(gameHasStarted){
        endTime=new Date();
        let responseTime=(endTime.getTime()-startTime.getTime()-5000)/1000;    
        gameHasStarted=false;
        let yourResult = document.createElement("p");
        yourResult.innerText = ("Your response time is: " + responseTime + 
        " seconds " + "\n" + remark(responseTime));
        gameResult.appendChild(yourResult);
        pushColor.removeChild(colorTextOut); //no funciona
    }
        else{
            clearTimeout(timerID);
        }
    }

/* No tocar abajo */

function remark(responseTime)
{
    var responseString="";
    if (responseTime < 0.70)
        responseString="Well done!";
    if (responseTime >=0.70 && responseTime < 1.20)
        responseString="Keep practicing!";
    if (responseTime >=1.20)
        responseString="Did you fall asleep?";
    return responseString;
}

function finishGame(){
    windowGame.style.transitionDuration = "1s";
    windowGame.style.transform = "translateY(-450vh)";
    windowGame.style.gridTemplateRows= "100% 100% 100% 100% 100%";
    gameScore.style.display = "grid";
    stopGame();
}


function comeBackToFierstPage(){
    windowGame.style.transitionDuration = "1s";
    windowGame.style.transform = "translateY(0)";
    gameResult.removeChild; //Mirar como eliminar este elemento
}


/* HALL OF FAME */


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
