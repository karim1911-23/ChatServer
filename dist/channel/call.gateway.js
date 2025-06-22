"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let CallGateway = class CallGateway {
    constructor() {
        this.userSocketMap = new Map();
    }
    handleJoin(userId, client) {
        this.userSocketMap.set(userId, client.id);
        client.join(userId);
        console.log(`User ${userId} joined with socket ${client.id}`);
    }
    handleCallUser(data, client) {
        console.log(`Call from ${data.from} to ${data.to}, type: ${data.type}`);
        const targetSocketId = this.userSocketMap.get(data.to);
        if (targetSocketId) {
            console.log(`Found target socket: ${targetSocketId}`);
        }
        else {
            console.log(`Target user ${data.to} not found in socket map`);
        }
        this.server.to(data.to).emit('incoming-call', {
            from: data.from,
            signal: data.signal,
            type: data.type,
            callerName: data.callerName,
            callerImage: data.callerImage
        });
    }
    handleAnswerCall(data, client) {
        console.log(`Call answered by ${client.id} to ${data.to}`);
        this.server.to(data.to).emit('call-answered', {
            signal: data.signal
        });
    }
    handleRejectCall(data, client) {
        console.log(`Call rejected by ${client.id} to ${data.to}`);
        this.server.to(data.to).emit('call-rejected');
    }
    handleEndCall(data, client) {
        console.log(`Call ended by ${client.id} to ${data.to}`);
        this.server.to(data.to).emit('call-ended');
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], CallGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], CallGateway.prototype, "handleJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('call-user'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], CallGateway.prototype, "handleCallUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('answer-call'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], CallGateway.prototype, "handleAnswerCall", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('reject-call'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], CallGateway.prototype, "handleRejectCall", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('end-call'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], CallGateway.prototype, "handleEndCall", null);
CallGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true })
], CallGateway);
exports.CallGateway = CallGateway;
//# sourceMappingURL=call.gateway.js.map