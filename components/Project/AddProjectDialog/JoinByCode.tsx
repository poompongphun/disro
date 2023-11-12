import { Dispatch, SetStateAction, useState } from "react";
import { UsersIcon } from "@heroicons/react/24/outline";
import axios from "@/utils/axios";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { addProjects } from "@/store/serverSlice";

const JoinByCode = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const { data: session } = useSession();
  const user = session?.user as { _id: string; username: string };
  const join = async () => {
    const joinServer = await axios.post(
      `/manageserver-service/joinServer/${code}`,
      {
        userId: user._id,
        username: user.username,
        image: "https://cdn-icons-png.flaticon.com/512/147/147142.png",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (joinServer) {
      dispatch(addProjects(joinServer.data));
      setOpen(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-evenly items-center h-96 pb-10">
        <UsersIcon className=" w-28  h-28 mx-auto text-mediumBlue fill-mediumBlue" />
        <h1 className="text-3xl font-medium">Join by passcode Project</h1>
        <input
          type={"text"}
          className="transition-all border border-lightBlue focus:border-mediumBlue focus:outline-none py-2 pl-4 pr-4 rounded-lg w-full max-w-xs"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></input>
      </div>
      <div className="flex justify-end items-center gap-3 p-3">
        <button
          className="px-4 py-2 bg-darkBlue text-white rounded-md max-w-[130px] w-full hover:opacity-90"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-darkBlue text-white rounded-md max-w-[130px] w-full hover:opacity-90"
          onClick={join}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default JoinByCode;
