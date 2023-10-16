import Room from "@/Class/Room";
import HashtagIcon from "@heroicons/react/20/solid/esm/HashtagIcon";

const TextRoom = ({ room }: { room: Room }) => (
  <>
    <button className="pl-6 w-full flex items-center gap-1 hover:bg-blue py-2 rounded-md transition-all">
      <HashtagIcon className="w-5 h-5"></HashtagIcon>
      <span>{room.name}</span>
    </button>
  </>
);

export default TextRoom;
