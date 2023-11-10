import { Server } from "socket.io";
const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
    return res.end();
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

      socket.on("join", (roomName) => {
        const { rooms } = io.sockets.adapter;
        const room = rooms.get(roomName);

        // room == undefined when no such room exists.
        if (room === undefined) {
          socket.join(roomName);
          socket.emit("created");
        } else if (room.size === 1) {
          // room.size == 1 when one person is inside the room.
          socket.join(roomName);
          socket.emit("joined");
        } else {
          // when there are already two people inside the room.
          socket.emit("full");
        }
        console.log(rooms);
      });

      // Triggered when the person who joined the room is ready to communicate.
      socket.on("ready", (roomName) => {
        socket.broadcast.to(roomName).emit("ready"); // Informs the other peer in the room.
      });

      // Triggered when server gets an icecandidate from a peer in the room.
      socket.on(
        "ice-candidate",
        (candidate: RTCIceCandidate, roomName: string) => {
          console.log(candidate);
          socket.broadcast.to(roomName).emit("ice-candidate", candidate); // Sends Candidate to the other peer in the room.
        }
      );

      // Triggered when server gets an offer from a peer in the room.
      socket.on("offer", (offer, roomName) => {
        socket.broadcast.to(roomName).emit("offer", offer); // Sends Offer to the other peer in the room.
      });

      // Triggered when server gets an answer from a peer in the room.
      socket.on("answer", (answer, roomName) => {
        socket.broadcast.to(roomName).emit("answer", answer); // Sends Answer to the other peer in the room.
      });

      socket.on("leave", (roomName) => {
        socket.leave(roomName);
        socket.broadcast.to(roomName).emit("leave");
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;
