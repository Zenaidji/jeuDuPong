import http from 'http';
import RequestController from './controllers/requestController.js';
import ioController from './controllers/ioController.js';
import { Server as ServerIO } from 'socket.io';

const server = http.createServer(
    (request, response) => new RequestController(request, response).handleRequest()
);

const io = new ServerIO(server);
io.on("connection", (socket) => new ioController(io).registerssocket(socket));

server.listen(8080);