import React, { useEffect, useState } from "react";
import { Ellipsis, Pencil, Square } from "lucide-react";
import no_result from "/icons/no_result.svg";
import editIcon from "/icons/edit.svg";
import deleteIcon from "/icons/delete.svg";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [isShowCreateTask, setIsShowCreateTask] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [isShowEditTask, setIsShowEditTask] = useState(false);

  // Load data dari local storage saat halaman pertama kali di-load
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const handleAddTask = (event) => {
    const newTask = {
      title: event.target.title.value,
      note: event.target.note.value,
      done: false,
    };

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = [...storedTasks, newTask];

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setIsShowCreateTask(false);
  };

  const toggleOption = (index) => {
    setSelectedTaskIndex(selectedTaskIndex === index ? null : index);
    setIsShowEditTask(false);
  };

  const toggleEditTask = () => {
    setIsShowEditTask(!isShowEditTask);
  };

  return (
    <div className=" pt-9">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold ">
          Welcome, <span className="text-textColor-accent">Adam</span>!
        </h1>

        {tasks.length === 0 ? (
          <p className="text-base text-textColor-secondary">
            Create tasks to achieve more.
          </p>
        ) : (
          <p className="text-base text-textColor-secondary">
            You’ve got {tasks.length} tasks to do.
          </p>
        )}
      </header>

      <section
        className={`${
          tasks.length === 0 && "justify-center items-center"
        } mt-7 flex flex-col gap-4 h-[calc(76vh-90px)] b-yellow-400 overflow-y-auto`}
      >
        {tasks.length === 0 ? (
          <div className="text-gray-500 flex flex-col gap-3">
            <img src={no_result} alt="" className="w-20" />
            <p className="text-textColor-secondary">No result found.</p>
          </div>
        ) : (
          tasks.map((task, index) => {
            return (
              <div
                key={index}
                className="bg-background-secondary rounded-2xl p-4 grid grid-cols-[0.5fr_4fr_1fr] gap-5"
              >
                <button type="button" className="self-start">
                  <Square size={26} className="text-textColor-secondary" />
                </button>

                <div className="flex flex-col gap-3">
                  <h1 className="font-medium">{task.title}</h1>
                  <p className="text-sm hyphens-auto text-textColor-secondary">
                    {task.note}
                  </p>
                </div>

                <div className="flex flex-col justify-center items-center self-start justify-self-end gap-3">
                  <button
                    type="button"
                    onClick={() => toggleOption(index)}
                    className="self-start "
                  >
                    <Ellipsis size={26} className="text-textColor-secondary" />
                  </button>

                  {selectedTaskIndex === index && (
                    <div className="flex flex-col gap-5">
                      <button type="button" onClick={toggleEditTask}>
                        <img src={editIcon} alt="Edit" />
                      </button>

                      <button type="button">
                        <img src={deleteIcon} alt="Delete" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </section>

      {isShowCreateTask && (
        <form
          action=""
          onSubmit={handleAddTask}
          className="bg-white border-t flex flex-col gap-9 px-6 py-7 border-gray-200 fixed left-0 z-10 bottom-0 h-[50vh] w-full rounded-t-2xl shadow-md"
        >
          <div className="flex gap-5 items-center">
            <Square size={26} className="text-textColor-secondary" />
            <input
              type="text"
              name="title"
              id="title"
              required
              placeholder="What's on your mind?"
              className="w-full"
            />
          </div>

          <div className="flex gap-5 ">
            <Pencil size={26} className="text-textColor-secondary" />
            <textarea
              name="note"
              id="note"
              placeholder="Add a note..."
              className="w-full h-[200px]"
            ></textarea>
          </div>

          <button type="submit" className="text-textColor-accent font-medium">
            Create
          </button>
        </form>
      )}

      {isShowEditTask && (
        <form
          action=""
          onSubmit={handleAddTask}
          className="bg-white border-t flex flex-col gap-9 px-6 py-7 border-gray-200 fixed left-0 z-10 bottom-0 h-[50vh] w-full rounded-t-2xl shadow-md"
        >
          <div className="flex gap-5 items-center">
            <Square size={26} className="text-textColor-secondary" />
            <input
              type="text"
              name="title"
              id="title"
              value={tasks[selectedTaskIndex].title}
              required
              placeholder="What's on your mind?"
              className="w-full"
            />
          </div>

          <div className="flex gap-5 ">
            <Pencil size={26} className="text-textColor-secondary" />
            <textarea
              name="note"
              id="note"
              value={tasks[selectedTaskIndex].note}
              placeholder="Add a note..."
              className="w-full h-[200px]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-textColor-accent text-white rounded self-end px-4 py-2 w-fit text-xl font-medium"
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
}

export default HomePage;
