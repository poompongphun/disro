"use client";
import AllRoom from "@/components/Project/AllRoom";
import Members from "@/components/Project/Members";
import mockData from "@/Class/mockData.json";
import { useParams, usePathname } from "next/navigation";
import Project from "@/Class/Project";
import Setting from "@/components/Layouts/ProjectSettingLayout";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

const ProjectRoomLayout = ({ children }: { children: React.ReactNode }) => {
  // MockData
  const { id } = useParams() as { id: string };
  const { value: projects, loading } = useSelector(
    (state: RootState) => state.servers
  );
  const pathname = usePathname();
  const project: Project = projects.find(
    (project) => project._id === String(id)
  ) as Project;
  console.log(project);

  return pathname?.startsWith(`/projects/${id}/setting`) ? (
    <Setting>{children}</Setting>
  ) : (
    <div className="h-full flex justify-between items-start relative">
      <div className="w-64 bg-mediumBlue h-full">
        {project && <AllRoom project={project} />}
      </div>
      <div
        className="bg-blue h-full"
        style={{ width: "calc(100% - (256px * 2))" }}
      >
        {children}
      </div>
      <div className="w-64 bg-mediumBlue h-full">
        {project && <Members members={project.member} />}
      </div>
    </div>
  );
};

export default ProjectRoomLayout;
