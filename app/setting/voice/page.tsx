"use client";
import React, { useState } from "react";
import Slider from "@mui/material/Slider";

const SettingVoice = () => {
  const [microphoneVolume, setMicrophoneVolume] = React.useState<number>(100);
  const handleMicrophone = (event: Event, newValue: number | number[]) => {
    setMicrophoneVolume(newValue as number);
  };
  const [speakerVolume, setSpeakerVolume] = React.useState<number>(100);
  const handleSpeaker = (event: Event, newValue: number | number[]) => {
    setSpeakerVolume(newValue as number);
  };
  const [notificationVolume, setNotificationVolume] =
    React.useState<number>(100);
  const handleNotification = (event: Event, newValue: number | number[]) => {
    setNotificationVolume(newValue as number);
  };
  const [meetingsCallsVolume, setMeetingsCallsVolume] =
    React.useState<number>(100);
  const handleMeetingsCalls = (event: Event, newValue: number | number[]) => {
    setMeetingsCallsVolume(newValue as number);
  };
  return (
    <>
      <div className="flex h-screen flex-col w-full p-10">
        <div className="flex justify-between ">
          <div className="text-4xl">Voice</div>
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
        <div className="text-left mt-6">
          <p className="text-2xl">Voice Setting</p>
          <div className="mt-2 max-w-[80%]">
            <p className="">Microphone Volume</p>
            <Slider
              valueLabelDisplay="auto"
              aria-label="Volume"
              value={microphoneVolume}
              onChange={handleMicrophone}
            />
          </div>
          <div className="mt-2 max-w-[80%]">
            <p className="">Speaker Volumee</p>
            <Slider
              valueLabelDisplay="auto"
              aria-label="Volume"
              value={speakerVolume}
              onChange={handleSpeaker}
            />
          </div>
          <div className="mt-2 max-w-[80%]">
            <p className="">Notification Volume</p>
            <Slider
              valueLabelDisplay="auto"
              aria-label="Volume"
              value={notificationVolume}
              onChange={handleNotification}
            />
          </div>
          <div className="mt-2 max-w-[80%]">
            <p className="">Meetings & Calls Volume</p>
            <Slider
              valueLabelDisplay="auto"
              aria-label="Volume"
              value={meetingsCallsVolume}
              onChange={handleMeetingsCalls}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingVoice;
