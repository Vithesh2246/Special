// =====================================
// SWEET CATCH - MAIN JAVASCRIPT
// =====================================



// ================================
// GET ELEMENTS
// ================================


const loadingScreen = document.getElementById("loadingScreen");
const homeScreen = document.getElementById("homeScreen");
const missionScreen = document.getElementById("missionScreen");
const gameScreen = document.getElementById("gameScreen");
const rewardScreen = document.getElementById("rewardScreen");
const videoScreen = document.getElementById("videoScreen");


const startBtn = document.getElementById("startBtn");
const continueBtn = document.getElementById("continueBtn");
const rewardBtn = document.getElementById("rewardBtn");


const settingsBtn = document.getElementById("settingsBtn");
const aboutBtn = document.getElementById("aboutBtn");


const settingsPopup = document.getElementById("settingsPopup");
const aboutPopup = document.getElementById("aboutPopup");


const closeSettings = document.getElementById("closeSettings");
const closeAbout = document.getElementById("closeAbout");

const birthdayVideo = document.getElementById("birthdayVideo");

const finalScreen = document.getElementById("finalScreen");

const watchAgainBtn = document.getElementById("watchAgainBtn");

const clickSound = document.getElementById("clickSound");

const catchSound = document.getElementById("catchSound");

const winSound = document.getElementById("winSound");

const revealSound = document.getElementById("revealSound");


// ================================
// LOADING SCREEN
// ================================


window.addEventListener("load",()=>{


    setTimeout(()=>{


        loadingScreen.classList.add("hidden");


        homeScreen.classList.remove("hidden");


    },3000);


});



// ================================
// HOME TO MISSION
// ================================


startBtn.addEventListener("click",()=>{

    clickSound.currentTime = 0;
    clickSound.play();


    homeScreen.classList.add("hidden");


    missionScreen.classList.remove("hidden");


});



// ================================
// MISSION TO GAME
// ================================


continueBtn.addEventListener("click",()=>{

    clickSound.currentTime = 0;
clickSound.play();


    missionScreen.classList.add("hidden");


    gameScreen.classList.remove("hidden");


    startGame();


});



// ================================
// SETTINGS POPUP
// ================================


settingsBtn.addEventListener("click",()=>{


    settingsPopup.classList.remove("hidden");
clickSound.currentTime = 0;
    clickSound.play();

});


closeSettings.addEventListener("click",()=>{


    settingsPopup.classList.add("hidden");


});



// ================================
// ABOUT POPUP
// ================================


aboutBtn.addEventListener("click",()=>{


    aboutPopup.classList.remove("hidden");
clickSound.currentTime = 0;
    clickSound.play();

});


closeAbout.addEventListener("click",()=>{


    aboutPopup.classList.add("hidden");


});



// ================================
// GAME START FUNCTION
// ================================


// =====================================
// SWEET CATCH GAME ENGINE
// =====================================


let score = 0;

let gameActive = false;


const gameArea = document.getElementById("gameArea");

const bucket = document.getElementById("bucket");

const scoreDisplay = document.getElementById("score");




// START GAME

function startGame(){

    score = 0;

    scoreDisplay.innerText = score;

    gameActive = true;


    createChocolate();

}




// CREATE CHOCOLATE

function createChocolate(){


    if(!gameActive){

        return;

    }


    let chocolate = document.createElement("img");

    chocolate.src = "assets/images/kinderjoy.png";

    chocolate.classList.add("kinderjoy");


    let randomPosition =
    Math.random() * 
    (window.innerWidth - 60);


    chocolate.style.left =
    randomPosition + "px";


    chocolate.style.top =
    "-60px";


    gameArea.appendChild(chocolate);



    let fallSpeed = 4;



    let fallInterval = setInterval(()=>{


        let currentTop =
        chocolate.offsetTop;



        chocolate.style.top =
        currentTop + fallSpeed + "px";



        checkCollision(
            chocolate,
            fallInterval
        );



        if(currentTop > window.innerHeight){


            chocolate.classList.add("caught");


                    setTimeout(()=>{

                        chocolate.remove();

                    },300);


            clearInterval(fallInterval);


        }



    },20);



    setTimeout(()=>{


        createChocolate();


    },1200);


}





// CHECK IF BUCKET CAUGHT CHOCOLATE


function checkCollision(chocolate, interval){


    let chocolateBox =
    chocolate.getBoundingClientRect();


    let bucketBox =
    bucket.getBoundingClientRect();



    if(

        chocolateBox.bottom >= bucketBox.top &&

        chocolateBox.left <= bucketBox.right &&

        chocolateBox.right >= bucketBox.left

    ){


        chocolate.remove();


        clearInterval(interval);



        score++;

        catchSound.currentTime = 0;
catchSound.play();

        scoreDisplay.innerText = score;



        console.log("Chocolate collected:",score);



      if(score === 10){

       winSound.currentTime = 0;
winSound.play();

    gameActive = false;


    setTimeout(()=>{

        gameScreen.classList.add("hidden");

        rewardScreen.classList.remove("hidden");


    },1000);


}


    }


}





// BUCKET MOVEMENT - MOUSE


document.addEventListener(
"mousemove",
(event)=>{


    if(gameActive){


        bucket.style.left =
        event.clientX + "px";


    }


});






// BUCKET MOVEMENT - MOBILE


document.addEventListener(
"touchmove",
(event)=>{


    if(gameActive){


        let touch =
        event.touches[0];


        bucket.style.left =
        touch.clientX + "px";


    }


});

// =====================================
// OPEN REWARD
// =====================================


// ===============================
// OPEN REWARD
// ===============================

rewardBtn.addEventListener("click",()=>{

    clickSound.currentTime = 0;
    clickSound.play();

    revealSound.currentTime = 0;
    revealSound.play();

    rewardScreen.classList.add("hidden");
    videoScreen.classList.remove("hidden");

    document.getElementById("prepareText").style.display = "block";

    birthdayVideo.classList.remove("show");
    birthdayVideo.currentTime = 0;

    // Play immediately
    birthdayVideo.play().catch(err => console.log(err));

    // After 2.5 sec show the video
    setTimeout(()=>{

        document.getElementById("prepareText").style.display = "none";

        birthdayVideo.classList.add("show");

    },2500);

});



// ===============================
// VIDEO FINISHED
// ===============================

birthdayVideo.addEventListener("ended",()=>{

    videoScreen.classList.add("hidden");

    finalScreen.classList.remove("hidden");

});



// ===============================
// WATCH AGAIN
// ===============================

watchAgainBtn.addEventListener("click",()=>{

    clickSound.currentTime = 0;
clickSound.play();

    finalScreen.classList.add("hidden");

    videoScreen.classList.remove("hidden");

    document.getElementById("prepareText").style.display="block";

    birthdayVideo.classList.remove("show");

    birthdayVideo.currentTime = 0;

    setTimeout(()=>{

        document.getElementById("prepareText").style.display="none";

        birthdayVideo.classList.add("show");

        birthdayVideo.play();

    },2500);

});
