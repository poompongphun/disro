import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const buttonPath = [
  {
    name: "Details",
    path: "/setting",
  },
  {
    name: "Roles",
    path: "/setting/roles",
  },
  {
    name: "Members",
    path: "/setting/members",
  },
];

const ProfileSettingLayout = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams() as { id: string };
  return (
    <div className="flex flex-row text-center h-full w-full">
      <div className="flex flex-col bg-[#132043] w-1/5 py-10 justify-between max-w-[300px]">
        <div className="flex-1 py-5 my-6 w-full">
          <div className="flex flex-col gap-y-4 text-lg">
            {buttonPath.map((item) => (
              <Link
                href={`/projects/${id}` + item.path}
                key={item.path}
                className="hover:bg-[#1F4172] py-4"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <button
          className="py-5 my-6 w-full hover:bg-[#1F4172] text-red-600"
          onClick={() => {
            alert("Delete Project");
          }}
        >
          Delete Project
        </button>
      </div>
      {children}
    </div>
  );
};

export default ProfileSettingLayout;
