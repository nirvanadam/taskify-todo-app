import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "../components/Header";
import { useSelector } from "react-redux";

function MainLayout() {
  const isConfirmModalOpen = useSelector(
    (state) => state.tasks.isConfirmModalOpen,
  );

  const isModalCreateOpen = useSelector(
    (state) => state.modalCreate.isModalCreateOpen,
  );

  const isModalEditOpen = useSelector(
    (state) => state.modalEdit.isModalEditOpen,
  );

  const isSuccessModalOpen = useSelector(
    (state) => state.tasks.isSuccessModalOpen,
  );

  return (
    <div
      className={`${
        (isConfirmModalOpen ||
          isModalCreateOpen ||
          isModalEditOpen ||
          isSuccessModalOpen) &&
        "after:h-screen"
      } px-6 py-7 after:absolute after:left-0 after:top-0 after:w-full after:bg-black after:opacity-60 lg:px-10 xl:px-32 2xl:px-60`}
    >
      <Header />
      <main>
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
}

export default MainLayout;
