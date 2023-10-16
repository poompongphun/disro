import Room from "@/Class/Room";
import TableCellsIcon from "@heroicons/react/20/solid/esm/TableCellsIcon";

const BoardRoom = ({ room }: { room: Room }) => (
  <>
    <button className="pl-6 w-full flex items-center gap-1 hover:bg-blue py-2 rounded-md transition-all">
      <TableCellsIcon className="w-5 h-5"></TableCellsIcon>
      <span>{room.name}</span>
    </button>
  </>
);

export default BoardRoom;
