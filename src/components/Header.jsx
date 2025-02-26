import React from "react";
import logo from "/icons/logo.png";
import { UserRound } from "lucide-react";

function Header() {
  return (
    <nav className="flex justify-between">
      <div className="flex items-center gap-2">
        <img src={logo} alt="" className="w-[40px]" />
        <h1 className="text-lg font-semibold">Taskify</h1>
      </div>

      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold">Adam</h1>
        <div className="rounded-full bg-gray-400 p-2">
          <UserRound color="#FFFFFF" />
        </div>
      </div>
    </nav>
  );
}

export default Header;
