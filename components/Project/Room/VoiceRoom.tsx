import SpeakerWaveIcon from "@heroicons/react/20/solid/esm/SpeakerWaveIcon";
import Member from "./Member";
import Room from "@/Class/Room";

const VoiceRoom = ({ room }: { room: Room }) => {
  return (
    <div>
      <button
        type="button"
        className="pl-6 w-full flex items-center gap-1 hover:bg-blue py-2 rounded-md transition-all"
      >
        <SpeakerWaveIcon className="w-5 h-5"></SpeakerWaveIcon>
        <span>{room.name}</span>
      </button>
      <div className="pl-11">
        <Member />
      </div>
    </div>
  );
};

export default VoiceRoom;
