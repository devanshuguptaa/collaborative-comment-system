"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupWebSocket = setupWebSocket;
exports.getIO = getIO;
const socket_io_1 = require("socket.io");
const typingUsers = new Map();
let io = null;
function setupWebSocket(httpServer) {
    io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: 'http://localhost:3000',
            credentials: true,
        },
    });
    io.on('connection', (socket) => {
        const userId = socket.handshake.auth.userId;
        const userName = socket.handshake.auth.userName;
        if (!userId || !userName) {
            socket.disconnect();
            return;
        }
        console.log(`${userName} connected`);
        // Handle typing events
        socket.on('typing', (data) => {
            typingUsers.set(data.userId, data);
            socket.broadcast.emit('typing:update', Array.from(typingUsers.values()));
        });
        socket.on('stop-typing', (data) => {
            typingUsers.delete(data.userId);
            socket.broadcast.emit('typing:update', Array.from(typingUsers.values()));
        });
        // Handle comment creation
        socket.on('comment:created', (comment) => {
            socket.broadcast.emit('comment:created', comment);
        });
        // Handle disconnect
        socket.on('disconnect', () => {
            typingUsers.delete(userId);
            socket.broadcast.emit('typing:update', Array.from(typingUsers.values()));
            console.log(`${userName} disconnected`);
        });
    });
    return io;
}
function getIO() {
    if (!io)
        throw new Error('Socket.io not initialized');
    return io;
}
