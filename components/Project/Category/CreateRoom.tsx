import { Dispatch, Fragment, SetStateAction, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "next/navigation";
import axios from "@/utils/axios";
import { useDispatch } from "react-redux";
import { updateProjects } from "@/store/serverSlice";

const CreateRoom = ({
  open,
  setOpen,
  categoriesId,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  categoriesId: string;
}) => {
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("text");
  const { id } = useParams() as { id: string };

  const submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const res = await axios.post(
      `/manageserver-service/createRoom/${id}`,
      { name, type, categoriesId },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (res) {
      dispatch(updateProjects(res.data));
      setOpen(false);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-50"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-50"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-md">
                <div className="bg-lightBlue text-mediumBlue font-medium w-full">
                  <div className="text-xl px-4 py-2">Create Room</div>
                  <hr />
                  <form onSubmit={submit}>
                    <div className="px-4">
                      <input
                        type="text"
                        placeholder="Category Name"
                        className="transition-all border border-lightBlue focus:border-mediumBlue focus:outline-none py-2 pl-4 pr-4 rounded-lg w-full mt-2"
                        onChange={(e) => setName(e.currentTarget.value)}
                      ></input>

                      <div className="flex flex-col w-full mt-2">
                        <label htmlFor="">Type</label>
                        <div className="flex gap-10 mt-1">
                          <div>
                            <input
                              id="text"
                              name="privacy"
                              type="radio"
                              className="peer/text mr-1"
                              value="text"
                              onClick={() => setType("text")}
                            ></input>
                            <label
                              htmlFor="text"
                              className="peer-checked/text:text-blue text-gray-500"
                            >
                              Text
                            </label>
                          </div>
                          <div>
                            <input
                              id="voice"
                              name="privacy"
                              type="radio"
                              className="peer/voice mr-1"
                              value="voice"
                              onClick={() => setType("voice")}
                            ></input>
                            <label
                              htmlFor="voice"
                              className="peer-checked/voice:text-blue text-gray-500"
                            >
                              Voice
                            </label>
                          </div>
                          <div>
                            <input
                              id="board"
                              name="privacy"
                              type="radio"
                              className="peer/board mr-1"
                              value="board"
                              onClick={() => setType("board")}
                            ></input>
                            <label
                              htmlFor="board"
                              className="peer-checked/board:text-blue text-gray-500"
                            >
                              Board
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 p-2 py-4">
                      <button
                        type="button"
                        className="text-sm text-mediumBlue hover:opacity-50 transition-all px-4"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="text-sm text-mediumBlue hover:opacity-50 transition-all px-4"
                      >
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateRoom;
