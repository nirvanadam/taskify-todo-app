import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Icons
import { Ellipsis, Pencil, Plus, Search, Square } from "lucide-react";
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
  deleteTask,
  completeTask,
  deleteAllTask,
} from "../redux/slices/taskSlice";
import { toggleModalCreate } from "../redux/slices/modalCreateSlice";

function HomePage2() {
  const dispatch = useDispatch();
  const tasksData = useSelector((state) => state.tasks.tasksData);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredTasks = tasksData.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedTasks = tasksData.filter((task) => task.done);

  const isSearchBarOpen = useSelector((state) => state.tasks.isSearchBarOpen);

  const isModalCreateOpen = useSelector(
    (state) => state.modalCreate.isModalCreateOpen
  );

  const [selectedTask, setSelectedTask] = useState(null);

  const toggleOption = (id) => {
    setSelectedTask(selectedTask === id ? null : id);
  };

  const isModalEditOpen = useSelector(
    (state) => state.modalEdit.isModalEditOpen
  );

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleCompleteTask = (id) => {
    dispatch(completeTask(id));
  };

  const isCompletedTasksOpen = useSelector(
    (state) => state.tasks.isCompletedTasksOpen
  );

  useEffect(() => {
    if (!isSearchBarOpen) {
      setSearchTerm("");
    }
  }, [isSearchBarOpen]);

  return (
    <div className=" pt-9">
      {isSearchBarOpen ? (
        <div className="relative bg-background-secondary rounded-xl">
          <label
            htmlFor="search"
            className="absolute top-1/2 -translate-y-1/2 left-3"
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
            className="focus:outline-textColor-accent bg-transparent rounded-xl w-full pl-10 pr-3 py-3 "
          />
        </div>
      ) : isCompletedTasksOpen ? (
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium">Completed Tasks</h1>
          {completedTasks.length > 0 && (
            <button
              type="button"
              onClick={() => dispatch(deleteAllTask())}
              className="text font-medium text-red-500"
            >
              Delete All
            </button>
          )}
        </div>
      ) : (
        <header className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold ">
            Welcome, <span className="text-textColor-accent">Adam</span>!
          </h1>

          <p className="text-base text-textColor-secondary">
            You’ve got {filteredTasks.length - completedTasks.length} tasks to
            do.
          </p>
        </header>
      )}

      <section
        className={`${
          filteredTasks.length === 0 ? "justify-center items-center" : ""
        } mt-7 flex flex-col gap-4 h-[calc(76vh-90px)] b-yellow-400 overflow-y-auto`}
      >
        {filteredTasks.length === 0 ? (
          <div className="text-gray-500 flex flex-col items-center gap-3">
            <img src={no_result} alt="" className="w-20" />
            <p className="text-textColor-secondary">You have no task listed.</p>

            {!isSearchBarOpen && (
              <button
                onClick={() => dispatch(toggleModalCreate())}
                className="flex mt-2 bg-blue-50 py-3 px-4 rounded-xl items-center justify-between gap-1"
              >
                <Plus size={20} color="#007FFF" />
                <h1 className="text-textColor-accent font-medium">
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
                  className="bg-background-secondary rounded-2xl p-4 grid grid-cols-[0.5fr_4fr_1fr] gap-5"
                >
                  <button
                    type="button"
                    onClick={() => handleCompleteTask(task.id)}
                    className="self-start"
                  >
                    {task.done ? (
                      <img src={logo} alt="" className="w-6" />
                    ) : (
                      <Square className="text-textColor-secondary w-6" />
                    )}
                  </button>

                  <div className="flex flex-col gap-3">
                    <h1
                      className={`${
                        task.done && "line-through text-gray-500"
                      } font-medium`}
                    >
                      {task.title}
                    </h1>
                    <p
                      className={`${
                        task.done && "line-through"
                      } text-sm hyphens-auto text-textColor-secondary`}
                    >
                      {task.note}
                    </p>
                  </div>

                  <div className="flex flex-col justify-center items-center self-start justify-self-end gap-3">
                    {isCompletedTasksOpen ? (
                      <button
                        type="button"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <img src={deleteIcon} alt="Delete" />
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleOption(task.id)}
                        type="button"
                        disabled={isModalEditOpen ? true : false}
                        className="self-start "
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
                          onClick={() => dispatch(toggleModalEdit())}
                        >
                          <img src={editIcon} alt="Edit" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <img src={deleteIcon} alt="Delete" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            }
          )
        )}
      </section>

      {isModalCreateOpen && <CreateTaskForm />}
      {isModalEditOpen && <EditTaskForm id={selectedTask} />}
    </div>
  );
}

export default HomePage2;
