import Room from "@/Class/Room";
import TableCellsIcon from "@heroicons/react/20/solid/esm/TableCellsIcon";

const BoardRoom = ({ room }: { room: Room }) => {
  return (
    <div className="h-full flex justify-between flex-col">
      <div>
        <div className="flex justify-start items-center p-2 gap-1">
          <TableCellsIcon className="w-5 h-5"></TableCellsIcon>

          <h1 className="text-xl">{room.name}</h1>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default BoardRoom;
