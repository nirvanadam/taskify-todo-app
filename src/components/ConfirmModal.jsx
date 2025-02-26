import { AlertCircle } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import {
  toggleConfirmModal,
  deleteTask,
  deleteAllTask,
} from "../redux/slices/taskSlice";

function ConfirmModal({ id }) {
  const dispatch = useDispatch();

  const deleteType = useSelector((state) => state.tasks.deleteType);

  return (
    <div className="fixed left-1/2 top-1/2 z-[100] flex w-3/4 max-w-md -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-3 rounded-xl bg-white px-6 py-5">
      <AlertCircle size={60} color="#FF0000" />
      <h1 className="text-center text-xl font-semibold">
        {deleteType === "all" ? "Delete All Tasks" : "Delete Task"}
      </h1>
      <p className="text-center text-sm text-textColor-secondary">
        Are you sure you want to delete {deleteType === "all" && "all"} your
        task? Your data will be permanently removed. This action cannot be
        undone.
      </p>

      <div className="mt-3 flex w-full flex-col gap-3">
        <button
          type="button"
          onClick={
            deleteType === "all"
              ? () => dispatch(deleteAllTask())
              : () => dispatch(deleteTask(id))
          }
          className="w-full rounded-md bg-red-500 px-3 py-1 font-semibold text-white"
        >
          Delete
        </button>

        <button
          type="button"
          onClick={() => dispatch(toggleConfirmModal())}
          className="w-full rounded-md border border-gray-200 px-3 py-1 font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmModal;
