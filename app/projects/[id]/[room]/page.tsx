"use client";
import Project from "@/Class/Project";
import { useParams } from "next/navigation";
import mockData from "@/Class/mockData.json";
import Room from "@/Class/Room";
import ChatRoom from "@/components/Project/Room/ChatRoom";
import BoardRoom from "@/components/Project/Room/BoardRoom";

const Room = () => {
  // MockData
  const { id, room: roomParam } = useParams();
  const project: Project = mockData.find(
    (project) => project.id === Number(id)
  ) as Project;
  const AllRoom: Room[] = project.categories
    .map((category) => category.rooms)
    .flat();
  const currentRoom: Room = AllRoom.find(
    (room) => room.id === Number(roomParam)
  ) as Room;
  console.log(currentRoom);

  return currentRoom.type === "text" ? (
    <ChatRoom room={currentRoom}></ChatRoom>
  ) : (
    <BoardRoom room={currentRoom}></BoardRoom>
  );
};

export default Room;
