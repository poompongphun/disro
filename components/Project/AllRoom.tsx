import Cog6ToothIcon from "@heroicons/react/20/solid/esm/Cog6ToothIcon";
import Category from "./Category/Category";
import Image from "next/image";
import MicrophoneIcon from "@heroicons/react/20/solid/esm/MicrophoneIcon";
import SpeakerWaveIcon from "@heroicons/react/20/solid/esm/SpeakerWaveIcon";
import Project from "@/Class/Project";
import Link from "next/link";
import { useParams } from "next/navigation";
import PlusIcon from "@heroicons/react/20/solid/esm/PlusIcon";
import CreateCategory from "@/components/Project/Category/CreateCategory";
import { useState } from "react";
import { useSession } from "next-auth/react";

const AllRoom = ({ project }: { project: Project }) => {
  const { data: session } = useSession();
  const user = session?.user as { username: string; image: string } | undefined;
  const { id } = useParams() as { id: string };
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full relative flex flex-col">
      <div>
        <div className="flex justify-between items-center p-2">
          <h1 className="text-xl font-medium">{project.name}</h1>
          <Link href={`/projects/${id}/setting`}>
            <Cog6ToothIcon className="w-5 h-5"></Cog6ToothIcon>
          </Link>
        </div>
        <hr />
      </div>
      <div className="overflow-auto h-full no-scrollbar">
        <div className="px-2">
          <button
            className="flex justify-center items-center gap-1 mt-2 text-sm w-full text-black rounded-md py-1 bg-white "
            onClick={() => setOpen(true)}
          >
            <PlusIcon className="w-5 h-5"></PlusIcon>
            Create Category
          </button>
          <CreateCategory open={open} setOpen={setOpen} />
        </div>
        {project.categories.map((category, index) => (
          <Category key={index} category={category} />
        ))}
      </div>
      <div className=" h-14 bg-mediumBlue border-t flex justify-between items-center px-4">
        <div className="flex items-center gap-2">
          <Image
            src={user?.image ? user?.image : "https://cdn-icons-png.flaticon.com/512/147/147142.png"}
            alt="avatar"
            width={30}
            height={30}
            className="rounded-full aspect-square object-cover"
          ></Image>
          <span className="text-md">{user?.username}</span>
        </div>
        {/* <div className="flex justify-center items-center gap-2">
          <button type="button">
            <MicrophoneIcon className="w-5 h-5"></MicrophoneIcon>
          </button>
          <button type="button">
            <SpeakerWaveIcon className="w-5 h-5"></SpeakerWaveIcon>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default AllRoom;
