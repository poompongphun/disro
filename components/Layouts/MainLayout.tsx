"use client";
import React from "react";
import { usePathname } from "next/navigation";
import AuthLayout from "./AuthLayout";
import HomeLayout from "./HomeLayout";
import SettingLayout from "./ProjectSettingLayout";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isLayoutNeeded = [`/login`, `/register`].includes(String(pathname));
  const LayoutComponent = isLayoutNeeded ? AuthLayout : HomeLayout;

  return <LayoutComponent>{children}</LayoutComponent>;
};

export default MainLayout;
