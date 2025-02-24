import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "../components/Header";

function MainLayout() {
  return (
    <div className="px-6 py-7 lg:px-10 xl:px-32">
      <Header />
      <main>
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
}

export default MainLayout;
