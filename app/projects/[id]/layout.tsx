"use client";
import AllRoom from "@/components/Project/AllRoom";
import Members from "@/components/Project/Members";
import mockData from "@/Class/mockData.json";
import { useParams } from "next/navigation";
import Project from "@/Class/Project";

const ProjectRoomLayout = ({ children }: { children: React.ReactNode }) => {
  // MockData
  const { id } = useParams() as { id: string };
  const project: Project = mockData.find(
    (project) => project.id === String(id)
  ) as Project;

  return (
    <div className="h-full flex justify-between items-start relative">
      <div className="w-64 bg-mediumBlue h-full">
        <AllRoom project={project} />
      </div>
      <div
        className="bg-blue h-full"
        style={{ width: "calc(100% - (256px * 2))" }}
      >
        {children}
      </div>
      <div className="w-64 bg-mediumBlue h-full">
        <Members members={project.members} />
      </div>
    </div>
  );
};

export default ProjectRoomLayout;
