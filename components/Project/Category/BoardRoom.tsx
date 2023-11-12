import Room from "@/Class/Room";
import TableCellsIcon from "@heroicons/react/20/solid/esm/TableCellsIcon";
import { useRouter, useParams } from "next/navigation";

const BoardRoom = ({ room }: { room: Room }) => {
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
      <TableCellsIcon className="w-5 h-5"></TableCellsIcon>
      <span>{room.name}</span>
    </button>
  );
};

export default BoardRoom;
