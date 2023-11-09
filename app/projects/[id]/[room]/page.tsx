"use client";
import Project from "@/Class/Project";
import { useParams } from "next/navigation";
import mockData from "@/Class/mockData.json";
import Room from "@/Class/Room";
import ChatRoom from "@/components/Project/Room/ChatRoom";
import BoardRoom from "@/components/Project/Room/BoardRoom";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const Room = () => {
  // MockData
  const { id, room: roomParam } = useParams();
  const project: Project = mockData.find(
    (project) => project.id === String(id)
  ) as Project;
  const AllRoom: Room[] = project.categories
    .map((category) => category.rooms)
    .flat();
  const currentRoom: Room = AllRoom.find(
    (room) => room.id === String(roomParam)
  ) as Room;
  console.log(currentRoom);

  const [showChat, setShowChat] = useState(false);

  var socket: any;
  socket = io("http://localhost:3001");

  const handleJoin = () => {
    if (currentRoom.id !== "") {
      socket.emit("join_room", currentRoom.id);
      setShowChat(true);
    } else {
      alert("Room Id is not valid");
    }
  };

  useEffect(() => {
    handleJoin();
  }, []);

  return currentRoom.type === "text" ? (
    <ChatRoom room={currentRoom} socket={socket}></ChatRoom>
  ) : (
    <BoardRoom room={currentRoom}></BoardRoom>
  );
};

export default Room;
