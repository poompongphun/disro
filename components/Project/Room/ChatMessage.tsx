import User from "@/Class/User";
import Image from "next/image";

const ChatMessage = ({ user, text }: { user: User; text: string }) => {
  return (
    <div className="flex justify-start items-start gap-2">
      <div>
        <Image
          src={
            user.image
              ? user.image
              : "https://cdn-icons-png.flaticon.com/512/147/147142.png"
          }
          alt="Profile Picture"
          width={35}
          height={35}
          className="w-full h-full rounded-full aspect-square object-cover"
        ></Image>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-start items-center gap-1">
          <span className="text-md font-medium">{user.username}</span>
          <span className="text-xs text-gray-300 ml-1">12:00</span>
        </div>
        <div>{text}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
