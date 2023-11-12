import Project from "@/Class/Project";
import Image from "next/image";
import Link from "next/link";
const ProjectCard = ({ _id, image, name, description }: Project) => {
  return (
    <Link
      href={"/projects/" + _id}
      className="bg-blue w-full h-full aspect-square relative rounded-sm overflow-hidden p-8 flex justify-around items-center flex-col shadow-md cursor-pointer hover:opacity-90 mb-2"
    >
      <Image
        src={
          image
            ? image
            : "https://cdn-icons-png.flaticon.com/512/4019/4019731.png"
        }
        alt="Project Image"
        width={100}
        height={100}
        className="aspect-square object-cover mx-auto rounded-md"
      />
      <div className="text-center">
        <h1 className="text-xl font-bold">{name}</h1>
        <p className="text-sm">{description}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
