import React, { useState } from "react";
import { Pencil, Square } from "lucide-react";
import { toggleModalEdit } from "../redux/slices/modalEditSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../redux/slices/taskSlice";

function EditTaskForm({ id }) {
  const dispatch = useDispatch();
  const tasksData = useSelector((state) => state.tasks.tasksData);
  const selectedTaskData = tasksData.find((task) => task.id === id);

  const [updatedTitle, setUpdatedTitle] = useState(selectedTaskData.title);
  const [updatedNote, setUpdatedNote] = useState(selectedTaskData.note);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateTask({ id, title: updatedTitle, note: updatedNote }));
    dispatch(toggleModalEdit());
  };

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 z-10 flex h-fit w-full flex-col gap-9 rounded-t-3xl border-t border-gray-200 bg-white px-6 py-7 lg:absolute lg:left-1/2 lg:top-1/2 lg:max-w-2xl lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-3xl"
    >
      <div className="flex items-center gap-5">
        <Square size={26} className="text-textColor-secondary" />
        <input
          type="text"
          name="title"
          id="title"
          value={updatedTitle}
          onChange={(event) => {
            setUpdatedTitle(event.target.value);
          }}
          required
          placeholder="What's on your mind?"
          className="w-full text-2xl font-semibold focus:outline-none"
        />
      </div>

      <div className="flex gap-5">
        <Pencil size={26} className="text-textColor-secondary" />
        <textarea
          name="note"
          id="note"
          value={updatedNote}
          onChange={(event) => {
            setUpdatedNote(event.target.value);
          }}
          placeholder="Add a note..."
          className="h-[500px] w-full font-medium focus:outline-none lg:h-[300px]"
        ></textarea>
      </div>

      <div className="flex justify-between gap-3">
        <button
          type="button"
          onClick={() => dispatch(toggleModalEdit())}
          className="w-full rounded bg-red-500 px-3 py-2 font-semibold text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="w-full rounded bg-textColor-accent px-3 py-2 font-semibold text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default EditTaskForm;
