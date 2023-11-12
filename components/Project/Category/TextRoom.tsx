import Room from "@/Class/Room";
import HashtagIcon from "@heroicons/react/20/solid/esm/HashtagIcon";
import { useRouter, useParams } from "next/navigation";

const TextRoom = ({ room }: { room: Room }) => {
  const router = useRouter();
  const { room: roomParam, id } = useParams() as { room: string; id: string };

  return (
    <button
      className={`pl-6 w-full flex items-center gap-1 py-2 rounded-md transition-all hover:bg-blue ${
        `${room._id}` === roomParam ? "bg-blue" : ""
      }`}
      onClick={() => {
        router.push(`/projects/${id}/${room._id}`);
      }}
    >
      <HashtagIcon className="w-5 h-5"></HashtagIcon>
      <span>{room.name}</span>
    </button>
  );
};

export default TextRoom;
