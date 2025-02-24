import React from "react";
import logo from "/icons/logo.svg";
import { UserRound } from "lucide-react";

function Header() {
  return (
    <nav className="flex justify-between">
      <div className="flex items-center gap-2">
        <img src={logo} alt="" />
        <h1 className="font-medium text-lg">Taskify</h1>
      </div>

      <div className="flex items-center gap-3">
        <h1 className="font-medium text-lg">Adam</h1>
        <div className="rounded-full bg-gray-400 p-2">
          <UserRound color="#FFFFFF" />
        </div>
      </div>
    </nav>
  );
}

export default Header;
