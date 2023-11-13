"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import User from "@/Class/User";
const SettingProfile = () => {
  const { data: session } = useSession();
  const user = session?.user as User;
  console.log(user);

  const [showPopup, setShowPopup] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const confirmHandler = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
      setDisplayName(user.username);
      setAboutMe(user.aboutMe);
    }
  }, [user]);
  return (
    <>
      {/* popup */}
      {showPopup && (
        <div className="fixed flex h-screen w-screen bg-[rgba(0,0,0,.4)]">
          <div className="relative m-auto ">
            <form className="bg-[#9CB8DD] w-[400px] p-10 rounded-md text-black">
              <div>
                <p className="text-left">Old Password</p>
                <input
                  className="border border-slate-400 rounded-full w-full p-2 outline-none"
                  type="text"
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                />
              </div>
              <div className="mt-4">
                <p className="text-left">New Password</p>
                <input
                  className="border border-slate-400 rounded-full w-full p-2 outline-none"
                  type="text"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
              <div className="mt-4">
                <p className="text-left">Confirm New Password</p>
                <input
                  className="border border-slate-400 rounded-full w-full p-2 outline-none"
                  type="text"
                  onChange={(e) => {
                    setCheckPassword(e.target.value);
                  }}
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={confirmHandler}
                  className="bg-green-600 text-white p-2 rounded-md cursor-pointer"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex h-screen flex-col w-full ">
        <div className="flex justify-between p-10">
          <div className="text-4xl">Profile</div>
          <button>
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
          </button>
        </div>
        <div className="flex justify-center gap-64">
          <div className="flex flex-col px-8 py-16">
            <div className="flex flex-col py-8">
              <label className="text-lg text-start">Username</label>
              <input
                className="border border-slate-400 rounded-full px-10 py-2 text-black"
                type="text"
                disabled
                value={username}
              />
            </div>
            <div className="flex flex-col py-8">
              <label className="text-lg text-start">Email</label>
              <input
                className="border border-slate-400 rounded-full px-10 py-2 text-black"
                type="text"
                disabled
                value={email}
              />
            </div>
            <div className="flex flex-col py-8">
              <label className="text-lg text-start">Phone Number</label>
              <input
                className="border border-slate-400 rounded-full px-10 py-2 text-black"
                type="text"
                disabled
                value={phoneNumber}
              />
            </div>
            <button
              onClick={() => setShowPopup(true)}
              className="bg-white rounded-full text-black px-10 py-2 "
            >
              Change Password
            </button>
          </div>
          <div className="flex flex-col items-center gap-y-4 my-10">
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
            <div className="bg-[#6793C9] p-10 rounded-lg">
              <div className="flex flex-col py-2">
                <label className="text-lg text-start ">Display Name</label>
                <input
                  className="border border-slate-400 rounded-full px-10 py-2 text-black"
                  type="text"
                  disabled
                  value={displayName}
                />
              </div>
              <div className="flex flex-col py-2">
                <label className="text-lg text-start">About me</label>
                <input
                  className="border border-slate-400 rounded-md px-10 py-10 text-black"
                  type="text"
                  disabled
                  value={aboutMe}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingProfile;
