"use client";
import Project from "@/Class/Project";
import { useParams } from "next/navigation";
import mockData from "@/Class/mockData.json";
import Room from "@/Class/Room";
import ChatRoom from "@/components/Project/Room/ChatRoom";
import BoardRoom from "@/components/Project/Room/BoardRoom";
import { Socket, io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

const Room = () => {
  // MockData
  const { id, room: roomParam } = useParams() as { room: string; id: string };
  const { value: projects, loading } = useSelector(
    (state: RootState) => state.servers
  );
  const project: Project = projects.find(
    (project) => project._id === String(id)
  ) as Project;
  const AllRoom: Room[] = project.categories
    .map((category) => category.room)
    .flat();
  const currentRoom: Room = AllRoom.find(
    (room) => room._id === String(roomParam)
  ) as Room;
  console.log(currentRoom);

  const socketRef = useRef<Socket>();

  useEffect(() => {
    const handleJoin = () => {
      if (currentRoom._id !== "" && socketRef.current) {
        socketRef.current.emit("join_room", currentRoom._id);
      } else {
        alert("Room Id is not valid");
      }
    };

    socketRef.current = io("/", {
      path: "/api/socket",
    });
    console.log("connect");

    handleJoin();

    return () => {
      console.log("disconnect");
      // IDK WHY THIS DOESN'T WORK
      // if (socketRef.current && socketRef.current.active)
      //   socketRef.current.disconnect();
    };
  }, [currentRoom._id]);

  return currentRoom.type === "text" ? (
    <ChatRoom room={currentRoom} socket={socketRef}></ChatRoom>
  ) : (
    <BoardRoom room={currentRoom}></BoardRoom>
  );
};

export default Room;
