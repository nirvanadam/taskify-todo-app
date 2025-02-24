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

      <div className="flex justify-between">
        <button
          onClick={() => dispatch(toggleModalCreate())}
          className="rounded px-3 py-2 bg-red-500 text-white  font-medium"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="text-white bg-textColor-accent px-3 py-2 rounded font-medium"
        >
          Create
        </button>
      </div>
    </form>
  );
}

export default CreateTaskForm;
