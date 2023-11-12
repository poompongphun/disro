import { Dispatch, Fragment, SetStateAction, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "next/navigation";
import axios from "@/utils/axios";
import { useDispatch } from "react-redux";
import { updateProjects } from "@/store/serverSlice";

const CreateCategory = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);
  const [name, setName] = useState("");
  const { id } = useParams() as { id: string };

  const submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const res = await axios.post(
      `/manageserver-service/createCategories/${id}`,
      { name },
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
                  <div className="text-xl px-4 py-2">Create Category</div>
                  <hr />
                  <form onSubmit={submit}>
                    <div className="px-4">
                      <input
                        type="text"
                        placeholder="Category Name"
                        className="transition-all border border-lightBlue focus:border-mediumBlue focus:outline-none py-2 pl-4 pr-4 rounded-lg w-full mt-2"
                        onChange={(e) => setName(e.currentTarget.value)}
                      ></input>
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

export default CreateCategory;
