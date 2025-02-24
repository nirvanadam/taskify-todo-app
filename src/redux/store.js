import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/taskSlice";
import modalCreateReducer from "./slices/modalCreateSlice";
import modalEditReducer from "./slices/modalEditSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    modalCreate: modalCreateReducer,
    modalEdit: modalEditReducer,
  },
});
