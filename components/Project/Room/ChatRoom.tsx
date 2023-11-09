"use client";
import Room from "@/Class/Room";
import HashtagIcon from "@heroicons/react/20/solid/esm/HashtagIcon";
import ArrowUpTrayIcon from "@heroicons/react/20/solid/esm/ArrowUpTrayIcon";
import ChatMessage from "@/components/Project/Room/ChatMessage";
import { useEffect, useState } from "react";

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
  user: {
    id: string;
    username: string;
    image: string;
  };
  text: string;
}

const ChatRoom = ({ room, socket }: { room: Room; socket: any }) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const [messages, setMessages] = useState<Message[]>(messagesDB);

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentMsg !== "") {
      const msgData: Message = {
        roomId: room.id,
        user: {
          id: "1",
          username: "Member 1",
          image:
            "https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj",
        },
        text: currentMsg,
      };
      await socket.emit("send_msg", msgData);
      setCurrentMsg("");
    }
  };

  useEffect(() => {
    console.log("receive_msg");
    const func = (data: Message) => {
      console.log("receive_msg work");
      setMessages((pre) => [data, ...pre]);
    };

    socket.on("receive_msg", func);
    return () => {
      socket.off("receive_msg", func);
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
