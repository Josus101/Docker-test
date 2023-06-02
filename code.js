// connect HTML elements

const canvas = document.getElementById("canvasGFX");
const ctx = canvas.getContext("2d");

let mainMenu = document.getElementById("mainMenu");
let levelMenu = document.getElementById("levelMenu");
let mainGame = document.getElementById("mainGame");
let pauseMenu = document.getElementById("pauseMenu");
let pause = document.getElementById("pause");
let options = document.getElementById("options");

//Bare funksjonene te start
function initializeGame(  ) 
{
    mainMenu.style.display = "none";
    levelMenu.style.display = "none";
    canvas.style.visibility = "visible";
    mainGame.style.display = "initial";
    ctx.clearRect( 0,0, canvas.width, canvas.height );
    setupGame( );
}

function showLevels()
{
    // Vise levels
    if ( mainMenu.style.display != "none" ) 
    {
        mainMenu.style.display = "none";
        levelMenu.style.display = "initial";
    }
    else if ( mainGame.style.display != "none")
    {
        pauseMenu.style.display = "none";
        levelMenu.style.display = "initial";
    }
}

let level1 = document.getElementById("level1");
let level2 = document.getElementById("level2");
let level3 = document.getElementById("level3");
let buttonBack = document.getElementById("buttonBack");

let globalLevelCount = 1;

level1.onclick = function ()
{
    globalLevelCount = 1;
    initializeGame( );
}
level2.onclick = function ()
{
    globalLevelCount = 2;
    initializeGame( );
}
level3.onclick = function ()
{
    globalLevelCount = 3;
    initializeGame( );
}
buttonBack.onclick = function ()
{
    
    if ( mainGame.style.display != "initial" )
    {
        // For main menu
        levelMenu.style.display = "none";
        mainMenu.style.display = "initial";
    }
    else
    {
        // For game manu
        levelMenu.style.display = "none";
        pauseMenu.style.display = "initial";
    }
}

// Pause
let buttonPause = document.getElementById("btnPause");
let buttonResume = document.getElementById("buttonResume");
let buttonOptions = document.getElementById("buttonOptions");
let buttonLevels = document.getElementById("buttonLevels");
let buttonMainMenu = document.getElementById("buttonMainMenu");
let btnBackToPause = document.getElementById("btnBackToPause");

// Displaye volumet i options, men må venta te jjosus har fiksa volum fust
let pVolumeValue = document.getElementById("volumeValue");
let pMusciValue = document.getElementById("musicValue");
let pSFXValue = document.getElementById("SFXValue");

// volume stuff
let masterVolumeSlider = document.getElementById("Master Volume");
let musicVolumeSlider = document.getElementById("musicVolume");
let SFXVolumeSlider = document.getElementById("SFXVolume");


// music
let music = new Audio();
music.src = "SFX/backgroundMusic.mp3";
// SFX
let hitSFX = new Audio();
hitSFX.src ="SFX/hit.mp3";

function playSFX(){
    hitSFX.play();
}

// pause shit
let paused = false;
function pauseGame(){
    paused = true;
    pauseMenu.disable = false;
    pauseMenu.style.display = "initial";
    canvas.style.visibility = "hidden";
    music.pause();
}
function resumeGame(){
    pauseMenu.disable = true;
    paused = false;
    pauseMenu.style.display = "none";
    canvas.style.visibility = "visible";
    if(startGame) music.play();
}
buttonPause.onclick = function(){
    pauseGame();
}
buttonResume.onclick = function(){
    resumeGame();
}

buttonOptions.onclick = function()
{
    pause.style.display = "none";
    options.style.display = "grid";
}

buttonLevels.onclick = function ()
{
    showLevels();
}

buttonMainMenu.onclick = function ()
{
    pauseMenu.style.display = "none";
    mainGame.style.display = "none";
    mainMenu.style.display = "initial";
    music.pause();
}

btnBackToPause.onclick = function(){
    pause.style.display = "grid";
    options.style.display = "none";
}


// Volume sliders impact volume


let masterVolume = 100;
let musicVolume = 100;
let SFXVolume = 100;

function addMasterVolume() {
    console.log(masterVolume, musicVolume, SFXVolume);
    music.volume = (musicVolume * (masterVolume / 100))/100;
    hitSFX.volume = (SFXVolume * (masterVolume / 100))/100; 
}

masterVolumeSlider.onchange = function(){
    masterVolume = parseFloat(masterVolumeSlider.value);
    pVolumeValue.innerHTML = masterVolume;
    addMasterVolume();
};
musicVolumeSlider.onchange = function(){
    musicVolume = parseFloat(musicVolumeSlider.value);
    pMusciValue.innerHTML = musicVolume;
    addMasterVolume();
};
SFXVolumeSlider.onchange = function(){
    SFXVolume = parseFloat(SFXVolumeSlider.value);
    pSFXValue.innerHTML = SFXVolume;
    addMasterVolume();
};


//Bricks
let brickRowCount = 8;
let brickColumnCount = 8;
let brick = []; //Array for å holda styr på blokkene

function createBricks () 
{
    // Trenger disse for å regne ut width og height
    let padding = 13;
    let offsetTop = 30;
    let offsetLeft = 6;
    let brickWidth = canvas.width / brickColumnCount - padding;
    let brickHeight = ( canvas.height * 0.4 ) / ( brickRowCount );

    for ( let columns = 0; columns < brickColumnCount; columns++ )
    {
        brick[columns] = [];
        for ( let rows = 0; rows < brickRowCount; rows++ )
        {
            brick[columns].push( new Brick ( 0, 0, brickWidth, brickHeight, "rgb(3,37,126)", true, padding, offsetTop, offsetLeft ) );
        }
    }

    drawBricks();
}

function drawBricks ()
{
    for ( let columns = 0; columns < brickColumnCount; columns++ )
    {
        for ( let rows = 0; rows < brickRowCount; rows++ )
        {
            if ( brick[columns][rows].exist == true )
            {
                brick[columns][rows].draw( columns, rows );
            }
        }
    }
}


let input;
let inputRight = 0;
let inputLeft = 0;

// start game function
let startGame = false;

document.onkeydown = function(event){
    if(event.key == "ArrowRight") inputRight = 1;
    if(event.key == "ArrowLeft") inputLeft = 1;
    if(event.key == " " && startGame == false && mainMenu.style.display == "none"){
        startGame = true;
        music.play();
        game();
    }
    if(event.key == "Escape" && mainMenu.style.display == "none" ){
        if(paused) resumeGame();
        else pauseGame();
    }
    
}
document.onkeyup = function(event){
    if(event.key == "ArrowRight") inputRight = 0;
    if(event.key == "ArrowLeft") inputLeft = 0;
}

let ballList = [];
let testPlayer = new Player(canvas.width/2 - 50, canvas.height - 20, 100, 20, "red", 10);
let Ball1 = new Ball(canvas.width / 2, canvas.height - 30, "red", 10, -5, -4);
ballList.push(Ball1);

function setupGame( ){

    // Setup
    startGame = false;
    paused = false;
    ballList = [];
    testPlayer = new Player(canvas.width/2 - 50, canvas.height - 20, 100, 20, "red", 10);
    Ball1 = new Ball(canvas.width / 2, canvas.height - 30, "red", 10, -5, -4);
    ballList.push(Ball1);

    console.log(Ball1);

    // sprites and shit
    testPlayer.draw();
    for(let i = 0; i < ballList.length; i++){
        ballList[i].draw();
    }
    
    if ( globalLevelCount == 1 )
    {
        brickColumnCount = 5;
        brickRowCount = 3;
        brickCount = brickColumnCount*brickRowCount;
    } 
    else if ( globalLevelCount == 2 )
    {
        brickColumnCount = 6;
        brickRowCount = 4;
        brickCount = brickColumnCount*brickRowCount;
    } 
    else if ( globalLevelCount == 3 )
    {
        brickColumnCount = 8;
        brickRowCount = 7;
        brickCount = brickColumnCount*brickRowCount;
    }

    createBricks();



    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "rgb(255, 255, 255)";
    let txt = "Press space to start";
    ctx.fillText(txt, canvas.width/2 - ctx.measureText(txt).width / 2, canvas.height / 2);
    ctx.textAlign = "center";    
}

//document.onload = setupGame();

// gameloop
function game(){
// get input for player
    input = inputRight - inputLeft;

    // calcualtions
    if(!paused){
        testPlayer.update();
        for(let i = 0; i < ballList.length; i++){
            ballList[i].update();
        }
    }
    // draw
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    testPlayer.draw();
    for(let i = 0; i < ballList.length; i++){
        ballList[i].draw();
    }
    drawBricks();

    if ( startGame ) 
    {
        requestAnimationFrame(game);
    }
}

let dead = false;

// ded
function ded  ( ) 
{
   initializeGame( );
}
