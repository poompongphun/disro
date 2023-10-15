import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const serverData = [
  {
    id: 1,
    imgUrl: "https://picsum.photos/200/300?1",
  },
  {
    id: 2,
    imgUrl: "https://picsum.photos/200/300?2",
  },
  {
    id: 3,
    imgUrl: "https://picsum.photos/200/300?3",
  },
  {
    id: 4,
    imgUrl: "https://picsum.photos/200/300?4",
  },
  {
    id: 5,
    imgUrl: "https://picsum.photos/200/300?5",
  },
  {
    id: 6,
    imgUrl: "https://picsum.photos/200/300?6",
  },
  {
    id: 7,
    imgUrl: "https://picsum.photos/200/300?7",
  },
  {
    id: 8,
    imgUrl: "https://picsum.photos/200/300?8",
  },
  {
    id: 9,
    imgUrl: "https://picsum.photos/200/300?9",
  },
  {
    id: 10,
    imgUrl: "https://picsum.photos/200/300?10",
  },
  {
    id: 11,
    imgUrl: "https://picsum.photos/200/300?11",
  },
  {
    id: 12,
    imgUrl: "https://picsum.photos/200/300?12",
  },
  {
    id: 13,
    imgUrl: "https://picsum.photos/200/300?13",
  },
];

const ButtonIcon = ({
  d,
  className,
  routeName,
  img,
}: {
  d?: string;
  className?: string;
  routeName?: string;
  img?: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <button
      type="button"
      className={
        `w-14 h-14 bg-mediumBlue flex justify-center items-center hover:opacity-90 transition-all ${
          routeName === pathname ? "rounded-2xl" : "rounded-full"
        } ` + className
      }
      onClick={() => {
        if (routeName) {
          router.push(routeName);
        }
      }}
      onMouseEnter={() => {
        console.log("enter");
      }}
    >
      <div
        className={`w-2 rounded-xl absolute bg-white left-[-2px] h-8 transition-all opacity-0 ${
          routeName === pathname && "opacity-100"
        }`}
      ></div>
      {img ? (
        <Image
          src={img}
          alt="Profile Picture"
          width={56}
          height={56}
          className="w-full h-full object-cover"
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7 fill-white"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={d} />
        </svg>
      )}
    </button>
  );
};

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex">
      <div className="w-24 h-full bg-darkBlue py-4 flex flex-col justify-between items-center overflow-hidden">
        <div className="h-full w-full overflow-auto no-scrollbar relative ">
          <ButtonIcon
            routeName="/"
            className="mx-auto"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          ></ButtonIcon>
          <hr className="my-4 mx-4" />

          <div className="flex justify-center items-center flex-col gap-2 ">
            <ButtonIcon d="M12 4.5v15m7.5-7.5h-15"></ButtonIcon>
            {serverData.map((data, index) => (
              <ButtonIcon
                routeName={"/channels/" + data.id}
                key={index}
                className="overflow-hidden"
                img={data.imgUrl}
              ></ButtonIcon>
            ))}
          </div>
        </div>

        <div>
          <ButtonIcon
            routeName="/profile"
            className="mt-4"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          ></ButtonIcon>
        </div>
      </div>

      <div className="w-full relative">{children}</div>
    </div>
  );
};

export default HomeLayout;
