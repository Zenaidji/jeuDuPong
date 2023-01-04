import mobile from "./Mobile"
const PADDLE_IMG = './images/paddle.png';

const MoveState = { NONE: 1, UP: 2, DOWN: 3 };
export default class Paddle extends mobile {
    constructor(x, y, shiftX, shiftY, Game) {
        super(x, y, PADDLE_IMG, shiftX, shiftY);
        this.mooving = MoveState.NONE;
        this.Game = Game;
    }


    moveUP() {
        this.mooving = MoveState.UP;
        this.shiftY = -Math.abs(this.shiftY);
    }
    moveDOWN() {
        this.mooving = MoveState.DOWN;
        this.shiftY = +Math.abs(this.shiftY);

    }


    move() {
        if ((this.mooving == MoveState.UP)) {
            this.y = Math.max(0, this.y + this.shiftY);


        }
        if (this.mooving == MoveState.DOWN) {
            this.y = Math.min(this.Game.canvas.height - this.img.height, this.y + this.shiftY);
        }
    }


    stopMoving() {
        this.mooving = MoveState.NONE;

    }














}