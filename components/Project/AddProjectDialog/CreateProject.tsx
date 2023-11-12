import { Dispatch, SetStateAction, useState } from "react";
import axios from "@/utils/axios";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { addProjects } from "@/store/serverSlice";
import { AppDispatch } from "@/app/store";

const CreateProject = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const user = session?.user as { _id: string; username: string };
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const create = async () => {
    const createProject = await axios.post(
      "/manageserver-service/createServer",
      {
        name: teamName,
        description: description,
        userId: user._id,
        username: user.username,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (createProject) {
      dispatch(addProjects(createProject.data));
      setOpen(false);
    }
  };
  return (
    <div>
      <div className="pt-5 pb-12">
        <h1 className="text-3xl font-medium text-center py-5">
          Create your Project
        </h1>
        <div className=" max-w-sm mx-auto flex flex-col gap-2">
          <div className="flex flex-col w-full">
            <label htmlFor="">Team name</label>
            <input
              type="text"
              className="transition-all border border-lightBlue focus:border-mediumBlue focus:outline-none py-2 pl-4 pr-4 rounded-lg w-full"
              onChange={(e) => setTeamName(e.currentTarget.value)}
            ></input>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="">Descriptions</label>
            <input
              type="text"
              className="transition-all border border-lightBlue focus:border-mediumBlue focus:outline-none py-2 pl-4 pr-4 rounded-lg w-full"
              onChange={(e) => setDescription(e.currentTarget.value)}
            ></input>
          </div>
          {/* <div className="flex flex-col w-full">
            <label htmlFor="">Privacy</label>
            <div className="flex gap-10 mt-1">
              <div>
                <input
                  id="private"
                  name="privacy"
                  type="radio"
                  className="peer/private mr-1"
                  value="private"

                ></input>
                <label
                  htmlFor="private"
                  className="peer-checked/private:text-blue text-gray-500"
                >
                  Private
                </label>
              </div>
              <div>
                <input
                  id="public"
                  name="privacy"
                  type="radio"
                  className="peer/public mr-1"
                  value="public"
                ></input>
                <label
                  htmlFor="public"
                  className="peer-checked/public:text-blue text-gray-500"
                >
                  Public
                </label>
              </div>
            </div>
          </div> */}
        </div>
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
          onClick={create}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateProject;
