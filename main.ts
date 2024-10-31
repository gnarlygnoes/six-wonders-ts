const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");

const canvasWidth = 64 * 16;
const canvasHeight = 64 * 9;

canvas!.width = canvasWidth;
canvas!.height = canvasHeight;

let start: number = 0;
let timer: number = 0;
let x = 0;
let y = 0;

// type Player = {
//   x: number;
//   y: number;
//   colour: string;
// };

class Actor {
  x: number;
  y: number;
  w: number;
  h: number;
  colour: string;

  constructor(x = 0, y = 0, w = 50, h = 80, colour = "red") {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.colour = colour;
  }

  applyGravity = () => {
    if (this.y + this.h < canvasHeight) {
      this.y += 1 * accel;
      accel += 0.1;
    } else {
      this.y = canvasHeight - this.h;
      accel = 0;
    }
  };
}

let accel = 0;
const p = new Actor();

const Update = () => {
  p.applyGravity();

  Draw();
  window.requestAnimationFrame(Update);
};

const Draw = () => {
  c!.fillStyle = "white";
  c!.fillRect(0, 0, canvas!.width, canvas!.height);

  // const frametime = timestamp * 0.001 - start * 0.001;
  c!.fillStyle = p.colour;
  c!.fillRect(p.x, p.y, p.w, p.h);
};

Update();
