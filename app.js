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
let stopGameButtonOne = document.querySelector("#stopGameButtonOne");
let stopGameButtonTwo = document.querySelector("#stopGameButtonTwo");
let stopGameButtonThree = document.querySelector("#stopGameButtonThree");
let playAgainButton = document.querySelector("#playAgainButton");
let gameStopGame = document.querySelector("#gameStopGame"); 
let pushColor = document.querySelector("#pushColor");
let gameResult = document.querySelector("#gameResult");
let startTime=new Date();
let endTime=new Date();
let startPressed=false;
let gameHasStarted=false;
let maxWait=20;
let timerID;


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
    gameHasStarted=true;
    playGame();
}

function getReady(){
    windowGame.style.transitionDuration = "1s"; 
    windowGame.style.transform = "translateY(-270vh)";
    
}



//añade elemento pero por abajo. convertir color a [] 

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
    windowGame.style.transform = "translateY(-360vh)";
    stopGame();
}


function comeBackToFierstPage(){
    windowGame.style.transitionDuration = "1s";
    windowGame.style.transform = "translateY(0)";
    gameResult.removeChild; //Mirar como eliminar este elemento
}


/* HALL OF FAME */

chooseUsernameInput.addEventListener('focusout', invalidUsernameOut);
chooseUsernameInput.addEventListener('focusin', invalidUsernameIn);
usernameButton.addEventListener("click", nextPageToRules);
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

function nextPageToRules(){
    if (usernameCorrect == true) {
        dataObject.username = chooseUsernameInput.value;
        localStorage.setItem("username", JSON.stringify(dataObject.username))
        windowGame.style.transitionDuration = "1s";
        windowGame.style.transform = "translateY(-100vh)";
        event.preventDefault();
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
