var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
var canvasWidth = 64 * 16;
var canvasHeight = 64 * 9;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var start = 0;
var timer = 0;
var x = 0;
var y = 0;
// type Player = {
//   x: number;
//   y: number;
//   colour: string;
// };
var Actor = /** @class */ (function () {
    function Actor(x, y, w, h, colour) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (w === void 0) { w = 50; }
        if (h === void 0) { h = 80; }
        if (colour === void 0) { colour = "red"; }
        var _this = this;
        this.applyGravity = function () {
            if (_this.y + _this.h < canvasHeight) {
                _this.y += 1 * accel;
                accel += 0.1;
            }
            else {
                _this.y = canvasHeight - _this.h;
                accel = 0;
            }
        };
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.colour = colour;
    }
    return Actor;
}());
var accel = 0;
var p = new Actor();
var Update = function () {
    p.applyGravity();
    Draw();
    window.requestAnimationFrame(Update);
};
var Draw = function () {
    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);
    // const frametime = timestamp * 0.001 - start * 0.001;
    c.fillStyle = p.colour;
    c.fillRect(p.x, p.y, p.w, p.h);
};
Update();
