import User from "@/Class/User";
import MicrophoneIcon from "@heroicons/react/20/solid/esm/MicrophoneIcon";
import { PhoneXMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const Member = ({
  user,
  mic,
  toggleMic,
  leave,
  showAction
}: {
  user: User;
  mic: boolean;
  toggleMic: () => void;
  leave: () => void;
  showAction: boolean;
}) => {
  return (
    <button
      type="button"
      className="w-full flex justify-between items-center px-1 hover:bg-blue py-1 rounded-md transition-all"
    >
      <div className="flex items-center gap-1">
        <Image
          src={user.image}
          alt="avatar"
          width={20}
          height={20}
          className="rounded-full aspect-square object-cover"
        ></Image>
        <span className="text-sm max-w-[130px] overflow-hidden">
          {user.username}
        </span>
      </div>
      {
        showAction && <div className="flex gap-1 absolute right-2">
          <MicrophoneIcon
            className={`w-4 h-4 ${mic ? "" : "text-red-600"}`}
            onClick={toggleMic}
          ></MicrophoneIcon>
          <PhoneXMarkIcon className="w-4 h-4" onClick={leave}></PhoneXMarkIcon>
        </div>
      }
    </button>
  );
};

export default Member;
