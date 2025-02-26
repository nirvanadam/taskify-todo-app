import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Icons
import { Ellipsis, Plus, Search, Square, SquarePlus } from "lucide-react";
import no_result from "/icons/no_result.svg";
import editIcon from "/icons/edit.svg";
import deleteIcon from "/icons/delete.svg";
import logo from "/icons/logo.svg";

// Components
import CreateTaskForm from "../components/CreateTaskForm";
import EditTaskForm from "../components/EditTaskForm";

// Actions
import { toggleModalEdit } from "../redux/slices/modalEditSlice";
import {
  completeTask,
  toggleCompletedTasks,
  toggleConfirmModal,
  toggleTaskList,
} from "../redux/slices/taskSlice";
import { toggleModalCreate } from "../redux/slices/modalCreateSlice";
import ConfirmModal from "../components/ConfirmModal";
import SuccessModal from "../components/SuccessModal";

function HomePage() {
  const dispatch = useDispatch();
  const tasksData = useSelector((state) => state.tasks.tasksData);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredTasks = tasksData.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const isSearchBarOpen = useSelector((state) => state.tasks.isSearchBarOpen);
  const isModalCreateOpen = useSelector(
    (state) => state.modalCreate.isModalCreateOpen,
  );
  const isModalEditOpen = useSelector(
    (state) => state.modalEdit.isModalEditOpen,
  );

  const isCompletedTasksOpen = useSelector(
    (state) => state.tasks.isCompletedTasksOpen,
  );

  const isConfirmModalOpen = useSelector(
    (state) => state.tasks.isConfirmModalOpen,
  );

  const activeButton = useSelector((state) => state.tasks.activeButton);

  const isSuccessModalOpen = useSelector(
    (state) => state.tasks.isSuccessModalOpen,
  );

  const completedTasks = tasksData.filter((task) => task.done);

  const [selectedTask, setSelectedTask] = useState(null);

  const toggleOption = (id) => {
    setSelectedTask(selectedTask === id ? null : id);
  };

  const handleCompleteTask = (id) => {
    dispatch(completeTask(id));
  };

  useEffect(() => {
    if (!isSearchBarOpen) {
      setSearchTerm("");
    }
  }, [isSearchBarOpen]);

  useEffect(() => {
    setSelectedTask(null);
  }, [isCompletedTasksOpen]);

  return (
    <div className={`relative pt-9`}>
      {isSearchBarOpen ? (
        <div className={`relative rounded-xl bg-background-secondary`}>
          <label
            htmlFor="search"
            className="absolute left-3 top-1/2 -translate-y-1/2"
          >
            <Search size={18} color="#007FFF" className="" />
          </label>
          <input
            type="text"
            name="search"
            id="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Find your tasks"
            className="text-medium w-full rounded-xl bg-transparent py-3 pl-10 pr-3 placeholder:font-medium focus:outline-textColor-accent"
          />
        </div>
      ) : isCompletedTasksOpen ? (
        <div className="flex items-center justify-between lg:hidden">
          <h1 className="text-xl font-semibold">Completed Tasks</h1>
          {completedTasks.length > 0 && (
            <button
              type="button"
              onClick={() => dispatch(toggleConfirmModal("all"))}
              className="text flex items-center gap-1 rounded-xl bg-red-500 px-3 py-2 font-semibold text-white"
            >
              Delete All
            </button>
          )}
        </div>
      ) : (
        <header className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">
            Welcome, <span className="text-textColor-accent">Adam</span>!
          </h1>

          {searchTerm === "" && (
            <p className="text-base text-textColor-secondary">
              You’ve got {filteredTasks.length - completedTasks.length} tasks to
              do.
            </p>
          )}
        </header>
      )}

      <div className="hidden justify-between lg:flex">
        {isCompletedTasksOpen ? (
          completedTasks.length > 0 ? (
            <button
              type="button"
              onClick={() => dispatch(toggleConfirmModal("all"))}
              className="text flex items-center gap-1 rounded-xl bg-red-500 px-3 py-1 text-sm font-semibold text-white"
            >
              Delete All
            </button>
          ) : (
            <div className=""></div>
          )
        ) : (
          <button
            type="button"
            onClick={() => dispatch(toggleModalCreate())}
            className={`mt-5 flex items-center gap-3 text-gray-400`}
          >
            <SquarePlus size={24} className="text-gray-300" />
            <h1 className="text-sm font-semibold">Add new task...</h1>
          </button>
        )}

        <div className="flex gap-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => dispatch(toggleTaskList())}
              className={`${
                activeButton === "taskList"
                  ? "bg-textColor-accent text-white"
                  : "border border-gray-200 text-gray-500"
              } flex items-center gap-1 rounded-xl px-3 py-2 font-semibold`}
            >
              <h1 className="text-sm font-semibold">All</h1>
            </button>

            <button
              type="button"
              onClick={() => dispatch(toggleCompletedTasks())}
              className={`${
                activeButton === "completedTasks"
                  ? "bg-textColor-accent text-white"
                  : "border border-gray-200 text-gray-500"
              } flex items-center gap-1 rounded-xl px-3 py-2 font-semibold`}
            >
              <h1 className="text-sm font-semibold">Done</h1>
            </button>
          </div>

          <div
            className={`${isCompletedTasksOpen && "hidden"} relative w-[250px] rounded-xl bg-background-secondary`}
          >
            <label
              htmlFor="search"
              className="absolute left-3 top-1/2 -translate-y-1/2"
            >
              <Search size={18} color="#007FFF" className="" />
            </label>
            <input
              type="text"
              name="search"
              id="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Find your tasks"
              className="text-medium w-full rounded-xl bg-transparent py-3 pl-10 pr-3 placeholder:font-medium placeholder:text-gray-300 focus:outline-textColor-accent"
            />
          </div>
        </div>
      </div>

      <section
        className={`b-yellow-400 relative mt-7 flex h-[calc(74vh-90px)] flex-col gap-4 overflow-y-auto lg:h-[69vh]`}
      >
        {isCompletedTasksOpen && completedTasks.length === 0 && (
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 text-gray-500">
            <img src={no_result} alt="" className="w-20" />
            <p className="text-center font-medium text-textColor-secondary">
              You have no task listed.
            </p>
          </div>
        )}

        {!isCompletedTasksOpen && filteredTasks.length === 0 ? (
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 text-gray-500">
            <img src={no_result} alt="" className="w-20" />
            <p className="text-center font-medium text-textColor-secondary">
              {isSearchBarOpen
                ? "No result found."
                : "You have no task listed."}
            </p>

            {!isSearchBarOpen && (
              <button
                onClick={() => dispatch(toggleModalCreate())}
                className="mt-2 flex items-center justify-between gap-1 rounded-xl bg-blue-50 px-4 py-3"
              >
                <Plus size={20} color="#007FFF" />
                <h1 className="font-semibold text-textColor-accent">
                  Create Task
                </h1>
              </button>
            )}
          </div>
        ) : (
          (isCompletedTasksOpen ? completedTasks : filteredTasks).map(
            (task, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-[auto_4fr_1fr] gap-5 rounded-2xl bg-background-secondary p-4"
                >
                  <button
                    type="button"
                    onClick={() => handleCompleteTask(task.id)}
                    className="w-fit self-start"
                  >
                    {task.done ? (
                      <img src={logo} alt="" className="w-6" />
                    ) : (
                      <Square className="w-6 text-gray-300" />
                    )}
                  </button>

                  <div className="flex flex-col gap-3">
                    <h1
                      className={`${
                        task.done && "text-gray-500 line-through"
                      } text-lg font-semibold`}
                    >
                      {task.title}
                    </h1>
                    <p
                      className={`${
                        task.done && "line-through"
                      } hyphens-auto text-sm text-textColor-secondary`}
                    >
                      {task.note}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-3 self-start justify-self-end">
                    {isCompletedTasksOpen ? (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTask(
                            selectedTask === task.id ? null : task.id,
                          );
                          dispatch(toggleConfirmModal());
                        }}
                      >
                        <img src={deleteIcon} alt="Delete" />
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleOption(task.id)}
                        type="button"
                        disabled={isModalEditOpen ? true : false}
                        className="self-start"
                      >
                        <Ellipsis
                          size={26}
                          className="text-textColor-secondary"
                        />
                      </button>
                    )}

                    {selectedTask === task.id && (
                      <div className="flex flex-col gap-5">
                        <button
                          type="button"
                          disabled={isModalEditOpen ? true : false}
                          onClick={() => dispatch(toggleModalEdit())}
                        >
                          <img src={editIcon} alt="Edit" />
                        </button>

                        <button
                          type="button"
                          disabled={isModalEditOpen ? true : false}
                          onClick={() => dispatch(toggleConfirmModal())}
                        >
                          <img src={deleteIcon} alt="Delete" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            },
          )
        )}
      </section>

      {isModalCreateOpen && <CreateTaskForm />}
      {isModalEditOpen && <EditTaskForm id={selectedTask} />}
      {isConfirmModalOpen && <ConfirmModal id={selectedTask} />}
      {isSuccessModalOpen && <SuccessModal />}
    </div>
  );
}

export default HomePage;
