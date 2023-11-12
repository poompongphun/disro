"use client";
import Room from "@/Class/Room";
import HashtagIcon from "@heroicons/react/20/solid/esm/HashtagIcon";
import ArrowUpTrayIcon from "@heroicons/react/20/solid/esm/ArrowUpTrayIcon";
import ChatMessage from "@/components/Project/Room/ChatMessage";
import { MutableRefObject, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import axios from "@/utils/axios";
import { useSession } from "next-auth/react";
import User from "@/Class/User";

const messagesDB = [
  {
    user: {
      id: "1",
      username: "Member 1",
      image:
        "https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj",
    },
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusda",
  },
];

interface Message {
  roomId?: string;
  user: User;
  text: string;
  dateTime: Date;
}

const ChatRoom = ({
  room,
  socket,
}: {
  room: Room;
  socket: MutableRefObject<Socket | undefined>;
}) => {
  const { data: session } = useSession();
  const user = {
    ...session?.user,
    image: session?.user?.image
      ? session?.user?.image
      : "https://cdn-icons-png.flaticon.com/512/147/147142.png",
  } as User;
  const [currentMsg, setCurrentMsg] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentMsg !== "") {
      const msgData: Message = {
        roomId: room._id,
        user: user,
        text: currentMsg,
        dateTime: new Date(),
      };
      if (socket.current) {
        await axios.post(
          "/chat-service/chats",
          {
            roomId: room._id,
            ...user,
            text: currentMsg,
            dateTime: new Date(),
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        await socket.current.emit("send_msg", msgData);
      }
      setCurrentMsg("");
    }
  };

  useEffect(() => {
    const getChats = async () => {
      const res = await axios.get(`/chat-service/room/${room._id}`);
      console.log(res.data);

      if (res) {
        setMessages(res.data.reverse());
      }
    };
    getChats();
    console.log("receive_msg");
    const func = (data: Message) => {
      console.log("receive_msg work");
      setMessages((pre) => [data, ...pre]);
    };

    if (socket.current) socket.current.on("receive_msg", func);
    return () => {
      if (socket.current) {
        socket.current.off("receive_msg", func);
      }
    };
  }, []);

  return (
    <div className="h-full flex justify-between flex-col">
      <div>
        <div className="flex justify-start items-center p-2 gap-1">
          <HashtagIcon className="w-5 h-5"></HashtagIcon>
          <h1 className="text-xl">{room.name}</h1>
        </div>
        <hr />
      </div>
      <div
        className="flex flex-col-reverse gap-2 p-2 w-full overflow-y-auto no-scrollbar"
        style={{ height: "calc(100% - 108px)" }}
      >
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            user={message.user}
            text={message.text}
          ></ChatMessage>
        ))}
        <div className="w-full">
          <h1 className="text-2xl">
            Welcome to <span className="font-medium">#{room.name}</span>
          </h1>
          <h2>Start chatting now!</h2>
          <hr className="my-4" />
        </div>
      </div>
      <form className="p-2 relative" onSubmit={(e) => sendData(e)}>
        <button className="absolute top-5 left-6">
          <ArrowUpTrayIcon className="w-6 h-6"></ArrowUpTrayIcon>
        </button>
        <input
          className="h-12 pl-12 pr-4 rounded-full border-[1.5px] border-white bg-transparent w-full placeholder-slate-300 outline-none "
          placeholder={`Message  #${room.name}`}
          value={currentMsg}
          onChange={(e) => setCurrentMsg(e.target.value)}
        ></input>
      </form>
    </div>
  );
};

export default ChatRoom;
