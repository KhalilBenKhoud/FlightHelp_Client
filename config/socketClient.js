import ioClient from "socket.io-client";
const socketClient = ioClient(process.env.EXPO_PUBLIC_SOCKET_DEV_SERVER) ;
export default socketClient ;
