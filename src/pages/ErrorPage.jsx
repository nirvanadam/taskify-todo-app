import React from "react";
import { Link } from "react-router-dom";
import { House } from "lucide-react";

function ErrorPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-10">
      <h1 className="text-center text-4xl font-bold">Error 404</h1>
      <h1 className="mt-2 text-center text-4xl font-bold">Page Not Found!</h1>
      <p className="mt-5 text-center font-medium text-gray-400">
        This page doesn’t exist or was removed! We suggest you go back to home.
      </p>
      <Link
        to="/"
        className="mt-8 flex items-center gap-3 rounded-lg bg-textColor-accent px-5 py-3 font-semibold text-white"
      >
        <House />
        Back Home
      </Link>
    </div>
  );
}

export default ErrorPage;
