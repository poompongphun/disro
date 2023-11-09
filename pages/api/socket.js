import { Server } from "socket.io";
const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server, {
      path: "/api/socket",
    });

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);
      socket.on("join_room", (roomId) => {
        socket.join(roomId);
        console.log(`user with id-${socket.id} joined room - ${roomId}`);
      });

      socket.on("send_msg", (data) => {
        // console.log(data, "DATA");
        //This will send a message to a specific room ID
        socket.to(data.roomId).emit("receive_msg", data);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;
