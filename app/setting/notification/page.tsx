"use client";
import React, { useState } from "react";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Size switch demo" } };
const SettingNotification = () => {
  return (
    <div className="flex h-screen flex-col w-full ">
      <div className="flex justify-between p-10">
        <div className="text-4xl">Notification</div>
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

      <div className="flex justify-between px-32 py-10">
        <div className="text-xl">Notification</div>
        <Switch {...label} defaultChecked color="default" />
      </div>

      <div className="flex justify-between px-32 py-10">
        <div className="text-xl">Show message preview</div>
        <Switch {...label} defaultChecked color="default" />
      </div>

      <div className="flex justify-between px-32 py-10">
        <div className="text-xl">Meetings & Calls</div>
        <Switch {...label} defaultChecked color="default" />
      </div>

      <div className="flex justify-between px-32 py-10">
        <div className="text-xl">Other</div>
        <Switch {...label} defaultChecked color="default" />
      </div>
    </div>
  );
};

export default SettingNotification;
