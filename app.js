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
let userObject = {}
const userNameTwo = document.querySelector("#userNameTwo");
const resultTwo = document.querySelector("#resultTwo");
const userNameThree = document.querySelector("#userNameThree");
const resultThree = document.querySelector("#resultThree");
const userNameFour = document.querySelector("#userNameFour");
const resultFour = document.querySelector("#resultFour");
const userNameFive = document.querySelector("#userNameFive");
const resultFive = document.querySelector("#resultFive");
const userNameSix = document.querySelector("#userNameSix");
const resultSix = document.querySelector("#resultSix");
const userNameSeven = document.querySelector("#userNameSeven");
const resultSeven = document.querySelector("#resultSeven");
const userNameEigth = document.querySelector("#userNameEigth");
const resultEigth = document.querySelector("#resultEigth");
const userNameNine = document.querySelector("#userNameNine");
const resultNine = document.querySelector("#resultNine");
const userNameTen = document.querySelector("#userNameTen");
const resultTen = document.querySelector("#resultTen");
const usernameInProgress = document.querySelector("#usernameInProgress");
const resultInProgress = document.querySelector("#resultInProgress");
let sortedArrayRanking = [];
let activateButton = false;

startGameButton.addEventListener("click", startGame);
stopGameButtonOne.addEventListener("click", finishGame);
playAgainButton.addEventListener("click", comeBackToFirstPage);
chooseUsernameInput.addEventListener('focusout', invalidUsernameOut);
chooseUsernameInput.addEventListener('focusin', invalidUsernameIn);
usernameButton.addEventListener("click", initGame);
startGameButton.addEventListener("click", startGame);
usernameButton.addEventListener("click", nextPageToRules);

usernameInProgress.innerText = "Waiting";
resultInProgress.innerText = "for an username...";

if (ranking !== null) {
    sortArray();
    printHallOfFame();
}

function sortArray(){
    arrayRanking = [];
    for (let i = 0; i < ranking.length; i++) {
        arrayRanking.push(Object.values(ranking[i]))
    }
    sortedArrayRanking = arrayRanking.sort((a, b) => a[1] - b[1]);
}

function printHallOfFame() {
    userNameOne.innerText = sortedArrayRanking[0][0];
    resultOne.innerText = sortedArrayRanking[0][1] + " " + "sec";
    userNameTwo.innerText = sortedArrayRanking[1][0];
    resultTwo.innerText = sortedArrayRanking[1][1] + " " + "sec";
    userNameThree.innerText = sortedArrayRanking[2][0];
    resultThree.innerText = sortedArrayRanking[2][1] + " " + "sec";
    userNameFour.innerText = sortedArrayRanking[3][0];
    resultFour.innerText = sortedArrayRanking[3][1] + " " + "sec";
    userNameFive.innerText = sortedArrayRanking[4][0];
    resultFive.innerText = sortedArrayRanking[4][1] + " " + "sec";
    userNameSix.innerText = sortedArrayRanking[5][0];
    resultSix.innerText = sortedArrayRanking[5][1] + " " + "sec";
    userNameSeven.innerText = sortedArrayRanking[6][0];
    resultSeven.innerText = sortedArrayRanking[6][1] + " " + "sec";
    userNameEigth.innerText = sortedArrayRanking[7][0];
    resultEigth.innerText = sortedArrayRanking[7][1] + " " + "sec";
    userNameNine.innerText = sortedArrayRanking[8][0];
    resultNine.innerText = sortedArrayRanking[8][1] + " " + "sec";
    userNameTen.innerText = sortedArrayRanking[9][0];
    resultTen.innerText = sortedArrayRanking[9][1] + " " + "sec";
}

function playGame(){
    startTime = new Date();
}

function stopGame(){
    if(gameHasStarted){
        endTime=new Date();
        responseTime=(endTime.getTime()-startTime.getTime()-4000)/1000;
        gameHasStarted=false;
        gameResult.innerText = ("Your response time is: " + responseTime +
        " seconds " + "\n" + remark(responseTime));
    }
    else{
        clearTimeout(timerID);
    }
}

function showTimeResultInHallOfFame(responseTime){
    const user1 = localStorage.getItem("username");
    let arraysortedArrayRanking = Object.values(sortedArrayRanking);
    for (let i = 0; i < 10; i++){
        if(responseTime === arraysortedArrayRanking[i][1]){
            usernameInProgress.innerText = "Congrats " + user1 + ". Your time of " + responseTime;
            resultInProgress.innerText = " made it to the top ten!";
            i=10;
        }
        else if (i==9){
            console.log("Inside else i =9")
            usernameInProgress.innerText = "Sorry " + user1 + ". Your time of " + responseTime;
            resultInProgress.innerText = "did not make it to the top ten";
        }
    }
    console.log("llegue")
    usernameInProgress.style.fontSize ="0.8rem";
    resultInProgress.style.fontSize ="0.8rem";
}

function remark(responseTime){
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
    if(activateButton===true){ 
        windowGame.style.transitionDuration = "1s";
        windowGame.style.gridTemplateRows = "100% 100% 100% 100% 100%";
        windowScore.style.height = "67.5%";
        gameScore.style.display = "flex";
        windowGame.style.transform = "translateY(-559vh)";
        stopGame();
        dataHandler();
        sortArray();
        setTimeout(printHallOfFame, 1000);
        setTimeout(function(){showTimeResultInHallOfFame(responseTime);}, 1000);
    }
}

function comeBackToFirstPage(){
    windowGame.style.transitionDuration = "1s";
    location.reload();
}

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
        localStorage.setItem("puntuation", JSON.stringify([{username: chooseUsernameInput.value , puntuation : responseTime}]))
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
        const user1 = localStorage.getItem("username");
        usernameInProgress.innerText = user1; //RANKING NAME
        resultInProgress.innerText = "Game in progress..."
    } else {
        invalidUsername.classList.add("invalidUsernameAppear");
        chooseUsernameInput.style.border = "1px solid red";
    }
}

function startGame(){
    windowGame.style.transitionDuration = "1s";
    windowGame.style.transform = "translateY(-190vh)";
    setTimeout(showThreeCountDown, 2000);
    setTimeout(showTwoCountDown, 3000);
    setTimeout(showOneCountDown, 4000);
    setTimeout(getReady, 5000);
    setTimeout(activateButtonGame, 6000);

    windowGame.style.gridTemplateRows= "100% 100% 100%";
    gameGetReady.style.display = "grid";
    gameHasStarted=true;
}

function activateButtonGame(){
    stopGameButtonOne.style.backgroundColor = "#cccc33";
    activateButton=true;
}

function showThreeCountDown(){
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
