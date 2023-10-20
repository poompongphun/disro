import Cog6ToothIcon from "@heroicons/react/20/solid/esm/Cog6ToothIcon";
import Category from "./Category/Category";
import Image from "next/image";
import MicrophoneIcon from "@heroicons/react/20/solid/esm/MicrophoneIcon";
import SpeakerWaveIcon from "@heroicons/react/20/solid/esm/SpeakerWaveIcon";
import Project from "@/Class/Project";
import Link from "next/link";

const AllRoom = ({ project }: { project: Project }) => {
  return (
    <div className="h-full relative flex flex-col">
      <div>
        <div className="flex justify-between items-center p-2">
          <h1 className="text-xl font-medium">{project.name}</h1>
          <Link href={`/setting`}>
            <Cog6ToothIcon className="w-5 h-5"></Cog6ToothIcon>
          </Link>
        </div>
        <hr />
      </div>
      <div className="overflow-auto h-full no-scrollbar">
        {project.categories.map((category, index) => (
          <Category key={index} category={category} />
        ))}
      </div>
      <div className=" h-14 bg-mediumBlue border-t flex justify-between items-center px-4">
        <div className="flex items-center gap-2">
          <Image
            src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
            alt="avatar"
            width={30}
            height={30}
            className="rounded-full aspect-square object-cover"
          ></Image>
          <span className="text-md">Member1</span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <button type="button">
            <MicrophoneIcon className="w-5 h-5"></MicrophoneIcon>
          </button>
          <button type="button">
            <SpeakerWaveIcon className="w-5 h-5"></SpeakerWaveIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllRoom;
