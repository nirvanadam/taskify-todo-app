import React from "react";
import { useDispatch } from "react-redux";
import { Pencil, Square } from "lucide-react";
import { toggleModalCreate } from "../redux/slices/modalCreateSlice";
import { addTask } from "../redux/slices/taskSlice";

function CreateTaskForm() {
  const dispatch = useDispatch();

  const handleAddTask = (event) => {
    event.preventDefault();

    const newTask = {
      id: Date.now(),
      title: event.target.title.value,
      note: event.target.note.value,
      done: false,
    };

    dispatch(addTask(newTask));
    dispatch(toggleModalCreate());
  };

  return (
    <form
      action=""
      onSubmit={handleAddTask}
      className="fixed bottom-0 left-0 z-10 flex h-fit w-full flex-col gap-9 rounded-t-3xl border-t border-gray-200 bg-white px-6 py-7 lg:absolute lg:left-1/2 lg:top-1/2 lg:max-w-2xl lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-3xl"
    >
      <div className="flex items-center gap-5">
        <Square size={26} className="text-textColor-secondary" />
        <input
          type="text"
          name="title"
          id="title"
          required
          autoFocus
          placeholder="What's on your mind?"
          className="w-full text-2xl font-semibold focus:outline-none"
        />
      </div>

      <div className="flex gap-5">
        <Pencil size={26} className="text-textColor-secondary" />
        <textarea
          name="note"
          id="note"
          placeholder="Add a note..."
          className="h-[500px] w-full font-medium focus:outline-none"
        ></textarea>
      </div>

      <div className="flex justify-between gap-3">
        <button
          type="button"
          onClick={() => dispatch(toggleModalCreate())}
          className="w-full rounded bg-red-500 px-3 py-2 font-semibold text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="w-full rounded bg-textColor-accent px-3 py-2 font-semibold text-white"
        >
          Create
        </button>
      </div>
    </form>
  );
}

export default CreateTaskForm;
