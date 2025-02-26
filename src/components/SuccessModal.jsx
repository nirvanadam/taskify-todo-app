import { CircleCheck } from "lucide-react";
import React from "react";
import { toggleCloseSuccessModal } from "../redux/slices/taskSlice";
import { useDispatch } from "react-redux";

function SuccessModal() {
  const dispatch = useDispatch();

  return (
    <div className="fixed left-1/2 top-1/2 z-[100] flex w-3/4 max-w-xs -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-3 rounded-xl bg-white px-6 py-5">
      <CircleCheck size={60} className="text-green-500" />
      <h1 className="text-center text-xl font-semibold"></h1>
      <p className="text-center text-sm font-medium text-textColor-secondary">
        Your task has been successfully saved. You can see it in the task list.
      </p>
      <button
        type="button"
        onClick={() => dispatch(toggleCloseSuccessModal())}
        className="mt-5 w-full rounded-md bg-green-500 px-3 py-1 font-medium text-white"
      >
        Okay!
      </button>
    </div>
  );
}

export default SuccessModal;
