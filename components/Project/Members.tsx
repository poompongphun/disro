import UsersIcon from "@heroicons/react/20/solid/esm/UsersIcon";
import User from "./Member/User";
import UserType from "@/Class/User";

const Members = ({ members }: { members: UserType[] }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-start items-center p-2 gap-1">
        <UsersIcon className="w-5 h-5"></UsersIcon>
        <h1 className="text-xl font-medium">Members</h1>
      </div>
      <hr />
      <div className="flex flex-col justify-center items-start overflow-y-auto no-scrollbar">
        {members.map((member, index) => (
          <User key={index} user={member} />
        ))}
      </div>
    </div>
  );
};

export default Members;
