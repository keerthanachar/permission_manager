import { Socket } from "socket.io-client";

export interface ChatProps {
    socket: Socket;
    item?: any;
    joinRoom?: any;
    ref?: any;
    storedState?: any;
}
