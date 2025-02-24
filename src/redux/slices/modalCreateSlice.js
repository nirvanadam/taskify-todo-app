import { createSlice } from "@reduxjs/toolkit";

const initialStatusModalCreateState = {
  isModalCreateOpen: false,
};

const modalCreateSlice = createSlice({
  name: "modalCreate",
  initialState: initialStatusModalCreateState,
  reducers: {
    toggleModalCreate: (state) => {
      state.isModalCreateOpen = !state.isModalCreateOpen;
    },
  },
});

export const { toggleModalCreate } = modalCreateSlice.actions;
export default modalCreateSlice.reducer;
