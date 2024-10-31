const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");

const canvasWidth = 64 * 16;
const canvasHeight = 64 * 9;
const accel = 0.2;

canvas!.width = canvasWidth;
canvas!.height = canvasHeight;

let start: number = 0;
let timer: number = 0;
let x = 0;
let y = 0;

class Actor {
  x: number;
  y: number;
  w: number;
  h: number;
  curSpeed: number;
  maxSpeed: number;
  fallSpeed: number;
  jumpSpeed: number;
  onGround: boolean;

  constructor(x = 500, y = 0, w = 50, h = 80) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.curSpeed = 0;
    this.maxSpeed = 5;
    this.fallSpeed = 0;
    this.jumpSpeed = -8;
  }

  draw() {
    c!.fillStyle = "red";
    c!.fillRect(p.x, p.y, p.w, p.h);
  }

  update() {
    this.x += this.curSpeed;
    this.applyGravity();
    this.handleInputs();
    this.xCollide();
  }

  handleInputs() {
    if (keys.d.pressed) {
      p.curSpeed = p.maxSpeed;
    } else if (keys.a.pressed) {
      p.curSpeed = -p.maxSpeed;
    } else {
      p.curSpeed = 0;
    }
  }

  applyGravity() {
    if (this.y + this.h < canvasHeight) {
      this.y += this.fallSpeed;
      this.fallSpeed += accel;
      this.onGround = false;
    } else {
      this.y = canvasHeight - this.h;
      this.fallSpeed = 0;
      this.onGround = true;
    }
  }

  jump() {
    this.fallSpeed = this.jumpSpeed;
    this.y -= 1;
  }

  xCollide() {
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.w > canvasWidth) {
      this.x = canvasWidth - this.w;
    }
  }
}

const p = new Actor();

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

let fps = 0;
let elapsed = 0;
let current = performance.now();
let last = performance.now();

const main = () => {
  current = performance.now();
  elapsed = current - last;
  last = current;
  fps = 1000 / elapsed;
  // console.log(fps);

  p.update();
  draw();

  window.requestAnimationFrame(main);
};

const draw = () => {
  c!.fillStyle = "lightblue";
  c!.fillRect(0, 0, canvas!.width, canvas!.height);

  p.draw();

  // c!.font = "36px Arial";
  // c!.fillText(String(fps), 20, 30);
};

main();

window.addEventListener("keydown", (event) => {
  // console.log(event);
  if (event.key === " " && p.onGround) {
    p.jump();
  }
  switch (event.key) {
    case "a":
      keys.a.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});
