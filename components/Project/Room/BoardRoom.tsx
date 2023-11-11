import Room from "@/Class/Room";
import TableCellsIcon from "@heroicons/react/20/solid/esm/TableCellsIcon";
import { PlusCircleIcon, XMarkIcon, EllipsisHorizontalIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import React, {useEffect} from "react";
import { list } from "postcss";

const BoardRoom = ({ room }: { room: Room }) => {

  // data test 
  const data = [
    { 
      
      category: 'SOP', 
      items: [
        { id: 'SOP_1', hText: 'final1', description: 'bra ba ba na na na na po ta to bra' }, 
        { id: 'SOP_2', hText: 'final2', description: 'bra ba ba na na na na' }, 
        { id: 'SOP_3', hText: 'final1', description: 'bra ba ba na na na na po ta to bra' }, 
        { id: 'SOP_4', hText: 'final2', description: 'bra ba ba na na na na' }
      ] 
    },
    { 
      category: 'MDP', 
      items: [
        { id: 'MDP_1', hText: 'final1', description: 'des1' }, 
        { id: 'MDP_2', hText: 'final2', description: 'des2' }
      ] 
    },
    { category: 'HID', items: [] },
    { category: 'RE', items: [] },
    { category: 'IT LAW', items: [] },
    { category: 'Top secret', items: [] },
    { category: 'housework', items: [] },
  ];

  // Board
  // Create Board
  const [isOpenCreateBoard, setOpenCreateBoard] = useState(false);
  function openCreateBoard() {
    setOpenCreateBoard(true);
  }
  function closeCreateBoard() {
    setOpenCreateBoard(false);
  }

  // Add/Delete Board
  const [ellipsisStates, setEllipsisStates] = useState(Array(data.length).fill(false));
  const handleEllipsisClick = (dataindex: number, popupId: String) => {
    setPopupId(String(popupId));
    
    setEllipsisStates((prevStates) => {
      const newStates = prevStates.map((state, i) => (i === dataindex ? !state : false));
      return newStates;
    });
  };
  // click 'create' or 'cancle' ให้ ellipsisStates เป็น false ทั้งหมด
  const handleResetEllipsisStates = () => {
    setEllipsisStates(Array(data.length).fill(false));
  };

  // Add List in Board
  const [isOpenAddListBoard, setOpenAddListBoard] = useState(false);
  const openAddListBoard = (index: number) => {
    setOpenAddListBoard(true);
  }
  function closeAddListBoard() {
    setOpenAddListBoard(false);
  }

  //List in Board
  // Edit/Delete List in board
  const [selectedListIndices, setSelectedListIndices] = useState<{ [key: number]: number[] }>({});

  // Edit List in Board
  const [isOpenEditListBoard, setOpenEditListBoard] = useState(false);
  const openEditListBoard = (index: number) => {
    setOpenEditListBoard(true);
  }
  function closeEditListBoard() {
    setOpenEditListBoard(false);
  }
  const [popupId, setPopupId] = useState<string>("");
  const handleEllipsisListClick = (dataIndex: number, listIndex: number, itemId: String) => {
    setSelectedListIndices((prevIndices) => {
      const isSelected = (prevIndices[dataIndex] || []).includes(listIndex);
      setPopupId(String(itemId));
      if (isSelected) {
        // ถ้าคลิกตัวที่ถูกเลือกแล้ว ให้เซ็ตให้เป็น false
        const updatedIndices = { ...prevIndices };
        updatedIndices[dataIndex] = [];
        return updatedIndices;
      } else {
        // ถ้าคลิก List ใหม่
        const updatedIndices = { ...prevIndices };
        updatedIndices[dataIndex] = [listIndex];
        return updatedIndices;
      }
    });
  };
  useEffect(() => {
    // This block will run after each render, 
    // but only if the value of popupId has changed
    console.log('Popup ID has been set:', popupId);
  }, [popupId]);
  return (
    <div className="h-full flex flex-col">
      <div>
        <div className="flex justify-start items-center p-2 gap-1">
          <TableCellsIcon className="w-5 h-5"></TableCellsIcon>

          <h1 className="text-xl">{room.name}</h1>
        </div>
        <hr />
      </div>
      <button className="p-2 flex flex-row" onClick={openCreateBoard}>
        <PlusCircleIcon className="w-6 h-6"></PlusCircleIcon>
        <h1 className="pl-2" style={{ fontSize: 20 }}>Create Board</h1>
      </button>
      <div className="flex flex-wrap gap-2 p-4 w-full overflow-y-auto no-scrollbar">
        {data.map((item, dataIndex) => (
          <div
            key={dataIndex}
            style={{
              background: 'white',
              borderRadius: 8,
              padding: 25,
              width: 250,
              height: 'auto',
              position: 'relative', 
            }}
          >
            <div className="flex flex-row" >
              <label style={{ color: '#1f4172', fontWeight: 'bold', fontSize: 20, maxWidth: '13ch', wordWrap: 'break-word', marginBottom: 10 }} >{item.category}</label>
              <button className="ml-auto" onClick={() => handleEllipsisClick(dataIndex, item.category)}>
                <EllipsisHorizontalIcon className="w-6 h-6 text-blue"></EllipsisHorizontalIcon>
              </button>
            </div>
            {/* Show or Not Show : add/delete */}
            {
              item.category === popupId &&
              (<div style={{ display: ellipsisStates[dataIndex] ? 'block' : 'none', background: '#9CB8DD', height: 80, width: 80, borderRadius: 10, marginLeft: 150, position: 'absolute', zIndex: 2 }}>
              <button onClick={() => openAddListBoard(dataIndex)} style={{ color: '#30B103' }} className="h-10 w-20 flex flex-row items-center justify-center"><PlusCircleIcon className="w-5 h-5"></PlusCircleIcon>Add</button>
              <button onClick={() => {
                console.log("delete" + dataIndex);
                setEllipsisStates(prevStates => {
                  const newStates = [...prevStates];
                  newStates[dataIndex] = false;
                  return newStates;
                });
              }} style={{ color: '#FF2D2D' }} className="h-10 w-20 flex flex-row items-center justify-center"><TrashIcon className="w-5 h-5"></TrashIcon>Delete</button>
              </div>)
            }
            
            {/* List Board */}
            <div>
              {item.items.map((item, listIndex) => (
                <div key={listIndex} style={{ background: '#CAD8ED', height: 150, borderRadius: 10, marginTop: 10 }} className="w-full">
                  <div className="flex flex-row">
                    <h1 style={{ color: 'darkblue', fontWeight: 'bold', marginLeft: 15, marginRight: 15, fontSize: 18, paddingTop: 10, wordWrap: 'break-word', lineHeight: '1' }}>{item.hText}</h1>
                    <button className="ml-auto" onClick={() => handleEllipsisListClick(dataIndex, listIndex, item.id)}>
                      <EllipsisHorizontalIcon className="w-6 h-6 text-blue mr-2" style={{ zIndex: 2 }}></EllipsisHorizontalIcon>
                    </button>
                    {/* Show or Not Show : Member/Edit/Delete */}
                    {(selectedListIndices[dataIndex] || []).includes(listIndex) && (popupId === item.id) &&
                      <div style={{ background: '#9CB8DD', height: 100, width: 90, borderRadius: 10, marginLeft: 150, position: 'absolute', marginTop: 20,zIndex: 1}}>
                        <div className="flex items-center justify-center text-black">Member1</div>
                        <button onClick={() => openEditListBoard(listIndex)} style={{ color: '#2645B1' }} className="h-10 w-20 flex flex-row items-center justify-center"><PencilIcon className="w-5 h-5"></PencilIcon>Edit</button>
                        <button onClick={() => {
                          console.log("delete" + dataIndex + ">" + listIndex);
                          // setEllipsisStates(prevStates => {
                          //   const newStates = [...prevStates];
                          //   newStates[dataIndex] = false;
                          //   return newStates;
                          // });
                        }} style={{ color: '#FF2D2D' }} className="h-10 w-20 flex flex-row items-center justify-center"><TrashIcon className="w-5 h-5"></TrashIcon>Delete</button>
                      </div>}
                  </div>
                  <div style={{ color: 'darkblue', marginLeft: 15, marginRight: 15, marginTop: 10, wordWrap: 'break-word', lineHeight: '1' }}> {item.description}</div>

                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* dialog Create Board */}
      <Transition show={isOpenCreateBoard} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeCreateBoard}
        >
          <div className="min-h-screen flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300 transform"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="ease-in duration-200 transform"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <div className="bg-white rounded-lg shadow-md w-96 p-4">
                <div className="flex flex-row">
                  <Dialog.Title className="text-xl font-bold text-blue">Create Board</Dialog.Title>
                  <button className="ml-auto" onClick={() => setOpenCreateBoard(false)}>
                    <XMarkIcon className="w-6 h-6 text-blue"></XMarkIcon>
                  </button>
                </div>
                <div className="flex flex-col w-full text-blue">
                  <label htmlFor="">Board name</label>
                  <input
                    type="text"
                    className="transition-all border border-lightBlue focus:border-mediumBlue focus:outline-none py-2 pl-4 pr-4 rounded-lg w-full"
                  ></input>
                </div>
                <div className="flex justify-end items-center gap-1 pt-2">
                  <button
                    className="py-1 text-blue rounded-md max-w-[80px] w-full hover:opacity-90"
                    onClick={() => setOpenCreateBoard(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="py-1 bg-darkBlue text-white rounded-md max-w-[130px] w-full hover:opacity-90"
                    onClick={() => setOpenCreateBoard(false)}
                  >
                    Create Board
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* dialog Add List Board */}
      <Transition show={isOpenAddListBoard} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeAddListBoard}
        >
          <div className="min-h-screen flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300 transform"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="ease-in duration-200 transform"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <div className="bg-white rounded-lg shadow-md w-96 p-4">
                <div className="flex flex-row">
                  <Dialog.Title className="text-xl font-bold text-blue">Add list</Dialog.Title>
                  <button className="ml-auto" onClick={() => { setOpenAddListBoard(false); handleResetEllipsisStates(); }}>
                    <XMarkIcon className="w-6 h-6 text-blue"></XMarkIcon>
                  </button>
                </div>
                <div className="flex flex-col w-full text-blue">
                  <label htmlFor="">List name</label>
                  <input
                    type="text"
                    placeholder="List name"
                    className="transition-all border border-lightBlue focus:border-mediumBlue focus:outline-none py-2 pl-4 pr-4 rounded-lg w-full"
                  ></input>
                </div>
                <div className="flex flex-col w-full text-blue mt-5">
                  <label htmlFor="">Description</label>
                  <textarea
                    placeholder="Description"
                    className="transition-all border border-lightBlue focus:border-mediumBlue focus:outline-none py-2 pl-4 pr-4 rounded-lg w-full"
                  ></textarea>
                </div>
                {/* ooo */}
                <menu>55</menu>
                <div className="flex justify-end items-center gap-1 pt-2">
                  <button
                    className="py-1 text-blue rounded-md max-w-[80px] w-full hover:opacity-90"
                    onClick={() => { setOpenAddListBoard(false); handleResetEllipsisStates(); }}
                  >
                    Cancel
                  </button>
                  <button
                    className="py-1 bg-darkBlue text-white rounded-md max-w-[130px] w-full hover:opacity-90"
                    onClick={() => { setOpenAddListBoard(false); handleResetEllipsisStates(); }}
                  >
                    Add List
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* dialog Edit List Board */}
      <Transition show={isOpenEditListBoard} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeEditListBoard}
        >
          <div className="min-h-screen flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300 transform"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="ease-in duration-200 transform"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <div className="bg-white rounded-lg shadow-md w-96 p-4">
                <div className="flex flex-row">
                  <Dialog.Title className="text-xl font-bold text-blue">Edit list</Dialog.Title>
                  <button className="ml-auto" onClick={() => { setOpenEditListBoard(false); }}>
                    <XMarkIcon className="w-6 h-6 text-blue"></XMarkIcon>
                  </button>
                </div>
                <div className="flex flex-col w-full text-blue">
                  <label htmlFor="">List name</label>
                  <input
                    type="text"
                    placeholder="List name"
                    className="transition-all border border-lightBlue focus:border-mediumBlue focus:outline-none py-2 pl-4 pr-4 rounded-lg w-full"
                  ></input>
                </div>
                <div className="flex flex-col w-full text-blue mt-5">
                  <label htmlFor="">Description</label>
                  <textarea
                    placeholder="Description"
                    className="transition-all border border-lightBlue focus:border-mediumBlue focus:outline-none py-2 pl-4 pr-4 rounded-lg w-full"
                  ></textarea>
                </div>
                {/* ooo */}
                <menu>55</menu>
                <div className="flex justify-end items-center gap-1 pt-2">
                  <button
                    className="py-1 text-blue rounded-md max-w-[80px] w-full hover:opacity-90"
                    onClick={() => { setOpenEditListBoard(false); }}
                  >
                    Cancel
                  </button>
                  <button
                    className="py-1 bg-darkBlue text-white rounded-md max-w-[130px] w-full hover:opacity-90"
                    onClick={() => { setOpenEditListBoard(false);  }}
                  >
                    Edit List
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

    </div>
  );
};

export default BoardRoom;