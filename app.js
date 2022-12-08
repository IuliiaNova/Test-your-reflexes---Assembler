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
const stopGameButtonFour = document.querySelector("#stopGameButtonFour");
const stopGameButtonFive = document.querySelector("#stopGameButtonFive");
const stopGameButtonSix = document.querySelector("#stopGameButtonSix");
const stopGameButtonSeven = document.querySelector("#stopGameButtonSeven");
const playAgainButton = document.querySelector("#playAgainButton");
const pushColor = document.querySelector("#pushColor");
const gameResult = document.querySelector("#gameResult");
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
const usernameInProgress = document.querySelector("#usernameInProgress");
const resultInProgress = document.querySelector("#resultInProgress");
const resultUsername = document.querySelectorAll(".result-username");
const resultTime = document.querySelectorAll(".result-time");
let sortedArrayRanking = [];
let activateButton = false;
let roundText = document.querySelector("#roundText");

startGameButton.addEventListener("click", startGame);
stopGameButtonSix.addEventListener("click", finishGame);
stopGameButtonSeven.addEventListener("click", finishGame);
stopGameButtonFour.addEventListener("click", roundFour);
stopGameButtonFive.addEventListener("click", roundFour);
stopGameButtonTwo.addEventListener("click", roundThree);
stopGameButtonThree.addEventListener("click", roundThree);
stopGameButtonOne.addEventListener("click", roundTwo);
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
    printHallOfFameUsername();
    printHallOfFameTime();
}

function sortArray(){
    arrayRanking = [];
    for (let i = 0; i < ranking.length; i++) {
        arrayRanking.push(Object.values(ranking[i]))
    }
    sortedArrayRanking = arrayRanking.sort((a, b) => a[1] - b[1]);
    console.log({sortedArrayRanking})
}

function printHallOfFameUsername() {
    for (let i = 0; i < ranking.length && i < 10; i++){
        let hola = sortedArrayRanking[i][0];
        resultUsername[i].innerText = sortedArrayRanking[i][0];
    }
}

function printHallOfFameTime() {
    for (let i = 0; i < ranking.length && i < 10; i++){
        resultTime[i].innerText = sortedArrayRanking[i][1] + " sec";
    }
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
            usernameInProgress.innerText = "Sorry " + user1 + ". Your time of " + responseTime;
            resultInProgress.innerText = "did not make it to the top ten";
        }
    }
    usernameInProgress.style.fontSize ="0.8rem";
    resultInProgress.style.fontSize ="0.8rem";
}

function remark(responseTime){
    var responseString="";
    if (responseTime < 6.00)
        responseString="Well done!";
    if (responseTime >=5.00 && responseTime < 8.00)
        responseString="Keep practising!";
    if (responseTime >=8.00)
        responseString="Did you fall asleep?";
    return responseString;
}

function finishGame(){
    windowGame.style.transitionDuration = "1s";
    windowGame.style.gridTemplateRows = "100% 100% 100% 100% 100%";
    windowScore.style.height = "67.5%";
    gameScore.style.display = "flex";
    windowGame.style.transform = "translateY(-556vh)";
    stopGame();
    dataHandler();
    sortArray();
    setTimeout(printHallOfFameUsername, 1000);
    setTimeout(printHallOfFameTime, 1000);
    setTimeout(function(){showTimeResultInHallOfFame(responseTime);}, 1000);
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
        let positionExist = ranking.find(puesto => puesto.username === chooseUsernameInput.value);
        if(positionExist){
            positionExist.puntuation = responseTime;
        }else{
            ranking.push({username: chooseUsernameInput.value, puntuation: responseTime})
        }
        localStorage.setItem("puntuation", JSON.stringify(ranking))
    }else{
        localStorage.setItem("puntuation", JSON.stringify([{username: chooseUsernameInput.value, puntuation: responseTime}]))
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
    windowGame.style.transform = "translateY(-195vh)";
    setTimeout(showThreeCountDown, 2000);
    setTimeout(showTwoCountDown, 3000);
    setTimeout(showOneCountDown, 4000);
    setTimeout(getReady, 5000);
    setTimeout(activateButtonGame, 6000);
    windowGame.style.gridTemplateRows= "100% 100% 100%";
    gameGetReady.style.display = "grid";
    gameHasStarted=true;
    windowScore.style.height = "97.2%";
}

function activateButtonGame(){
    stopGameButtonOne.style.backgroundColor = "#cccc33";
    activateButton = true;
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
    windowGame.style.transform = "translateY(-288vh)";
    windowGame.style.gridTemplateRows= "100% 100% 100% 100%";
    gameStopGame.style.display = "grid";
    windowScore.style.height = "98.6%";
}

function roundTwo(){
    if (activateButton == true){
        stopGameButtonOne.style.display= "none";
        stopGameButtonThree.style.display= "grid";
        roundText.innerText = "ROUND 2";
        roundText.style.top= "22%";
        windowScore.style.height = "99.2%";
    }
}

function roundThree(){
    stopGameButtonTwo.style.display= "none";
    stopGameButtonThree.style.display= "none";
    stopGameButtonFive.style.display= "grid";
    roundText.innerText = "ROUND 3";
}

function roundFour(){
    stopGameButtonFour.style.display= "none";
    stopGameButtonFive.style.display= "none";
    stopGameButtonSeven.style.display= "none";
    stopGameButtonSix.style.display= "grid";
    setInterval(function(){
        stopGameButtonSeven.style.display= "grid";
        stopGameButtonSix.style.display= "none";
    }, 1800);
    setInterval(function(){
        stopGameButtonSeven.style.display= "none";
        stopGameButtonSix.style.display= "grid";
    }, 3600);
    roundText.innerText = "ROUND 4";
}



// grab all DIV elements in the document
let buttons = document.querySelectorAll('.stop-game-button');

// helper method to get a multitude of a
// random number as an integer
const rand = (multi) => {
    return parseInt(multi * Math.random() ,10);
}

// get width and height of the window
let ww = (window.innerWidth)*0.70;
let wh = (window.innerHeight)*0.95;

// define biggest possible value as constraint
let constraint = Math.min(ww/4, wh/4);

// move the dots by changing the CSS values
function move(){

  // loop over all DIV elements
  buttons.forEach((button) => {

    // Balls can be the width of the constraint
    // or less
    let w = rand(constraint);

    // x and y position limited to screen space
    let x = rand((ww - w));
    let y = rand((wh - w));

    // apply styles
    button.style.width = w + 30 + 'px';
    button.style.height = w + 30 + 'px';
    button.style.top = y + 'px';
    button.style.left = x + 'px';
    button.style.borderRadius = Math.floor(Math.random() * 101) + '%';
    button.style.transform = "rotate("+Math.floor(Math.random() * 361)
    +"deg)";

    // 'move' dot with 900ms or more
    button.style.transition = (rand(300) + 700) +'ms';

    // apply random colour
    button.style.background = `rgba(
      ${rand(255)},
      ${rand(255)},
      ${rand(255)},
      ${Math.random() + 0.5}
    )`;
  });
}

// change dots every second
window.setInterval(move, 900);

let buttonsTwo = document.querySelectorAll('.stop-game-button-two');

function moveTwo(){
    buttonsTwo.forEach((button) => {
    let w = rand(constraint);
    let x = rand((ww - w));
    let y = rand((wh - w));
    button.style.width = w + 'px';
    button.style.height = w + 'px';
    button.style.top = y + 'px';
    button.style.left = x + 'px';
    button.style.borderRadius = Math.floor(Math.random() * 101) + '%';
    button.style.transform = "rotate("+Math.floor(Math.random() * 361)
    +"deg)";
    button.style.transition = 0 + 'ms';
    button.style.background = `rgba(
      ${rand(255)},
      ${rand(255)},
      ${rand(255)},
      ${Math.random() + 0.5}
    )`;
  });
}

window.setInterval(moveTwo, 700);

let buttonsThree = document.querySelectorAll('.stop-game-button-three');

function moveThree(){
    constraint = Math.min(ww/6, wh/6);
    buttonsThree.forEach((button) => {
    let w = rand(constraint);
    let x = rand((ww - w));
    let y = rand((wh - w));
    button.style.width = w + 'px';
    button.style.height = w + 'px';
    button.style.top = y + 'px';
    button.style.left = x + 'px';
    button.style.borderRadius = Math.floor(Math.random() * 101) + '%';
    button.style.transform = "rotate("+Math.floor(Math.random() * 361)
    +"deg)";
    button.style.transition = 800 +'ms';
    button.style.background = `rgba(
      ${rand(255)},
      ${rand(255)},
      ${rand(255)},
      ${Math.random() + 0.5}
    )`;
  });
}
window.setInterval(moveThree, 500); /* 450 */