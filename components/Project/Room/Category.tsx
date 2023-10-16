"use client";
import ChevronDownIcon from "@heroicons/react/20/solid/esm/ChevronDownIcon";
import ChevronUpIcon from "@heroicons/react/20/solid/esm/ChevronUpIcon";
import PlusIcon from "@heroicons/react/20/solid/esm/PlusIcon";
import { useState } from "react";
import TextRoom from "./TextRoom";
import VoiceRoom from "./VoiceRoom";
import BoardRoom from "./BoardRoom";
import { useCollapse } from "react-collapsed";
import Category from "@/Class/Category";

const Category = ({ category }: { category: Category }) => {
  const [isExpanded, setExpanded] = useState(true);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  return (
    <div className="p-1">
      <div className="flex justify-between items-center py-2">
        <div
          className="flex justify-between items-center gap-1 hover:opacity-90"
          {...getToggleProps({
            onClick: () => setExpanded((prevExpanded) => !prevExpanded),
          })}
        >
          <button type="button">
            <ChevronDownIcon
              className={`w-5 h-5 transition-all ${
                isExpanded ? "" : "-rotate-90"
              }`}
            ></ChevronDownIcon>
            {/* <ChevronUpIcon className="w-5 h-5"></ChevronUpIcon> */}
          </button>
          <div>{category.name}</div>
        </div>
        <button type="button">
          <PlusIcon className="w-5 h-5"></PlusIcon>
        </button>
      </div>
      <div {...getCollapseProps()}>
        {category.room.map((room) => {
          return room.type === "text" ? (
            <TextRoom room={room} />
          ) : room.type === "voice" ? (
            <VoiceRoom room={room} />
          ) : room.type === "board" ? (
            <BoardRoom room={room} />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Category;
