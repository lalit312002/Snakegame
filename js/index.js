const foodsound = new Audio("music/food.mp3");
const gameoversound = new Audio("music/gameover.mp3");
const movesound = new Audio("music/move.mp3");
const backgroundsound = new Audio("music/music.mp3");
let inputDir = { x: 0, y: 0 };
let speed = 5;
let snakeArr = [{ x: 11, y: 14 }];
let food = { x: 5, y: 3 };
let lastPaintTime = 0;
let a = 1;
let b = 16;
let score = 0;

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }

  lastPaintTime = ctime;
  gameEngine();
}

function getRandomFoodPosition() {
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}

function randomGridPosition() {
  return {
    x: Math.ceil(b * Math.random()) + a,
    y: Math.ceil(b * Math.random()) + a,
  };
}
function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y
}
function onSnake(position) {
  return snakeArr.some((segment) => {
  
    return equalPositions(segment, position)
  })
}

function isColide(snake) {
  for(let i=1;i<snake.length;i++)
  {
    if(snake[0].x==snake[i].x&&snake[0].y==snake[i].y)
    return true;
  }
  if (snake[0].x<1 || snake[0].x >= 18 || snake[0].y <1 || snake[0].y >= 18)
      return true;
  return false;
}

function gameEngine() {
  //game restart
  if (isColide(snakeArr)) {
    backgroundsound.pause();
    gameoversound.play();
    inputDir = { x: 0, y: 0 };
    alert('Game over! press "OK" or "SPACE" to continue');
    snakeArr = [{ x: 13, y: 5 }];
    backgroundsound.play();
    score = 0;
    scoreBox.innerHTML='score:'+score;
    
  }

  //   if food eaten update snake and food
  if (snakeArr[0].x === food.x && snakeArr[0].y == food.y) {
    foodsound.play();
    score+=1;
    if (score>hiscoreval) {
      hiscoreval=score;
      localStorage.setItem('hiscore',JSON.stringify( hiscoreval));
      hiscoreBox.innerHTML='Hiscore:'+hiscoreval;
    }
    scoreBox.innerHTML='score:'+score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    food = getRandomFoodPosition ();
  }

  // moving snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  // print snake and food

  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index == 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // displaying food

  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// main execution
backgroundsound.volume /= 1;
let hiscore=localStorage.getItem('hiscore')
if (hiscore==null) {
  hiscoreval=0;
  localStorage.setItem('hiscore',JSON.stringify( hiscoreval));
}
else{
  hiscoreval=JSON.parse(hiscore);
  hiscoreBox.innerHTML='Hiscore:'+hiscoreval;
}
// hiscoreval=0;

prevKey="";
window.requestAnimationFrame(main);
// inputDir = { x: 0, y: 1 };
window.addEventListener("keydown", (e) => {
  backgroundsound.play();
  movesound.play();
  switch (e.key) { 
    case "ArrowUp":
      // console.log("arrowup")
      if(inputDir.y==1)
      break;
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      if(inputDir.y==-1)
      break;
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      if(inputDir.x==1)
      break;
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      if(inputDir.x==-1)
      break;
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      
      break;
  }
 
});
