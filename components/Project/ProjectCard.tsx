import Project from "@/Class/project";
import Image from "next/image";
import Link from "next/link";
const ProjectCard = ({ id, image, name, description }: Project) => {
  return (
    <Link
      href={"/projects/" + id}
      className="bg-blue w-full h-full aspect-square relative rounded-sm overflow-hidden p-8 flex justify-around items-center flex-col shadow-md cursor-pointer hover:opacity-90 mb-2"
    >
      <Image
        src={image}
        alt="Project Image"
        width={100}
        height={100}
        className="aspect-square mx-auto rounded-md"
      />
      <div className="text-center">
        <h1 className="text-xl font-bold">{name}</h1>
        <p className="text-sm">{description}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
