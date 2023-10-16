import Room from "@/Class/Room";
import HashtagIcon from "@heroicons/react/20/solid/esm/HashtagIcon";
import TableCellsIcon from "@heroicons/react/20/solid/esm/TableCellsIcon";
import ArrowUpTrayIcon from "@heroicons/react/20/solid/esm/ArrowUpTrayIcon";
import ChatMessage from "@/components/Project/Room/ChatMessage";

const ChatRoom = ({ room }: { room: Room }) => {
  return (
    <div className="h-full flex justify-between flex-col">
      <div>
        <div className="flex justify-start items-center p-2 gap-1">
          {room.type === "text" ? (
            <HashtagIcon className="w-5 h-5"></HashtagIcon>
          ) : (
            <TableCellsIcon className="w-5 h-5"></TableCellsIcon>
          )}

          <h1 className="text-xl">{room.name}</h1>
        </div>
        <hr />
      </div>
      <div
        className="flex flex-col-reverse gap-2 p-2 w-full overflow-y-auto no-scrollbar"
        style={{ height: "calc(100% - 108px)" }}
      >
        {"11111111111111".split("").map((_, index) => (
          <ChatMessage
            key={index}
            user={{
              id: 1,
              username: "Member 1",
              image:
                "https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj",
            }}
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdamssssssssssssssssssssssssssssssssssssssss."
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
      <div className="p-2 relative">
        <button className="absolute top-5 left-6">
          <ArrowUpTrayIcon className="w-6 h-6"></ArrowUpTrayIcon>
        </button>
        <input
          className="h-12 pl-12 pr-4 rounded-full border-[1.5px] border-white bg-transparent w-full placeholder-slate-300 outline-none "
          placeholder={`Message  #${room.name}`}
        ></input>
      </div>
    </div>
  );
};

export default ChatRoom;
