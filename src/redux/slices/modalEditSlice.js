import { createSlice } from "@reduxjs/toolkit";

const initialStatusModalEditState = {
  isModalEditOpen: false,
};

const modalEditSlice = createSlice({
  name: "modalEdit",
  initialState: initialStatusModalEditState,
  reducers: {
    toggleModalEdit: (state) => {
      state.isModalEditOpen = !state.isModalEditOpen;
    },
  },
});

export const { toggleModalEdit } = modalEditSlice.actions;
export default modalEditSlice.reducer;
