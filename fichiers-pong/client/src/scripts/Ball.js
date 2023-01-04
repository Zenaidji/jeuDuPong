import Mobile from './Mobile.js';


// default values for a Ball : image and shifts
const BALL_IMAGE_SRC = './images/balle24.png';
const SHIFT_X = 5;
const SHIFT_Y = 2;


/**
 * a Ball is a mobile with a ball as image and that bounces in a Game (inside the game's canvas)
 */

export default class Ball extends Mobile {


    /**  build a ball
     *
     * @param  {number} x       the x coordinate
     * @param  {number} y       the y coordinate
     * @param  {Game} theGame   the Game this ball belongs to
     */
    constructor(x, y, theGame) {
        super(x, y, BALL_IMAGE_SRC, SHIFT_X, SHIFT_Y);
        this.theGame = theGame;
        this.ballmooving = false;
    }


    /**
     * when moving a ball bounces inside the limit of its game's canvas
     */

    move() {
        if (this.ballmooving) {
            if (this.y <= 0 || (this.y + this.height >= this.theGame.canvas.height)) {
                this.shiftY = -this.shiftY; // rebond en haut ou en bas
            } else if (this.x < 0 || this.x + this.width >= this.theGame.canvas.width) {
                this.stopMoving();
                this.ballmooving = false;
                if (this.theGame.scored) {
                    this.score();
                    this.theGame.scored = false;
                }

            }
            super.move();
        }
    }



    /**update the score when the ball reaches the walls
     * 
     * 
     * 
     */
    score() {

        if (this.x <= 0) {
            document.getElementById("scoreleft").innerHTML = parseInt(document.getElementById("scoreleft").innerHTML) + 1;
        }

        if (this.x + this.width >= this.theGame.canvas.width) {
            document.getElementById("scoreright").innerHTML = parseInt(document.getElementById("scoreright").innerHTML) + 1;

        }
    }




    /**
     *  @param  {paddle} paddle  
     *  
     * detects a collision with the paddle*/
    collisionWith(paddle) {
        let x_p1 = Math.max(this.x, paddle.x);
        let y_p1 = Math.max(this.y, paddle.y);
        let x_p2 = Math.min(this.x + this.img.width, paddle.x + paddle.width);
        let y_p2 = Math.min(this.y + this.img.height, paddle.y + paddle.height);
        return (x_p1 <= x_p2 && y_p1 <= y_p2) ? true : false;
    }


    /**
     * @param  {paddle} paddle  
     * detect the point of impact update the movement steps */

    collision(paddle) {

            if (this.collisionWith(paddle)) {
                var n;
                var impact = Math.abs(this.y + this.height - paddle.y);

                if ((impact >= 0 && impact <= 8.6) || (impact >= 79.2 && impact <= 88)) {
                    n = 4;

                }
                if ((impact > 8, 6 && impact <= 17, 16) || (impact >= 70.4 && impact < 79.2)) {
                    n = 3;

                }
                if ((impact > 17.16 && impact <= 26.4) || (impact >= 61.6 && impact < 70.4)) {
                    n = 2;

                }
                if ((impact > 26.4 && impact <= 35.2) || (impact >= 52.8 && impact < 61.6)) {
                    n = 1;

                }
                if ((impact > 35.2 && impact <= 44) || (impact > 44 && impact <= 52.8)) {

                    n = 0;


                }
                this.shiftvalue(impact, n, paddle);

            }




        }
        /** 
         * @param {number} impact_y  point of impact
         * @param {number} shiftval  the new value of the shiftY
         * @param {number} paddle  the paddle
         * 
         * 
         * 
         * update the movement steps shiftX and shiftY*/

    shiftvalue(impact_y, shiftval, paddle) {
        const middle = paddle.height / 2;
        if (impact_y <= middle) {
            shiftval = -Math.abs(shiftval);
        }
        this.shiftY = shiftval;
        this.shiftX = -this.shiftX;
        this.theGame.socket.emit("collision", this.shiftX, this.shiftY);


    }





}