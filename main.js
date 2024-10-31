var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
var canvasWidth = 64 * 16;
var canvasHeight = 64 * 9;
var accel = 0.2;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var start = 0;
var timer = 0;
var x = 0;
var y = 0;
var Actor = /** @class */ (function () {
    function Actor(x, y, w, h) {
        if (x === void 0) { x = 500; }
        if (y === void 0) { y = 0; }
        if (w === void 0) { w = 50; }
        if (h === void 0) { h = 80; }
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.curSpeed = 0;
        this.maxSpeed = 5;
        this.fallSpeed = 0;
        this.jumpSpeed = -8;
    }
    Actor.prototype.draw = function () {
        c.fillStyle = "red";
        c.fillRect(p.x, p.y, p.w, p.h);
    };
    Actor.prototype.update = function () {
        this.x += this.curSpeed;
        this.applyGravity();
        this.handleInputs();
        this.xCollide();
    };
    Actor.prototype.handleInputs = function () {
        if (keys.d.pressed) {
            p.curSpeed = p.maxSpeed;
        }
        else if (keys.a.pressed) {
            p.curSpeed = -p.maxSpeed;
        }
        else {
            p.curSpeed = 0;
        }
    };
    Actor.prototype.applyGravity = function () {
        if (this.y + this.h < canvasHeight) {
            this.y += this.fallSpeed;
            this.fallSpeed += accel;
            this.onGround = false;
        }
        else {
            this.y = canvasHeight - this.h;
            this.fallSpeed = 0;
            this.onGround = true;
        }
    };
    Actor.prototype.jump = function () {
        this.fallSpeed = this.jumpSpeed;
        this.y -= 1;
    };
    Actor.prototype.xCollide = function () {
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x + this.w > canvasWidth) {
            this.x = canvasWidth - this.w;
        }
    };
    return Actor;
}());
var p = new Actor();
var keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
};
var fps = 0;
var elapsed = 0;
var current = performance.now();
var last = performance.now();
var main = function () {
    current = performance.now();
    elapsed = current - last;
    last = current;
    fps = 1000 / elapsed;
    // console.log(fps);
    p.update();
    draw();
    window.requestAnimationFrame(main);
};
var draw = function () {
    c.fillStyle = "lightblue";
    c.fillRect(0, 0, canvas.width, canvas.height);
    p.draw();
    // c!.font = "36px Arial";
    // c!.fillText(String(fps), 20, 30);
};
main();
window.addEventListener("keydown", function (event) {
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
window.addEventListener("keyup", function (event) {
    switch (event.key) {
        case "a":
            keys.a.pressed = false;
            break;
        case "d":
            keys.d.pressed = false;
            break;
    }
});
