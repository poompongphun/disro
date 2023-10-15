import ProjectCard from "@/components/Project/ProjectCard";
import ProjectData from "@/Class/mockData.json";

const Projects = () => {
  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Project</h1>
        <button className="bg-lightBlue px-4 py-2 text-black rounded-md text-sm">
          Join team or Create team
        </button>
      </div>
      <h2 className="my-4">Your Projects</h2>
      {ProjectData.length > 0 ? (
        <div className="col columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
          {ProjectData.map((project, index) => (
            <ProjectCard key={index} {...project}></ProjectCard>
          ))}
        </div>
      ) : (
        <div className="h-[calc(100vh-172px)] flex justify-center items-center">
          You don’t have any project
        </div>
      )}
    </div>
  );
};

export default Projects;
