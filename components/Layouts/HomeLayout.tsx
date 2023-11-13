"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import AddProjectDialog from "../Project/AddProjectDialog";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProjects, fetchData } from "@/store/serverSlice";
import { AppDispatch } from "@/app/store";
import type { RootState } from "@/app/store";
import { useSession } from "next-auth/react";

const ButtonIcon = ({
  d,
  className,
  routeName,
  img,
  onClick,
}: {
  d?: string;
  className?: string;
  routeName?: string;
  img?: string;
  onClick?: () => void;
}) => {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  return (
    <button
      type="button"
      className={
        `w-14 h-14 bg-mediumBlue flex justify-center items-center hover:opacity-90 transition-all ${
          routeName === `/projects/${id}` ? "rounded-2xl" : "rounded-full"
        } ` + className
      }
      onClick={
        onClick
          ? onClick
          : () => {
              if (routeName) {
                router.push(routeName);
              }
            }
      }
    >
      <div
        className={`w-2 rounded-xl absolute bg-white left-[-2px] h-8 transition-all opacity-0 ${
          routeName === `/projects/${id}` && "opacity-100"
        }`}
      ></div>
      {img ? (
        <Image
          src={img}
          alt="Profile Picture"
          width={56}
          height={56}
          className="w-full h-full aspect-square object-cover"
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7 fill-white"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={d} />
        </svg>
      )}
    </button>
  );
};

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const user = session?.user as { _id: string };

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector((state: RootState) => state.servers.value);

  useEffect(() => {
    dispatch(fetchData(session ? user._id : ""));
  }, [dispatch, user]);

  return (
    <div className="h-screen flex">
      <div className="w-24 h-full bg-darkBlue py-4 flex flex-col justify-between items-center overflow-hidden">
        <div className="h-full w-full overflow-auto no-scrollbar relative ">
          <ButtonIcon
            routeName="/projects"
            className="mx-auto"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          ></ButtonIcon>
          <hr className="my-4 mx-4" />

          <div className="flex justify-center items-center flex-col gap-2 ">
            <ButtonIcon
              d="M12 4.5v15m7.5-7.5h-15"
              onClick={() => setOpen(true)}
            ></ButtonIcon>
            {projects.map((data, index) => (
              <ButtonIcon
                routeName={"/projects/" + data._id}
                key={index}
                className="overflow-hidden"
                img={
                  data.image
                    ? data.image
                    : "https://cdn-icons-png.flaticon.com/512/4019/4019731.png"
                }
              ></ButtonIcon>
            ))}
          </div>
        </div>

        <div>
          <ButtonIcon
            routeName="/setting/profile"
            className="mt-4"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          ></ButtonIcon>
        </div>
      </div>
      <div className="w-full relative">{children}</div>
      <AddProjectDialog open={open} setOpen={setOpen}></AddProjectDialog>
    </div>
  );
};

export default HomeLayout;
