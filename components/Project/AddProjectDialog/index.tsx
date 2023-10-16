import { Dispatch, Fragment, SetStateAction, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import JoinByCode from "./JoinByCode";
import CreateProject from "./CreateProject";

const AppProjectDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [tab, setTab] = useState(0); // [0, 1]
  const cancelButtonRef = useRef(null);

  const notActiveTab =
    "py-4 flex justify-center items-center cursor-pointer hover:bg-mediumBlue hover:opacity-50 hover:text-white transition-all";
  const activeTab =
    "py-4 flex justify-center items-center cursor-pointer bg-mediumBlue text-white transition-all";

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-lg">
                <div className="bg-lightBlue text-mediumBlue font-medium w-full">
                  <div className="col columns-2 w-full text-center gap-0 border-b-2 border-mediumBlue">
                    <div
                      className={tab === 0 ? activeTab : notActiveTab}
                      onClick={() => setTab(0)}
                    >
                      Join Project
                    </div>
                    <div
                      className={tab === 1 ? activeTab : notActiveTab}
                      onClick={() => setTab(1)}
                    >
                      Create Project
                    </div>
                  </div>
                  {tab === 0 ? (
                    <JoinByCode setOpen={setOpen}></JoinByCode>
                  ) : (
                    <CreateProject setOpen={setOpen}></CreateProject>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AppProjectDialog;
