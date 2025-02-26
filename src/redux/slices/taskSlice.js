import { createSlice } from "@reduxjs/toolkit";

const initialTasksState = {
  tasksData: JSON.parse(localStorage.getItem("tasks")) || [],
  isSearchBarOpen: false,
  isCompletedTasksOpen: false,
  activeButton: "taskList",
  isConfirmModalOpen: false,
  deleteType: "",
  isSuccessModalOpen: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialTasksState,
  reducers: {
    addTask: (state, action) => {
      state.tasksData.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasksData));
      state.isSuccessModalOpen = true;
    },
    updateTask: (state, action) => {
      const { id, title, note } = action.payload; // Ambil data dari payload

      // Cari index berdasarkan ID
      const index = state.tasksData.findIndex((task) => task.id === id);

      // Jika task ditemukan, update datanya
      if (index !== -1) {
        state.tasksData[index] = {
          ...state.tasksData[index], // Pertahankan nilai lama seperti done
          title,
          note,
        };

        // Simpan perubahan ke localStorage
        localStorage.setItem("tasks", JSON.stringify(state.tasksData));
      }
      state.isSuccessModalOpen = true;
    },

    deleteTask: (state, action) => {
      state.tasksData = state.tasksData.filter(
        (task) => task.id !== action.payload,
      );
      state.isConfirmModalOpen = false;
      localStorage.setItem("tasks", JSON.stringify(state.tasksData));
    },

    deleteAllTask: (state) => {
      state.tasksData = state.tasksData.filter((task) => !task.done);
      state.isConfirmModalOpen = false;
      localStorage.setItem("tasks", JSON.stringify(state.tasksData));
    },

    completeTask: (state, action) => {
      const index = state.tasksData.findIndex(
        (task) => task.id === action.payload,
      );

      if (index !== -1) {
        state.tasksData[index].done = !state.tasksData[index].done;
        localStorage.setItem("tasks", JSON.stringify(state.tasksData));
      }
    },

    toggleSearchBar: (state) => {
      state.isSearchBarOpen = true;
      state.activeButton = "searchBar";
      state.isCompletedTasksOpen = false;
    },
    toggleTaskList: (state) => {
      state.isSearchBarOpen = false;
      state.isCompletedTasksOpen = false;
      state.activeButton = "taskList";
    },

    toggleCompletedTasks: (state) => {
      state.isCompletedTasksOpen = true;
      state.isSearchBarOpen = false;
      state.activeButton = "completedTasks";
    },

    toggleConfirmModal: (state, action) => {
      state.isConfirmModalOpen = !state.isConfirmModalOpen;
      state.deleteType = action.payload;
    },

    toggleCloseSuccessModal: (state) => {
      state.isSuccessModalOpen = false;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  completeTask,
  toggleSearchBar,
  toggleTaskList,
  toggleCompletedTasks,
  deleteAllTask,
  toggleConfirmModal,
  toggleCloseSuccessModal,
} = tasksSlice.actions;
export default tasksSlice.reducer;
