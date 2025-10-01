const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
const enemies = document.querySelectorAll(".enemy");
const items = document.querySelectorAll(".item");
const startBtn = document.getElementById('startBtn');
const reiniciarBtn = document.getElementById('reiniciarBtn');


let posX = 50;
let posY = 50;
let score = 0;
let gameOver = false;
const speed = 10;
const containerWidth = document.getElementById("game-container").clientWidth;
const containerHeight = document.getElementById("game-container").clientHeight;


function positionElements() {
  enemies.forEach(enemy => {
    enemy.style.left = Math.random() * (containerWidth - 60) + "px";
    enemy.style.top = Math.random() * (containerHeight - 60) + "px";
  });
  
  items.forEach(item => {
    item.style.left = Math.random() * (containerWidth - 60) + "px";
    item.style.top = Math.random() * (containerHeight - 60) + "px";
  });
}


function movePlayer(e) {
  if (gameOver) return;

  let newX = posX;
  let newY = posY;

  switch (e.key) {
    case "ArrowUp":
    case "w":
      newY -= speed;
      break;
    case "ArrowDown":
    case "s":
      newY += speed;
      break;
    case "ArrowLeft":
    case "a":
      newX -= speed;
      break;
    case "ArrowRight":
    case "d":
      newX += speed;
      break;
  }

  newX = Math.max(0, Math.min(containerWidth - player.clientWidth, newX));
  newY = Math.max(0, Math.min(containerHeight - player.clientHeight, newY));

  posX = newX;
  posY = newY;
  player.style.left = posX + "px";
  player.style.top = posY + "px";

  checkCollisionWithItems();
}


function isColliding(a, b) {
  const r1 = a.getBoundingClientRect();
  const r2 = b.getBoundingClientRect();
  return !(
    r1.top > r2.bottom ||
    r1.bottom < r2.top ||
    r1.right < r2.left ||
    r1.left > r2.right
  );
}


function checkCollisionWithItems() {
  items.forEach(item => {
    if (item.style.display !== "none" && isColliding(player, item)) {
      item.style.display = "none";
      score++;
      scoreDisplay.textContent = score;
    }
  });
}


function moveEnemies() {
  if (gameOver) return;

  enemies.forEach(enemy => {
    let enemyPosX = enemy.offsetLeft;
    let enemyPosY = enemy.offsetTop;

    
    enemy.style.left = enemyPosX + Math.sin(enemyPosY) * 5 + 'px';
    enemy.style.top = enemyPosY + Math.cos(enemyPosX) * 5 + 'px';

    
    if (isColliding(player, enemy)) {
      alert(`☠️ Você foi pego! Fim de jogo.\nPontuação: ${score}`);
      gameOver = true;
    }
  });
}


function reiniciarJogo() {
  score = 0;
  scoreDisplay.textContent = score;
  gameOver = false;
  positionElements();
  player.style.left = "50px";
  player.style.top = "50px";
}


function iniciarJogo() {
  positionElements();
  score = 0;
  scoreDisplay.textContent = score;
  gameOver = false;
}


document.addEventListener("keydown", movePlayer);
startBtn.addEventListener('click', iniciarJogo);
reiniciarBtn.addEventListener('click', reiniciarJogo);


setInterval(moveEnemies, 100);
