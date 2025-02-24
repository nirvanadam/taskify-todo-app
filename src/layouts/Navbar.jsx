import { CirclePlus, LayoutList, Search, SquareCheckBig } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Actions
import { toggleModalCreate } from "../redux/slices/modalCreateSlice";
import {
  toggleSearchBar,
  toggleTaskList,
  toggleCompletedTasks,
} from "../redux/slices/taskSlice";

function Navbar() {
  const dispatch = useDispatch();
  const activeButton = useSelector((state) => state.tasks.activeButton);

  return (
    <div className="fixed left-0 bottom-0 flex justify-evenly items-center border-t bg-white h-[90px] border-gray-200 py-4 w-full">
      <button
        type="button"
        onClick={() => dispatch(toggleTaskList())}
        className={`${
          activeButton === "taskList" && "text-textColor-accent"
        } flex flex-col text-gray-500 items-center gap-1`}
      >
        <LayoutList size={24} />
        <h1 className="text-sm font-medium">Todo</h1>
      </button>

      <button
        type="button"
        onClick={() => dispatch(toggleModalCreate())}
        className={`flex flex-col text-gray-500 items-center gap-1`}
      >
        <CirclePlus size={24} />
        <h1 className="text-sm font-medium">Create</h1>
      </button>

      <button
        type="button"
        onClick={() => dispatch(toggleSearchBar())}
        className={`${
          activeButton === "searchBar" && "text-textColor-accent"
        } flex flex-col text-gray-500 items-center gap-1`}
      >
        <Search size={24} />
        <h1 className="text-sm font-medium">Search</h1>
      </button>

      <button
        type="button"
        onClick={() => dispatch(toggleCompletedTasks())}
        className={`${
          activeButton === "completedTasks" && "text-textColor-accent"
        } flex flex-col text-gray-500 items-center gap-1`}
      >
        <SquareCheckBig size={24} />
        <h1 className="text-sm font-medium">Done</h1>
      </button>
    </div>
  );
}

export default Navbar;
