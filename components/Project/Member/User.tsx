import User from "@/Class/User";
import Image from "next/image";

const User = ({ user }: { user: User }) => {
  return (
    <div className="flex justify-start items-center gap-2 px-4 py-2">
      <Image
        src={
          user.image
            ? user.image
            : "https://cdn-icons-png.flaticon.com/512/147/147142.png"
        }
        alt="avatar"
        width={40}
        height={40}
        className="rounded-full aspect-square object-cover"
      ></Image>
      <span>{user.username}</span>
    </div>
  );
};

export default User;
