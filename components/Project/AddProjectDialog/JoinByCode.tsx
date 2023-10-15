import { Dispatch, SetStateAction } from "react";
import { UsersIcon } from "@heroicons/react/24/outline";

const JoinByCode = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <div className="flex flex-col justify-evenly items-center h-96 pb-10">
        <UsersIcon className=" w-28  h-28 mx-auto text-mediumBlue fill-mediumBlue" />
        <h1 className="text-3xl font-medium">Join by passcode Project</h1>
        <input
          type={"text"}
          className="transition-all border border-lightBlue focus:border-mediumBlue focus:outline-none py-2 pl-4 pr-4 rounded-lg w-full max-w-xs"
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
          onClick={() => setOpen(false)}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default JoinByCode;
