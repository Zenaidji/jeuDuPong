import Ball from './Ball.js';
import Paddle from './Paddle.js';



/**
 * a Game animates a ball bouncing in a canvas
 */


export default class Game {


    /**
     * build a Game
     *
     * @param  {Canvas} canvas the canvas of the game
     */

    constructor(canvas) {
        this.raf = null;
        this.canvas = canvas;
        this.ball = new Ball(this.canvas.width / 2, this.canvas.height / 2, this);
        this.paddle = new Paddle(this.canvas.width / 50, this.canvas.height / 2 - 40, 0, 8, this);
        this.paddle2 = new Paddle(this.canvas.width - 50, this.canvas.height / 2 - 40, 0, 8, this);
        this.socket = null;
        this.scored = true;
        this.pos = null;


    }



    /** start this game animation */
    start() {
            this.connect();
        }
        /** stop this game animation */
    stop() {
        this.disconnect();

    }

    /** animate the game : move and draw */
    animate() {
        this.moveAndDraw();
        this.raf = window.requestAnimationFrame(this.animate.bind(this));
    }


    /** returns player number*/
    getplayer(pos) {
        if (pos == 1) {

            console.log(pos);
            document.getElementById("player").innerHTML = 'First';

        } else if (pos == 2) {

            document.getElementById("player").innerHTML = 'second';
        }

    }


    connect() {
        this.socket = io();
        this.socket.emit('Newhost');
        this.socket.on("confirmation", () => { console.log("conexion established") });
        this.socket.emit("start");
        this.socket.on("addPlayer", () => { document.getElementById("status").innerHTML = "wiating for 2nd player"; })
        this.socket.on("start", () => {
            document.getElementById("status").innerHTML = "started";
            this.animate()
        })
        this.moovsHandler();

        this.socket.on("pos", (pos) => {
            this.getplayer(pos);
            this.pos = pos;
        })
        this.socket.on("refused", () => { document.getElementById("status").innerHTML = "limited number of players reached" });
        this.socket.on("disconnected", () => {
            document.getElementById("status").innerHTML = " game quited"
            window.cancelAnimationFrame(this.raf);
        });

    }

    disconnect() {
        this.socket.emit('exit')
    }

    /* sends the movement of the paddles*/
    moovsHandler() {
        this.socket.on("Up", () => { this.paddle2.moveUP() });
        this.socket.on("Down", () => { this.paddle2.moveDOWN() });
        this.socket.on("stop", y => {
            this.paddle2.stopMoving();
            this.paddle2.y = y;
        });
        this.socket.on("restart", () => { this.restart2() });
        this.socket.on("collision", (shiftX, shiftY) => this.ballsynchro(shiftX, shiftY));


    }











    /** move then draw the bouncing ball */
    moveAndDraw() {
        const ctxt = this.canvas.getContext("2d");
        ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ball.collision(this.paddle2);
        this.ball.collision(this.paddle);
        //draw and move the ball
        this.ball.move();
        this.ball.draw(ctxt);
        //draw and move the Paddle
        this.paddle.move();
        this.paddle.draw(ctxt);
        this.paddle2.move();
        this.paddle2.draw(ctxt);

    }





    // restarts the game when the ball reaches the edges



    restart() {
        if (!this.ball.ballmooving) {
            this.paddle.y = this.canvas.height / 2 - 40
            this.ball.shiftX = 5;
            this.ball.shiftY = 0;
            this.ball.x = this.paddle.x + 50;
            this.ball.y = this.paddle.y + this.paddle.height / 2;
            this.scored = true;
            this.ball.ballmooving = true;

        }
    }

    // restarts the game when the ball reaches the edges for the second client
    restart2() {
        if (!this.ball.ballmooving) {
            this.paddle2.y = this.canvas.height / 2 - 40
            this.ball.shiftX = -5;
            this.ball.shiftY = 0;
            this.ball.x = this.paddle2.x - 50;
            this.ball.y = this.paddle2.y + this.paddle2.height / 2;
            this.scored = true;
            this.ball.ballmooving = true;

        }
    }


    /*
    ballsynchro(shiftX, shiftY, x, y) {

        if (this.pos == 2) {
            this.ball.shiftX = shiftX;
            //this.ball.shiftY = shiftY;
        }


    }
    */




    /**manage the  key down actions */

    KeydownactionHandler(event) {
        switch (event.key) {
            case "ArrowUp":
            case "Up":
                this.paddle.moveUP();
                this.socket.emit("Up");
                break;
            case " ":
            case "spacebar":
                if (this.pos == 1) {
                    this.restart();
                    this.socket.emit("restart");
                }

                break;

            case "ArrowDown":
            case "Down":
                this.paddle.moveDOWN();
                this.socket.emit("Down");
                break;
            default:
                return;

        }
        event.preventDefault();

    }

    /**manage the  key up actions */

    keyUpActionHandler(event) {
        switch (event.key) {
            case "ArrowDown":
            case "Down":
            case "ArrowUp":
            case "Up":
                this.paddle.stopMoving();
                this.socket.emit("stop", this.paddle.y);


                break;
            default:
                return;
        }
        event.preventDefault();
    }










}