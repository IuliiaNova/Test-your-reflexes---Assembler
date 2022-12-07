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
const resultOne = document.querySelector("#resultOne");
const userNameOne = document.querySelector("#userNameOne");
let startTime=new Date();
let endTime=new Date();
let startPressed=false;
let gameHasStarted=false;
let maxWait=20;
let timerID;
let responseTime=null;
let ranking = JSON.parse(localStorage.getItem('puntuation'));
let arrayRanking = [];
let userObject = {
    /* userName: ;
    userScore: ;  */
}


const historialUsername = document.querySelector("#historialUsername"); 
const historialScore = document.querySelector("#historialScore"); 


startGameButton.addEventListener("click", startGame);
stopGameButtonOne.addEventListener("click", finishGame);
playAgainButton.addEventListener("click", comeBackToFirstPage);
chooseUsernameInput.addEventListener('focusout', invalidUsernameOut);
chooseUsernameInput.addEventListener('focusin', invalidUsernameIn);
usernameButton.addEventListener("click", initGame);
startGameButton.addEventListener("click", startGame);
usernameButton.addEventListener("click", nextPageToRules);

if (ranking !== null) {
    for (let i = 0; i < ranking.length; i++) {
            arrayRanking.push(Object.values(ranking[i])) 
        }
        const sortedArrayRanking = arrayRanking.sort((a, b) => a[1] - b[1])
        console.log(sortedArrayRanking);
        if (arrayRanking.length < 10){
        historialUsername.innerText = arrayRanking; 
         }
       /*  historialUsername.innerText = localStorage.getItem("username");
        historialScore.innerText = localStorage.getItem("score"); */
    }

function playGame(){
    startTime = new Date();
}

function stopGame(){
    if(gameHasStarted){
        endTime=new Date();
        responseTime=(endTime.getTime()-startTime.getTime()-3000)/1000;
        gameHasStarted=false;
        gameResult.innerText = ("Your response time is: " + responseTime +
        " seconds " + "\n" + remark(responseTime));
        setTimeout(function(){showTimeResultInHallOfFame(responseTime);}, 1000);
        /* localStorage.setItem("score", JSON.stringify(responseTime)); */ //deprecated since Edgar worked on the upload of the data
        /* historialUsername.innerText = localStorage.getItem("username");
        historialScore.innerText = responseTime; */
        
    }
    else{
        clearTimeout(timerID);
    }
}

function showTimeResultInHallOfFame(responseTime){
    resultOne.innerText = responseTime;
}

/* No tocar abajo */

function remark(responseTime)
{
    var responseString="";
    if (responseTime < 0.70)
        responseString="Well done!";
    if (responseTime >=0.70 && responseTime < 1.20)
        responseString="Keep practising!";
    if (responseTime >=1.20)
        responseString="Did you fall asleep?";
    return responseString;
}

function finishGame(){
    windowGame.style.transitionDuration = "1s";
    windowGame.style.gridTemplateRows = "100% 100% 100% 100% 100%";
    windowScore.style.height = "67.5%";
    gameScore.style.display = "flex";
    windowGame.style.transform = "translateY(-559vh)";
    stopGame();
    dataHandler()
}


function comeBackToFirstPage(){
    windowGame.style.transitionDuration = "1s";
    gameResult.removeChild; //Mirar como eliminar este elemento
    location.reload(); 
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

function initGame(){
    event.preventDefault();
        if (usernameCorrect == true) {
            dataObject.username = chooseUsernameInput.value;
            windowGame.style.transitionDuration = "1s";
            windowGame.style.transform = "translateY(-100vh)";
        }
}

function dataHandler(){
    event.preventDefault();
    if (ranking !== null){
        let positionExist = ranking.find(puesto =>puesto.username === chooseUsernameInput.value);
        if(positionExist)  {
            positionExist.puntuation =responseTime
        }else{
            ranking.push({username: chooseUsernameInput.value , puntuation : responseTime})     
        }
        localStorage.setItem("puntuation", JSON.stringify(ranking))  
    }else{
        localStorage.setItem("puntuation", JSON.stringify([{username: chooseUsernameInput.value , puntuation : responseTime
        }]))
    }}

function nextPageToRules(){
    event.preventDefault();
    if (usernameCorrect == true) {
        dataObject.username = chooseUsernameInput.value;
        localStorage.setItem("username", JSON.stringify(dataObject.username))
        windowGame.style.transitionDuration = "1s";
        windowGame.style.transform = "translateY(-100vh)";
        windowGame.style.gridTemplateRows= "100% 100%";
        gameStartGame.style.display = "grid";
        const user1 = localStorage.getItem("username");
        userNameOne.innerText = user1; //RANKING NAME 
        resultOne.innerText = "Game in progress..."
    } else {
        invalidUsername.classList.add("invalidUsernameAppear");
        chooseUsernameInput.style.border = "1px solid red";
    }
}

function startGame(){
    windowGame.style.transitionDuration = "1s";
    windowGame.style.transform = "translateY(-190vh)";
    setTimeout(hideGetReady, 2000);
    setTimeout(showTwoCountDown, 3000);
    setTimeout(showOneCountDown, 4000);
    setTimeout(getReady, 5000);
    windowGame.style.gridTemplateRows= "100% 100% 100%";
    gameGetReady.style.display = "grid";
    gameHasStarted=true;
    
}

function hideGetReady(){
    getReadyCountDown.style.display = "none";
    threeCountDown.style.display = "grid";
    playGame();
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
    windowGame.style.transform = "translateY(-286vh)";
    windowGame.style.gridTemplateRows= "100% 100% 100% 100%";
    gameStopGame.style.display = "grid";
}
