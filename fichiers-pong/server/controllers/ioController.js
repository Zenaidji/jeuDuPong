var pos = 0;
const maxplayers = 3.
export default class ioController {


    constructor(io) {
        this.io = io;
        this.clients = new Map();
    }



    registerssocket(socket) {
        pos += 1;
        if (pos < maxplayers) {
            this.clients.set(pos, socket.id);
            socket.on("Newhost", () => { console.log("new conextion") });
            socket.emit("confirmation");
            socket.on("start", () => { this.startGame(pos, socket); });
            socket.emit("pos", pos);
            this.moovsManger(socket);
            console.log(`welcome you are the ${pos} player`);
            socket.on('exit', () => { this.disconnect(socket); });
            socket.on('disconnect', () => { this.disconnect(socket); });

        } else {
            socket.emit("refused");
            socket.disconnect(true);
        }

    }


    disconnect(socket) {
        console.log(`${socket.id} disconnected`);
        this.io.emit("disconnected");
        this.io.disconnectSockets();
        this.clients.clear();
        pos = 0;
    }

    startGame(pos, socket) {
        if (pos < 2) {
            socket.emit("addPlayer");
        } else {

            this.io.emit("start");
        }
    }

    moovsManger(socket) {
        socket.on("Up", () => { socket.broadcast.emit("Up") });
        socket.on("Down", () => { socket.broadcast.emit("Down") });
        socket.on("stop", (y) => { socket.broadcast.emit("stop", y) });
        socket.on("restart", (y) => { socket.broadcast.emit("restart") });
        /* socket.on("collision", (shiftX, shiftY, x, y) => {
             console.log("recu");
             socket.broadcast.emit("collision", shiftX, shiftY);
         });
         */
    }













}