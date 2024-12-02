/*********************GLOBAL VARIABLES */
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const w = window;
const snowBallRadio = 2.5;
const colorSnow = '#fff';
let $width = (canvas.width = w.innerWidth);
let $height = (canvas.height = w.innerHeight);
let snowBallsArray = [];
let columns = ~~($width / snowBallRadio);

/*********************FUNCTIONS */
const times = length => Array.from({ length }, (_, i) => i);

const resizeCanvas = () => {
  $width = canvas.width = w.innerWidth;
  $height = canvas.height = w.innerHeight;
  columns = Math.floor($width / snowBallRadio);
  fillSnowBallsArray();
};
const randomVelocity = () => ~~(Math.random() * 5) + 5;

const randomY = () => ~~(Math.random() * $height) - 100;
const randomXIncrement = () => ~~(Math.random() * 6);

const fillSnowBallsArray = () => {
  snowBallsArray = [];
  snowBallsArray = times(columns).map(col => ({
    x: col * snowBallRadio + 8,
    y: randomY(),
    velocity: randomVelocity()
  }));
};

const drawSnowBalls = () => {
  ctx.clearRect(0, 0, $width, $height);

  snowBallsArray.forEach(snow => {
    let vaiven = Math.cos(randomXIncrement());
    ctx.beginPath();
    ctx.fillStyle = colorSnow;
    if (snow.y > $height) {
      snow.y = 0;
      snow.velocity = randomVelocity();
    } else {
      snow.y += snow.velocity;
    }
    snow.x = Math.sign(vaiven) === 1 ? snow.x : -snow.x;
    ctx.fillText('⭐', snow.x, snow.y);
    ctx.fill();
    ctx.closePath();
  });

  requestAnimationFrame(drawSnowBalls);
};

/*********************EVENTS */
document.addEventListener('DOMContentLoaded', () => {
  fillSnowBallsArray();
  drawSnowBalls();

  window.addEventListener('resize', () => {
    resizeCanvas();
  });
});
