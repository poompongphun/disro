import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
const buttonPath = [
  {
    name: "Profile",
    path: "/setting/profile",
  },
  {
    name: "Premium",
    path: "/setting/premium",
  },
  {
    name: "Notification",
    path: "/setting/notification",
  },
  {
    name: "Voice",
    path: "/setting/voice",
  },
];

const SettingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row text-center h-full w-full">
      <div className="flex flex-col bg-[#132043] w-1/5 py-10 justify-between max-w-[300px]">
        <div className="flex-1 py-5 my-6 w-full ">
          <div className="flex flex-col gap-y-4 text-lg">
            {buttonPath.map((item) => (
              <Link
                key={item.path}
                className="hover:bg-[#1F4172] py-4"
                href={item.path}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <button
          className="py-5 my-6 w-full hover:bg-[#1F4172] text-red-600"
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </button>
      </div>
      {children}
    </div>
  );
};

export default SettingLayout;
