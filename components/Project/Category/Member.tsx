import MicrophoneIcon from "@heroicons/react/20/solid/esm/MicrophoneIcon";
import Image from "next/image";

const Member = () => {
  return (
    <button
      type="button"
      className="w-full flex justify-between items-center px-1 hover:bg-blue py-1 rounded-md transition-all"
    >
      <div className="flex items-center gap-1">
        <Image
          src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
          alt="avatar"
          width={20}
          height={20}
          className="rounded-full aspect-square object-cover"
        ></Image>
        <span className="text-sm">Member1</span>
      </div>
      <div>
        <MicrophoneIcon className="w-4 h-4"></MicrophoneIcon>
      </div>
    </button>
  );
};

export default Member;
