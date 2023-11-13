"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import Image from "next/image";
import axios from "@/utils/axios";
import { updateProjects } from "@/store/serverSlice";

const SettingProjectSave = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // form data
      const formData = new FormData();
      formData.append("file", file);
      // upload
      const img = await axios.post("http://127.0.0.1:5000/upload", formData);
      setServerImg(img.data);
    }
  };
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.servers.value);
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const project = projects.find((project) => project._id === id);

  const [serverName, setServerName] = useState(project?.name);
  const [serverImg, setServerImg] = useState(String(project?.image));

  // useEffect(() => {
  //   console.log("havechange", havechange);
  //   setHavechange(true);
  // }, [serverName]);

  useEffect(() => {
    setServerName(project?.name);
    setServerImg(String(project?.image));
  }, [projects]);

  const submit = async () => {
    const res = await axios.post(
      `/manageserver-service/updateServer/${id}`,
      {
        ...project,
        name: serverName,
        id: project?._id,
        img: serverImg,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (res) {
      dispatch(updateProjects(res.data));
    }
  };

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
          className=" lucide lucide-x-circle cursor-pointer"
          onClick={() => {
            router.push(`/projects/${id}/`);
          }}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
      </div>
      <div className="flex flex-col items-center gap-y-4 my-2">
        <div className="rounded-full bg-slate-400">
          <Image
            src={
              serverImg != "undefined" && serverImg != "null"
                ? serverImg
                : "https://cdn-icons-png.flaticon.com/512/4019/4019731.png"
            }
            alt="avatar"
            width={168}
            height={168}
            className="rounded-full aspect-square object-cover"
          ></Image>
        </div>
        <p className="text-lg">แนะนำไฟล์ควรมีขนาด 512 x 512</p>
        <div className="flex flex-row gap-3">
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <button
            className="bg-slate-400 rounded-full text-white px-6 py-2"
            onClick={() => fileInputRef.current?.click()}
          >
            อัปโหลดไฟล์
          </button>
          <button
            className="bg-slate-400 rounded-full text-white px-6 py-2"
            onClick={() => setServerImg(String(project?.image))}
          >
            ลบไฟล์
          </button>
        </div>
      </div>
      <div className="flex flex-col px-20">
        <form className="flex flex-col gap-y-4 px-96">
          <div className="flex flex-col gap-y-2 ">
            <label className="text-lg text-start">ลิงค์รูปภาพ</label>
            <input
              className="border border-slate-400 rounded-full px-6 py-2 text-black"
              type="text"
              value={serverImg}
              onInput={(e) => {
                setServerImg(e.currentTarget.value);
              }}
            />
          </div>
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
              value={project?._id}
            />
          </div>
        </form>
      </div>

      {
        <footer
          className={`flex flex-row justify-center mt-5 transition-opacity ${
            serverName != project?.name || serverImg != String(project?.image)
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          <div className="flex flex-row bg-white w-2/3 rounded-xl py-3 items-center justify-between px-6 m-2">
            <p className="text-black text-start">
              มีการแก้ไขเกิดขึ้น คุณต้องการที่จะยืนยันการแก้ไขหรือไม่
            </p>
            <div className="flex flex-row gap-x-4">
              <button
                className="bg-green-400 rounded-full text-white px-6 py-2"
                onClick={submit}
              >
                ยืนยัน
              </button>
              <button
                className="bg-red-400 rounded-full text-white px-6 py-2"
                onClick={() => setServerName(project?.name)}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </footer>
      }
    </div>
  );
};

export default SettingProjectSave;
