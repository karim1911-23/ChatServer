import { Server, Socket } from 'socket.io';
export declare class CallGateway {
    server: Server;
    private userSocketMap;
    handleJoin(userId: string, client: Socket): void;
    handleCallUser(data: {
        to: string;
        from: string;
        signal: any;
        type: 'video' | 'audio';
        callerName?: string;
        callerImage?: string;
    }, client: Socket): void;
    handleAnswerCall(data: {
        to: string;
        signal: any;
    }, client: Socket): void;
    handleRejectCall(data: {
        to: string;
    }, client: Socket): void;
    handleEndCall(data: {
        to: string;
    }, client: Socket): void;
}
