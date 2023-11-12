import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import axios from "@/utils/axios";
import { useDispatch } from "react-redux";
import { deleteProjects } from "@/store/serverSlice";
import Project from "@/Class/Project";

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
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const deletePj = async () => {
    const delPj = await axios.post(`/manageserver-service/deleteServer/${id}`);
    if (delPj) {
      dispatch(deleteProjects({ _id: id } as Project));
      router.push("/projects");
    }
  };
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
          onClick={deletePj}
        >
          Delete Project
        </button>
      </div>
      {children}
    </div>
  );
};

export default ProfileSettingLayout;
