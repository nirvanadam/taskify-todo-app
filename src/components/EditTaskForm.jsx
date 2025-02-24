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
      className="bg-white border-t flex flex-col gap-9 px-6 py-7 border-gray-200 fixed left-0 z-10 bottom-0 h-[50vh] w-full rounded-t-2xl shadow-md"
    >
      <div className="flex gap-5 items-center">
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
          className="w-full"
        />
      </div>

      <div className="flex gap-5 ">
        <Pencil size={26} className="text-textColor-secondary" />
        <textarea
          name="note"
          id="note"
          value={updatedNote}
          onChange={(event) => {
            setUpdatedNote(event.target.value);
          }}
          placeholder="Add a note..."
          className="w-full h-[200px]"
        ></textarea>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => dispatch(toggleModalEdit())}
          className="rounded px-3 py-2 bg-red-500 text-white  font-medium"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="text-white bg-textColor-accent px-3 py-2 rounded font-medium"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default EditTaskForm;
