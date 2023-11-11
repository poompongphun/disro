"use client";
import React, { useEffect, useState } from "react";
const SettingProjectSave = () => {
  const [havechange, setHavechange] = useState(false);
  const [serverName, setServerName] = useState("");

  useEffect(() => {
    console.log("havechange", havechange);
    setHavechange(true);
  }, [serverName]);

  return (
    <div className="flex flex-col w-full my-auto mx-10 gap-y-16">
      <div className="flex justify-between m-2">
        <div className="text-4xl"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className=" lucide lucide-x-circle"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
      </div>
      <div className="flex flex-col items-center gap-y-4 my-2">
        <div className="rounded-full bg-slate-400 p-6 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2.5a5.25 5.25 0 0 0-2.519 9.857a9.005 9.005 0 0 0-6.477 8.37a.75.75 0 0 0 .727.773H20.27a.75.75 0 0 0 .727-.772a9.005 9.005 0 0 0-6.477-8.37A5.25 5.25 0 0 0 12 2.5Z"
            />
          </svg>
        </div>
        <p className="text-lg">แนะนำไฟล์ควรมีขนาด 512 x 512</p>
        <div className="flex flex-row gap-3">
          <button className="bg-slate-400 rounded-full text-white px-6 py-2">
            อัปโหลดไฟล์
          </button>
          <button className="bg-slate-400 rounded-full text-white px-6 py-2">
            ลบไฟล์
          </button>
        </div>
      </div>
      <div className="flex flex-col px-20">
        <form className="flex flex-col gap-y-4 px-96">
          <div className="flex flex-col gap-y-2 ">
            <label className="text-lg text-start">ชื่อโปรเจค</label>
            <input
              className="border border-slate-400 rounded-full px-6 py-2 text-black"
              type="text"
              value={serverName}
              onInput={(e) => {
                setServerName(e.currentTarget.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-y-2 ">
            <label className="text-lg text-start">ID Server</label>
            <input
              className="border border-slate-400 rounded-full px-6 py-2 text-black"
              type="text"
              disabled
            />
          </div>
        </form>
      </div>

      {havechange == true && (
        <footer className="flex flex-row justify-center mt-5">
          <div className="flex flex-row bg-white w-2/3 rounded-xl py-3 items-center justify-between px-6 m-2">
            <p className="text-black text-start">
              มีการแก้ไขเกิดขึ้น คุณต้องการที่จะยืนยันการแก้ไขหรือไม่
            </p>
            <div className="flex flex-row gap-x-4">
              <button className="bg-green-400 rounded-full text-white px-6 py-2">
                ยืนยัน
              </button>
              <button className="bg-red-400 rounded-full text-white px-6 py-2">
                ยกเลิก
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default SettingProjectSave;
