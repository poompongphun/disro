'use client';
import React, { useState } from "react";
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Size switch demo' } };
const SettingNotification = () => {

    return (
        <div className="flex h-screen flex-col w-full ">

            <div className="flex justify-between p-10">
                <div className="text-4xl">Setting</div>
                <button className="text-xl text-red-400">ESC</button>
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
}

export default SettingNotification;