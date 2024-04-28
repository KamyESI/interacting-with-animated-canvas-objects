const canvas = document.querySelector("canvas");

/* setting canvas width & height with width & height of window object */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* specifying that canvas will manipulate 2D objects */
let c = canvas.getContext("2d");

/* setting a mousemove event listener to interract with objects */
let mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

/* setting a resize event listener to be able to use the full width & height of canvas surface in caes of resize */
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  /* init() is called to regenerate the circles when the window is resized */
  init();
});

/* specification of circle object */
function Circle(x, y, stepx, stepy, radius, color) {
  /* initializing local variable with those given in the object prototype */
  this.x = x;
  this.y = y;
  this.stepx = stepx;
  this.stepy = stepy;
  this.radius = radius;
  this.color = color;

  /* this function :
   * updates coordinates where to draw the circle first
   * then is draws it
   */
  this.draw = function () {
    /* avoiding that the circle disapears when it reaches the window borders */
    if (this.x > innerWidth - this.radius || this.x < this.radius)
      this.stepx = -this.stepx;
    this.x = this.x + this.stepx;

    if (this.y > innerHeight - this.radius || this.y < this.radius)
      this.stepy = -this.stepy;
    this.y = this.y + this.stepy;

    /* allowing to the circle to grow up if the mouse is near it by 50px or less */
    if (Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50)
      this.radius++;
    else if (this.radius > 2) this.radius--;

    /* Avoiding that the circle grows up more than 100px of radius */
    if (this.radius > 100) this.radius = radius;

    /* drawing the circle */
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };
}

/* array that will contain circles */
let circleArray = [];

/* array of colors */
let colorArray = [
  "##3703FC",
  "#DA03FC",
  "#8903FC",
  "#031FFC",
  "#FF00A7",
  "#B057FC",
  "#FC57DB",
  "#FF008D",
];

/* init() function generates random values for radius, x, y, moving steps stepx and stepy and the color of the new circle
   then it creates a new instance of circle and push it into the circleArray */
function init() {
  circleArray = [];
  for (let i = 1; i <= 800; i++) {
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let stepx = Math.random();
    let stepy = Math.random();
    let color = Math.floor(Math.random() * colorArray.length);
    circleArray.push(new Circle(x, y, stepx, stepy, radius, colorArray[color]));
  }
}

/* animate() function is a recursive function that recall itself to be able to make the circles moving and it uses the clearRect function to clear the old screen state */
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i <= 800; i++) {
    circleArray[i].draw();
  }
}

/* at the end : we call init() function to fill the circleArray and then we call animate() function to create the animation on the generated circles */
init();
animate();
